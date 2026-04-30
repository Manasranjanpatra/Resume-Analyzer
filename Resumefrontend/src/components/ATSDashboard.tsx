import type { ATSScoreResponse } from '../types';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Props { data: ATSScoreResponse; }

const scoreColor = (score: number) =>
  score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

const labelConfig = {
  GOOD: { text: 'Good', bg: 'bg-emerald-100', text_color: 'text-emerald-700' },
  AVERAGE: { text: 'Average', bg: 'bg-amber-100', text_color: 'text-amber-700' },
  POOR: { text: 'Needs Work', bg: 'bg-red-100', text_color: 'text-red-700' },
};

export default function ATSDashboard({ data }: Props) {
  const radialData = [{ value: data.overallScore, fill: scoreColor(data.overallScore) }];
  const barData = Object.entries(data.skillsBreakdown).map(([name, value]) => ({ name, value }));
  const label = labelConfig[data.scoreLabel];

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#f1f5f9' }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="-mt-28 flex flex-col items-center">
            <span className="text-4xl font-bold" style={{ color: scoreColor(data.overallScore) }}>{data.overallScore}</span>
            <span className="text-slate-400 text-sm">/ 100</span>
          </div>
        </div>
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-800">ATS Score</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${label.bg} ${label.text_color}`}>{label.text}</span>
          </div>
          {barData.map(({ name, value }) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{name}</span>
                <span className="font-medium" style={{ color: scoreColor(value) }}>{value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${value}%`, backgroundColor: scoreColor(value) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-4">Score Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={40}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              formatter={(v: number) => [`${v}%`, 'Score']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {barData.map(({ value }, i) => (
                <Cell key={i} fill={scoreColor(value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-emerald-600 mb-3">✓ Found Keywords ({data.foundKeywords.length})</h3>
          <div className="flex flex-wrap gap-2">
            {data.foundKeywords.map((k, i) => (
              <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100">{k}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-rose-500 mb-3">✗ Missing Keywords ({data.missingKeywords.length})</h3>
          <div className="flex flex-wrap gap-2">
            {data.missingKeywords.map((k, i) => (
              <span key={i} className="px-2 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-medium border border-rose-100">{k}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
