import { useState } from 'react';
import type { AnalysisResponse, ATSScoreResponse } from '../types';
import AnalysisResult from './AnalysisResult';
import ATSDashboard from './ATSDashboard';
import SkillGap from './SkillGap';
import { Brain, BarChart2, GitCompare, ArrowLeft, RefreshCw, Loader2, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { analyzeResume, scoreResume } from '../api/resumeApi';

type Tab = 'analysis' | 'ats' | 'skillgap';

interface Props {
  analysisData: AnalysisResponse;
  atsData: ATSScoreResponse;
  resumeText: string;
  fileName: string;
  onBack: () => void;
}

const scoreColor  = (s: number) => s >= 75 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444';
const scoreTailwind = (s: number) => s >= 75 ? 'text-emerald-500' : s >= 50 ? 'text-amber-500' : 'text-rose-500';
const scoreBgRing = (s: number) => s >= 75 ? 'from-emerald-400 to-emerald-600' : s >= 50 ? 'from-amber-400 to-amber-500' : 'from-rose-400 to-rose-600';
const scoreLabel  = (s: number) => s >= 75 ? 'Good' : s >= 50 ? 'Average' : 'Needs Work';
const scoreLabelBg = (s: number) => s >= 75 ? 'bg-emerald-100 text-emerald-700' : s >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700';

const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  { id: 'analysis', label: 'AI Analysis', icon: <Brain className="w-5 h-5" />,     desc: 'Skills, strengths & suggestions', color: 'indigo' },
  { id: 'ats',      label: 'ATS Score',   icon: <BarChart2 className="w-5 h-5" />, desc: 'Keyword & format scoring',         color: 'purple' },
  { id: 'skillgap', label: 'Skill Gap',   icon: <GitCompare className="w-5 h-5" />,desc: 'Match against job description',    color: 'violet' },
];

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative w-36 h-36 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={scoreColor(score)} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-extrabold ${scoreTailwind(score)}`}>{score}</span>
        <span className="text-xs text-slate-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

export default function ResultsPage({ analysisData, atsData, resumeText, fileName, onBack }: Props) {
  const [activeTab, setActiveTab]     = useState<Tab>('analysis');
  const [analysis, setAnalysis]       = useState(analysisData);
  const [ats, setAts]                 = useState(atsData);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [error, setError]             = useState('');

  const handleReanalyze = async () => {
    setReanalyzing(true);
    setError('');
    try {
      const [aRes, sRes] = await Promise.all([analyzeResume(resumeText), scoreResume(resumeText)]);
      setAnalysis(aRes.data);
      setAts(sRes.data);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Re-analysis failed.');
    } finally {
      setReanalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff]">

      {/* Sticky Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-slate-600 truncate max-w-[200px]">{fileName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600">Analysis Complete</span>
            </div>
            <button onClick={handleReanalyze} disabled={reanalyzing}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 transition-all shadow-sm">
              {reanalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Re-analyze
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">{error}</div>
        )}

        {/* Hero Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ATS Score Card — large */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center gap-4">
            <ScoreRing score={ats.overallScore} />
            <div className="text-center">
              <div className="text-lg font-extrabold text-slate-800">ATS Score</div>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${scoreLabelBg(ats.overallScore)}`}>
                {scoreLabel(ats.overallScore)}
              </span>
            </div>
            {/* Mini progress bars */}
            <div className="w-full space-y-2 pt-2 border-t border-slate-100">
              {Object.entries(ats.skillsBreakdown).map(([name, val]) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-20 flex-shrink-0">{name}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, backgroundColor: scoreColor(val) }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 w-8 text-right">{val}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-5">
            {/* Skills */}
            <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm p-6 flex flex-col justify-between">
              <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">{analysis.skills.length}</div>
                <div className="text-sm font-bold text-slate-700 mt-1">Skills Detected</div>
                <div className="text-xs text-slate-400 mt-0.5">Extracted by Gemini AI</div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 flex flex-col justify-between">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                <BarChart2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-purple-600">{ats.foundKeywords.length}</div>
                <div className="text-sm font-bold text-slate-700 mt-1">Keywords Matched</div>
                <div className="text-xs text-slate-400 mt-0.5">Out of {ats.foundKeywords.length + ats.missingKeywords.length} ATS keywords</div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 flex flex-col justify-between">
              <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-emerald-600">{analysis.strengths.length}</div>
                <div className="text-sm font-bold text-slate-700 mt-1">Strengths Found</div>
                <div className="text-xs text-slate-400 mt-0.5">Positive highlights</div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-6 flex flex-col justify-between">
              <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-amber-500">{analysis.suggestions.length}</div>
                <div className="text-sm font-bold text-slate-700 mt-1">Improvements</div>
                <div className="text-xs text-slate-400 mt-0.5">AI-powered suggestions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Tab Bar */}
          <div className="flex border-b border-slate-100 bg-slate-50/60">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 px-4 py-4 text-sm font-semibold transition-all border-b-2
                  ${activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-white shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/70'}`}>
                <span className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <div className="text-center sm:text-left leading-tight">
                  <div className="font-bold">{tab.label}</div>
                  <div className="text-xs font-normal text-slate-400 hidden sm:block">{tab.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'analysis' && <AnalysisResult data={analysis} />}
            {activeTab === 'ats'      && <ATSDashboard data={ats} />}
            {activeTab === 'skillgap' && <SkillGap resumeText={resumeText} />}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative">
            <h3 className="text-white font-extrabold text-xl">Want to improve your score?</h3>
            <p className="text-indigo-200 text-sm mt-1.5 max-w-md">
              Paste a job description in the Skill Gap tab to see exactly what skills you're missing and get a personalized action plan.
            </p>
          </div>
          <button onClick={() => setActiveTab('skillgap')}
            className="relative flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl">
            <GitCompare className="w-4 h-4" />
            Try Skill Gap Analysis
          </button>
        </div>

      </div>
    </div>
  );
}
