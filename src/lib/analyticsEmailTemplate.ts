// src/lib/analyticsEmailTemplate.ts
// Premium branded HTML email template for daily website analytics report

interface ServiceStat {
  name: string;
  views: number;
}

interface AreaStat {
  name: string;
  views: number;
}

interface CityStat {
  name: string;
  views: number;
}

interface BlogStat {
  name: string;
  views: number;
}

export interface AnalyticsData {
  date: string;
  totalViews: number;
  yesterdayViews: number;
  topServices: ServiceStat[];
  topAreas: AreaStat[];
  topCities: CityStat[];
  topBlogs: BlogStat[];
  mobileCount: number;
  desktopCount: number;
  topReferrers: { name: string; views: number }[];
  topPages: { name: string; views: number }[];
}

const C = {
  bg:        '#0B1120',
  card:      '#111827',
  border:    '#1E2D45',
  orange:    '#F97316',
  orangeDk:  '#EA580C',
  white:     '#FFFFFF',
  textMuted: '#94A3B8',
  green:     '#10B981',
  red:       '#EF4444',
};

function percentChange(today: number, yesterday: number): string {
  if (yesterday === 0) return today > 0 ? '🆕 New!' : '—';
  const change = ((today - yesterday) / yesterday * 100).toFixed(1);
  const num = parseFloat(change);
  if (num > 0) return `<span style="color:${C.green};">↑ ${change}%</span>`;
  if (num < 0) return `<span style="color:${C.red};">↓ ${Math.abs(num).toFixed(1)}%</span>`;
  return '→ 0%';
}

function barWidth(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.max(5, Math.round((value / max) * 100));
}

function tableRows(items: { name: string; views: number }[], maxViews: number, emoji: string): string {
  return items.map((item, i) => `
    <tr>
      <td style="padding:10px 12px; border-bottom:1px solid ${C.border}; color:${C.textMuted}; font-size:12px; font-weight:700; width:30px; text-align:center;">${i + 1}</td>
      <td style="padding:10px 12px; border-bottom:1px solid ${C.border};">
        <div style="color:${C.white}; font-size:13px; font-weight:600; margin-bottom:6px;">${emoji} ${item.name}</div>
        <div style="background:${C.bg}; border-radius:6px; height:8px; overflow:hidden;">
          <div style="background:linear-gradient(90deg, ${C.orange}, ${C.orangeDk}); width:${barWidth(item.views, maxViews)}%; height:100%; border-radius:6px;"></div>
        </div>
      </td>
      <td style="padding:10px 12px; border-bottom:1px solid ${C.border}; color:${C.orange}; font-size:14px; font-weight:800; text-align:right; width:60px;">${item.views}</td>
    </tr>
  `).join('');
}

