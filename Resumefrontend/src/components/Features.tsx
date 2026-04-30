import { Brain, BarChart2, GitCompare, Zap, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
    title: 'AI Resume Analysis',
    desc: 'Gemini AI extracts your skills, identifies strengths & weaknesses, and gives actionable improvement suggestions.',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
    title: 'ATS Score Dashboard',
    desc: 'See exactly how Applicant Tracking Systems score your resume with keyword matching, formatting, and experience checks.',
  },
  {
    icon: <GitCompare className="w-6 h-6" />,
    color: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
    title: 'Skill Gap Analysis',
    desc: 'Paste any job description and instantly see matching skills, missing skills, and a personalized action plan.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
    title: 'Instant Results',
    desc: 'Get comprehensive analysis in seconds. No waiting, no sign-up required. Just upload and analyze.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
    title: 'Secure & Private',
    desc: 'Your resume data is processed securely and never stored. Complete privacy guaranteed.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    color: 'bg-rose-50 text-rose-600',
    border: 'border-rose-100',
    title: 'Job-Specific Matching',
    desc: 'Compare your resume against specific job descriptions to maximize your match percentage.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Supercharge Your<br />
            <span className="gradient-text">Job Search</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Three powerful tools in one place to help you land more interviews.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, color, border, title, desc }) => (
            <div
              key={title}
              className={`card-hover bg-white rounded-2xl p-6 border ${border} shadow-sm`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>
                {icon}
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
