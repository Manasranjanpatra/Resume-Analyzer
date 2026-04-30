import { Upload, Cpu, BarChart2, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: <Upload className="w-6 h-6" />,
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    title: 'Upload Your Resume',
    desc: 'Drag & drop or browse your PDF or DOC/DOCX resume file. We support all standard formats.',
  },
  {
    step: '02',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    title: 'AI Analyzes It',
    desc: 'Gemini AI reads your resume, extracts skills, evaluates strengths and weaknesses in seconds.',
  },
  {
    step: '03',
    icon: <BarChart2 className="w-6 h-6" />,
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    title: 'Get Actionable Insights',
    desc: 'View your ATS score, skill gaps, and personalized suggestions to improve your resume.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            From upload to insights in under 30 seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          {steps.map(({ step, icon, color, bg, title, desc }, i) => (
            <div key={step} className="flex-1 flex flex-col md:flex-row items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
                  {icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-px h-full bg-slate-200 mt-4" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${bg} text-slate-500 mb-2`}>
                  STEP {step}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 mt-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
