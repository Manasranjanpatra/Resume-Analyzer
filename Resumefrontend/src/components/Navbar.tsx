import { Brain, Sparkles } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
}

export default function Navbar({ onGetStarted }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            Resume<span className="gradient-text">AI</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Analyze'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onGetStarted}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-indigo-200 hover:shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Analyze Free
        </button>
      </div>
    </nav>
  );
}
