import { ArrowDown, Sparkles, Star, Users, FileCheck } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
}

const stats = [
  { icon: <Users className="w-4 h-4" />, value: '50K+', label: 'Resumes Analyzed' },
  { icon: <Star className="w-4 h-4" />,  value: '4.9/5', label: 'User Rating' },
  { icon: <FileCheck className="w-4 h-4" />, value: '3x',  label: 'More Interviews' },
];

export default function Hero({ onGetStarted }: Props) {
  return (
    <section id="features" className="hero-gradient min-h-screen flex flex-col items-center justify-center pt-16 px-6 text-center">
      {/* Badge */}
      <div className="animate-fade-in-up opacity-0 delay-100 inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-sm font-medium mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        AI-Powered Resume Intelligence
      </div>

      {/* Headline */}
      <h1 className="animate-fade-in-up opacity-0 delay-200 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl">
        Land Your Dream Job<br />
        <span className="gradient-text">Faster with AI</span>
      </h1>

      {/* Subheadline */}
      <p className="animate-fade-in-up opacity-0 delay-300 mt-6 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
        Upload your resume and get instant AI analysis, ATS compatibility score,
        and personalized skill gap insights — all in seconds.
      </p>

      {/* CTA Buttons */}
      <div className="animate-fade-in-up opacity-0 delay-400 flex flex-col sm:flex-row items-center gap-4 mt-10">
        <button
          onClick={onGetStarted}
          className="animate-pulse-ring flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base rounded-xl shadow-xl hover:shadow-indigo-300 transition-all"
        >
          <Sparkles className="w-5 h-5" />
          Analyze My Resume — Free
        </button>
        <a
          href="#how-it-works"
          className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 font-semibold text-base rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
        >
          See How It Works
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>

      {/* Stats */}
      <div className="animate-fade-in-up opacity-0 delay-400 flex flex-wrap justify-center gap-8 mt-16">
        {stats.map(({ icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
              {icon}
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-slate-800">{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <a href="#how-it-works" className="mt-10 flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors">
        <span className="text-xs">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
