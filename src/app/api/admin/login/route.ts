// src/app/api/admin/login/route.ts
// Server-side login check — returns JWT token on success
// Protected by rate limiting against brute-force attacks

import { NextRequest, NextResponse } from 'next/server';
import { createToken, checkRateLimit, getClientIP } from '@/lib/auth';

// Rate limit: max 5 login attempts per 15 minutes per IP
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // ── Rate limiting ─────────────────────────────────────
    const rateLimitError = checkRateLimit(`login:${ip}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
    if (rateLimitError) return rateLimitError;

    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in .env.local');
      return NextResponse.json({ success: false, error: 'Server config error.' }, { status: 500 });
    }

    // Artificial delay to prevent timing attacks
    await new Promise(r => setTimeout(r, 500 + Math.random() * 500));

    // Constant-time comparison to prevent timing attacks
    const usernameMatch = username?.length === validUser.length &&
      username.split('').every((c: string, i: number) => c === validUser[i]);
    const passwordMatch = password?.length === validPass.length &&
      password.split('').every((c: string, i: number) => c === validPass[i]);

    if (usernameMatch && passwordMatch) {
      // Create JWT token
      const token = await createToken({
        role: 'admin',
        username: validUser,
      });

      // Set HttpOnly cookie (most secure) + return token in body (for SPA)
      const response = NextResponse.json({
        success: true,
        token,
        expiresIn: 24 * 3600, // 24 hours
      });

      // HttpOnly cookie — cannot be accessed by JavaScript (XSS safe)
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 3600, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
