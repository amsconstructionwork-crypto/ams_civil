// src/lib/sanitizeHtml.ts
// Sanitizes blog HTML content to prevent malformed links from generating
// garbage URLs that Google crawls (e.g., /blog/<a href=)

/**
 * Sanitizes HTML content to fix common issues:
 * 1. Removes broken/malformed anchor tags that could produce garbage crawlable URLs
 * 2. Fixes double-encoded HTML entities
 * 3. Ensures all links have proper href attributes
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return '';

  let sanitized = html;

  // Fix 1: Remove completely broken anchor tags where <a href= leaked as text
  // e.g., text that contains literal "<a href=" as visible text (not actual tags)
  // This catches cases like: some-slug-<a href= which Google interprets as a URL
  sanitized = sanitized.replace(
    /(<a\s+[^>]*href\s*=\s*)(["']?)(?!https?:\/\/|\/|#|mailto:|tel:|whatsapp:)([^"'\s>]*)(["']?)/gi,
    (match, prefix, openQuote, href, closeQuote) => {
      // If the href looks like garbage (contains HTML entities or tags), remove the link
      if (href.includes('<') || href.includes('&lt;') || href.includes('%3C')) {
        return '';
      }
      return match;
    }
  );

  // Fix 2: Remove anchor tags with empty or missing href
  sanitized = sanitized.replace(/<a\s+(?:(?!href)[^>])*>([^<]*)<\/a>/gi, '$1');
  sanitized = sanitized.replace(/<a\s+[^>]*href\s*=\s*["']?\s*["']?[^>]*>([^<]*)<\/a>/gi, (match, text) => {
    // Extract href value
    const hrefMatch = match.match(/href\s*=\s*["']?([^"'\s>]*)["']?/i);
    if (!hrefMatch || !hrefMatch[1] || hrefMatch[1].trim() === '') {
      return text; // Remove the link, keep the text
    }
    return match;
  });

  // Fix 3: Remove orphaned opening <a tags without closing tags
  // These create the worst crawl issues since browsers/crawlers try to interpret everything after as a URL
  sanitized = sanitized.replace(/<a\s+[^>]*(?:(?!>).)*$/gm, '');

  // Fix 4: Clean up any literal &lt;a href= that got double-encoded
  sanitized = sanitized.replace(/&lt;a\s+href=&quot;[^&]*&quot;&gt;/gi, '');
  sanitized = sanitized.replace(/&lt;\/a&gt;/gi, '');

  return sanitized;
}