export function analyticsReportHtml(data: AnalyticsData): string {
  const {
    date, totalViews, yesterdayViews,
    topServices, topAreas, topCities, topBlogs,
    mobileCount, desktopCount, topReferrers, topPages
  } = data;

  const totalDevices = mobileCount + desktopCount;
  const mobilePct = totalDevices > 0 ? Math.round((mobileCount / totalDevices) * 100) : 0;
  const desktopPct = 100 - mobilePct;

  const maxServiceViews = topServices.length > 0 ? topServices[0].views : 1;
  const maxAreaViews = topAreas.length > 0 ? topAreas[0].views : 1;
  const maxCityViews = topCities.length > 0 ? topCities[0].views : 1;
  const maxBlogViews = topBlogs.length > 0 ? topBlogs[0].views : 1;
  const maxPageViews = topPages.length > 0 ? topPages[0].views : 1;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width:650px; margin:20px auto; background-color:${C.card}; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
    .stat-grid { display:table; width:100%; border-collapse:collapse; }
    .stat-cell { display:table-cell; width:33.33%; padding:20px 16px; text-align:center; border-right:1px solid ${C.border}; }
    .stat-cell:last-child { border-right:none; }
    .stat-number { font-size:28px; font-weight:900; color:${C.white}; line-height:1; }
    .stat-label { font-size:10px; color:${C.textMuted}; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-top:6px; }
    .section-title { color:${C.white}; font-size:16px; font-weight:800; margin:0 0 16px; padding-bottom:10px; border-bottom:2px solid ${C.orange}; display:inline-block; }
    table.data-table { width:100%; border-collapse:collapse; background:${C.card}; border-radius:10px; overflow:hidden; border:1px solid ${C.border}; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div style="background:linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDk} 100%); padding:36px 32px; text-align:center;">
      <div style="margin-bottom:8px;">
        <img src="https://www.amscivilwork.in/logo.png" alt="AMS Logo" width="50" height="50" style="border-radius:10px; background:#fff; padding:3px; vertical-align:middle;">
      </div>
      <p style="margin:0; font-size:10px; letter-spacing:4px; text-transform:uppercase; font-weight:700; color:rgba(255,255,255,0.8);">AMS Civil Construction</p>
      <h1 style="margin:10px 0 4px; font-size:26px; font-weight:900; color:#fff;">📊 Daily Analytics Report</h1>
      <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.9); font-weight:600;">📅 ${date}</p>
    </div>

    <!-- Quick Stats -->
    <div style="background:${C.bg}; padding:4px 0; border-bottom:1px solid ${C.border};">
      <div class="stat-grid">
        <div class="stat-cell">
          <div class="stat-number">${totalViews.toLocaleString('en-IN')}</div>
          <div class="stat-label">Total Views Today</div>
        </div>
        <div class="stat-cell">
          <div class="stat-number">${yesterdayViews.toLocaleString('en-IN')}</div>
          <div class="stat-label">Yesterday</div>
        </div>
        <div class="stat-cell">
          <div class="stat-number">${percentChange(totalViews, yesterdayViews)}</div>
          <div class="stat-label">Change</div>
        </div>
      </div>
    </div>

    <!-- Device Breakdown -->
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">📱 Device Breakdown</h3>
      <div style="display:table; width:100%;">
        <div style="display:table-cell; width:50%; padding-right:10px;">
          <div style="background:${C.bg}; border-radius:10px; padding:16px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:22px; margin-bottom:4px;">📱</div>
            <div style="color:${C.white}; font-size:22px; font-weight:900;">${mobilePct}%</div>
            <div style="color:${C.textMuted}; font-size:10px; letter-spacing:1px; text-transform:uppercase; font-weight:700;">Mobile (${mobileCount})</div>
          </div>
        </div>
        <div style="display:table-cell; width:50%; padding-left:10px;">
          <div style="background:${C.bg}; border-radius:10px; padding:16px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:22px; margin-bottom:4px;">💻</div>
            <div style="color:${C.white}; font-size:22px; font-weight:900;">${desktopPct}%</div>
            <div style="color:${C.textMuted}; font-size:10px; letter-spacing:1px; text-transform:uppercase; font-weight:700;">Desktop (${desktopCount})</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Services -->
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">🔧 Top Services (Most Clicked)</h3>
      ${topServices.length > 0 ? `
      <table class="data-table">
        ${tableRows(topServices, maxServiceViews, '🔧')}
      </table>` : `<p style="color:${C.textMuted}; font-size:13px;">No service data available today.</p>`}
    </div>

    <!-- Top Areas/Locations -->
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">📍 Top Locations (Most Visited Areas)</h3>
      ${topAreas.length > 0 ? `
      <table class="data-table">
        ${tableRows(topAreas, maxAreaViews, '📍')}
      </table>` : `<p style="color:${C.textMuted}; font-size:13px;">No area data available today.</p>`}
    </div>

    <!-- Visitor Cities -->
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">🌍 Visitor Locations (Where Users Are From)</h3>
      ${topCities.length > 0 ? `
      <table class="data-table">
        ${tableRows(topCities, maxCityViews, '🌍')}
      </table>` : `<p style="color:${C.textMuted}; font-size:13px;">No geo data available today.</p>`}
    </div>

    <!-- Top Pages -->
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">📄 Top Pages (Most Viewed)</h3>
      ${topPages.length > 0 ? `
      <table class="data-table">
        ${tableRows(topPages, maxPageViews, '📄')}
      </table>` : `<p style="color:${C.textMuted}; font-size:13px;">No page data available today.</p>`}
    </div>

    <!-- Top Blogs -->
    ${topBlogs.length > 0 ? `
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">📝 Top Blog Posts</h3>
      <table class="data-table">
        ${tableRows(topBlogs, maxBlogViews, '📝')}
      </table>
    </div>` : ''}

    <!-- Top Referrers -->
    ${topReferrers.length > 0 ? `
    <div style="padding:24px 32px; border-bottom:1px solid ${C.border};">
      <h3 class="section-title">🔗 Traffic Sources (Where Visitors Come From)</h3>
      <table class="data-table">
        ${tableRows(topReferrers, topReferrers[0].views, '🔗')}
      </table>
    </div>` : ''}

    <!-- Footer -->
    <div style="background:${C.bg}; padding:32px; text-align:center; border-top:1px solid ${C.border};">
      <p style="margin:0; color:${C.white}; font-size:14px; font-weight:700;">AMS Civil Construction</p>
      <p style="margin:8px 0 0; color:${C.textMuted}; font-size:11px;">This is an automated daily report generated at 8:00 PM IST</p>
      <p style="margin:4px 0 0; color:${C.textMuted}; font-size:10px;">📞 +91 87793 91690 | 🌐 www.amscivilwork.in</p>
      <p style="margin:16px 0 0; color:${C.textMuted}; font-size:10px; opacity:0.5;">© ${new Date().getFullYear()} AMS Civil Construction. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}
