'use client';
import { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp, MapPin, Smartphone, Monitor, Eye, RefreshCw, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  topPages: { url: string; views: number; service?: string }[];
  topCities: { city: string; views: number }[];
  devices: { device: string; count: number }[];
}

export default function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const j = await res.json();
      if (j.success) {
        setData(j.data);
      } else {
        toast.error('Failed to load analytics.');
      }
    } catch {
      toast.error('Network error loading analytics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="card p-12 flex items-center justify-center gap-3 text-slate-400">
        <span className="w-5 h-5 border-2 rounded-full animate-spin1" style={{ borderColor: '#1E2D45', borderTopColor: '#F97316' }} />
        Loading analytics...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl text-white">Traffic Analytics</h2>
        <button onClick={fetchAnalytics} className="btn-ghost text-xs px-4 py-2.5 flex items-center gap-1.5">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-6" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.1), rgba(11,17,32,0))', borderLeft: '4px solid #F97316' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-orange-500/20 text-orange-400"><TrendingUp size={20} /></div>
            <span className="text-slate-400 text-sm font-medium">Views Today</span>
          </div>
          <div className="text-4xl font-display font-bold text-white mt-2">{data.todayViews.toLocaleString()}</div>
        </div>
        
        <div className="card p-6" style={{ background: 'linear-gradient(to right, rgba(59,130,246,0.1), rgba(11,17,32,0))', borderLeft: '4px solid #3B82F6' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded bg-blue-500/20 text-blue-400"><BarChart3 size={20} /></div>
            <span className="text-slate-400 text-sm font-medium">All-Time Views</span>
          </div>
          <div className="text-4xl font-display font-bold text-white mt-2">{data.totalViews.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Pages */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Eye size={16} className="text-orange-400" /> Top Performing Pages
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-800">
                  <th className="pb-3 font-medium">Page URL</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Views</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-4">
                      <a href={page.url} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-orange-400 truncate block max-w-[300px]">
                        {page.url === '/' ? '/ (Home)' : page.url}
                      </a>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                        {page.service || 'Page'}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-orange-400 font-semibold">{page.views.toLocaleString()}</td>
                  </tr>
                ))}
                {data.topPages.length === 0 && (
                  <tr><td colSpan={3} className="py-6 text-center text-slate-500">No views recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Devices & Cities */}
        <div className="flex flex-col gap-6">
          {/* Devices */}
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Monitor size={16} className="text-blue-400" /> Devices
            </h3>
            <div className="space-y-4 mt-2">
              {data.devices.map((device, i) => {
                const percentage = data.totalViews ? Math.round((device.count / data.totalViews) * 100) : 0;
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        {device.device === 'Mobile' ? <Smartphone size={14}/> : <Monitor size={14}/>} {device.device}
                      </span>
                      <span className="text-slate-400 font-mono">{device.count} <span className="text-xs">({percentage}%)</span></span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: \`\${percentage}%\` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cities */}
          <div className="card p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <MapPin size={16} className="text-green-400" /> Top Cities
            </h3>
            <div className="space-y-3 mt-2">
              {data.topCities.map((city, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-slate-800/50">
                  <span className="text-slate-300">{city.city}</span>
                  <span className="text-orange-400 font-mono font-semibold bg-orange-500/10 px-2 py-0.5 rounded">{city.views}</span>
                </div>
              ))}
              {data.topCities.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-2">No city data available yet.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
