import { forwardRef, useState } from 'react';
import FileUpload from './FileUpload';
import { uploadResume, analyzeResume, scoreResume } from '../api/resumeApi';
import type { AnalysisResponse, ATSScoreResponse } from '../types';
import { Brain, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onAnalysisComplete: (analysis: AnalysisResponse, ats: ATSScoreResponse, text: string, fileName: string) => void;
}

const Analyzer = forwardRef<HTMLDivElement, Props>(({ onAnalysisComplete }, ref) => {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName]     = useState('');
  const [uploading, setUploading]   = useState(false);
  const [analyzing, setAnalyzing]   = useState(false);
  const [error, setError]           = useState('');

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');
    setResumeText('');
    setFileName('');
    try {
      const res = await uploadResume(file);
      setResumeText(res.data.text);
      setFileName(res.data.filename);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText) return;
    setAnalyzing(true);
    setError('');
    try {
      const [analysisRes, atsRes] = await Promise.all([
        analyzeResume(resumeText),
        scoreResume(resumeText),
      ]);
      onAnalysisComplete(analysisRes.data, atsRes.data, resumeText, fileName);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="analyze" ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4">
            Free Analyzer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Analyze Your <span className="gradient-text">Resume Now</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-lg mx-auto">
            Upload your resume and get a full AI-powered report on a dedicated results page.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-8">

          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${resumeText ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'}`}>
              {resumeText ? <CheckCircle2 className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-sm font-semibold ${resumeText ? 'text-emerald-600' : 'text-slate-700'}`}>
              Upload Resume
            </span>
            <div className="flex-1 h-px bg-slate-200 mx-2" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${resumeText ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              2
            </div>
            <span className={`text-sm font-semibold ${resumeText ? 'text-slate-700' : 'text-slate-400'}`}>
              Get Full Report
            </span>
          </div>

          <FileUpload onUpload={handleUpload} isLoading={uploading} uploadedFileName={fileName} />

          {error && (
            <div className="mt-4 flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {resumeText && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mt-6 w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-base disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-200 hover:scale-[1.01]"
            >
              {analyzing
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing with Gemini AI...</>
                : <><Brain className="w-5 h-5" /> Generate Full Report</>
              }
            </button>
          )}

          {/* What you'll get */}
          {!resumeText && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: '🧠', label: 'AI Analysis' },
                { icon: '📊', label: 'ATS Score' },
                { icon: '🎯', label: 'Skill Gap' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-semibold text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Analyzer.displayName = 'Analyzer';
export default Analyzer;
