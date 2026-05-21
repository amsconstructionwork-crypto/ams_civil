// src/lib/auth.ts
// ─────────────────────────────────────────────────────────
// Central authentication & security utilities
// JWT token creation, verification, rate limiting
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-change-me';
const TOKEN_EXPIRY_HOURS = 24;

// ─── Simple JWT-like Token (HMAC-SHA256) ───────────────────
// We avoid external deps. This uses Web Crypto API available in Edge Runtime.

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf-8');
}

async function hmacSign(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Buffer.from(sig).toString('base64url');
}

export async function createToken(payload: Record<string, unknown>): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    iat: now,
    exp: now + (TOKEN_EXPIRY_HOURS * 3600),
  }));
  const signature = await hmacSign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSig = await hmacSign(`${header}.${body}`);

    if (signature !== expectedSig) return null;

    const payload = JSON.parse(base64UrlDecode(body));

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─── Extract Token from Request ────────────────────────────

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  // Check cookie
  const cookieToken = request.cookies.get('admin_token')?.value;
  return cookieToken || null;
}

// ─── Auth Guard for Admin APIs ─────────────────────────────

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const token = getTokenFromRequest(request);

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please login.' },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Invalid or expired token. Please login again.' },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

// ─── Rate Limiter (In-Memory) ──────────────────────────────
// Protects against brute-force attacks and spam

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  });
}, 5 * 60 * 1000);

export function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/**
 * Rate limiter
 * @param key - Unique identifier (usually IP + route)
 * @param maxRequests - Max requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns Error response if rate limited, null if OK
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): NextResponse | null {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { success: false, error: `Too many requests. Please try again after ${retryAfter} seconds.` },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  return null;
}

// ─── Input Sanitizer ───────────────────────────────────────
// Strip dangerous HTML/script tags from user input

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:/gi, '')
    .trim();
}

/**
 * Sanitize an object's string values recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    const val = sanitized[key];
    if (typeof val === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(val);
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(val as Record<string, unknown>);
    }
  }
  return sanitized;
}
