// src/app/robots.ts
// Robots.txt configuration — allows search engine + AI crawlers
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engine crawlers
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin', '/api/'],
      },
      // ── AI Crawlers — Explicitly ALLOW ──────────────────
      // GPTBot (OpenAI/ChatGPT)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      // ChatGPT-User (ChatGPT browsing)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      // Google-Extended (Gemini AI)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      // PerplexityBot
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      // ClaudeBot (Anthropic)
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      // Bytespider (TikTok AI)
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },
      { userAgent: 'Meta-Llama', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      // CCBot (Common Crawl — feeds many AI models)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: 'https://www.amscivilwork.in/sitemap.xml',
    host: 'https://www.amscivilwork.in',
    // Note: Next.js MetadataRoute.Robots doesn't support custom fields,
    // but llms.txt is discoverable at /llms.txt by convention
  };
}
