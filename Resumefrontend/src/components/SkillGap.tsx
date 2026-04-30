import { useState } from 'react';
import type { SkillGapResponse } from '../types';
import { analyzeSkillGap } from '../api/resumeApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Search, Loader2 } from 'lucide-react';

interface Props { resumeText: string; }

export default function SkillGap({ resumeText }: Props) {
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<SkillGapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await analyzeSkillGap(resumeText, jobDesc);
      setResult(res.data);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pieData = result
    ? [
        { name: 'Matching', value: result.matchingSkills.length },
        { name: 'Missing', value: result.missingSkills.length },
      ]
    : [];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-3">Paste Job Description</h3>
        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          rows={6}
          placeholder="Paste the job description here to compare with your resume..."
          className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !jobDesc.trim()}
          className="mt-3 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
        </button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {result && (
        <>
          {/* Match Score + Pie */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="w-44 h-44 flex-shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                    <Cell fill="#6366f1" />
                    <Cell fill="#fca5a5" />
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">{result.matchPercentage}%</span>
                <span className="text-xs text-slate-400">Match</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-slate-600 text-sm leading-relaxed">{result.summary}</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                  <span className="text-slate-600">{result.matchingSkills.length} Matching</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-red-300 inline-block" />
                  <span className="text-slate-600">{result.missingSkills.length} Missing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-indigo-600 mb-3">✓ Matching Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.matchingSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-rose-500 mb-3">✗ Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm border border-rose-100">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-amber-600 mb-3">💡 Personalized Suggestions</h3>
            <ul className="space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
