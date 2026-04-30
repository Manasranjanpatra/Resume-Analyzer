import type { AnalysisResponse } from '../types';
import { Lightbulb, TrendingUp, TrendingDown, Code2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Props { data: AnalysisResponse; }

export default function AnalysisResult({ data }: Props) {
  return (
    <div className="space-y-6">

      {/* Skills */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Code2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Extracted Skills</h3>
            <p className="text-xs text-slate-400">{data.skills.length} skills identified by AI</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Strengths */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Strengths</h3>
              <p className="text-xs text-slate-400">{data.strengths.length} positive highlights</p>
            </div>
          </div>
          <ul className="space-y-3">
            {data.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 to-white p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Weaknesses</h3>
              <p className="text-xs text-slate-400">{data.weaknesses.length} areas to improve</p>
            </div>
          </div>
          <ul className="space-y-3">
            {data.weaknesses.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/50 to-white p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI Suggestions</h3>
            <p className="text-xs text-slate-400">{data.suggestions.length} actionable improvements</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.suggestions.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-amber-100 shadow-sm">
              <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <ArrowRight className="w-3 h-3 text-amber-600" />
              </div>
              <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
