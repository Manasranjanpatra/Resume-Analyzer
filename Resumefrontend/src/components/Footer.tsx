import { Brain, ExternalLink, Code2, Globe, Mail, MapPin, Phone, Sparkles, Shield, Zap } from 'lucide-react';

const socialLinks = [
  { icon: <Code2 className="w-4 h-4" />, href: '#', label: 'GitHub' },
  { icon: <Globe className="w-4 h-4" />, href: '#', label: 'Website' },
  { icon: <ExternalLink className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
];

const footerLinks = {
  Product: [
    { label: 'AI Resume Analysis', href: '#features' },
    { label: 'ATS Score Checker', href: '#features' },
    { label: 'Skill Gap Analysis', href: '#features' },
    { label: 'Job Matching', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
  ],
  Resources: [
    { label: 'Resume Tips', href: '#' },
    { label: 'ATS Guide', href: '#' },
    { label: 'Interview Prep', href: '#' },
    { label: 'Career Blog', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Support', href: '#' },
  ],
};

const badges = [
  { icon: <Zap className="w-3.5 h-3.5" />, text: 'Powered by Gemini AI' },
  { icon: <Shield className="w-3.5 h-3.5" />, text: '100% Secure & Private' },
  { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Free to Use' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">

      {/* CTA Banner */}
      <div className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to land your dream job?</h3>
            <p className="text-slate-400 text-sm">Join 50,000+ professionals who improved their resume with ResumeAI.</p>
          </div>
          <a
            href="#analyze"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-900"
          >
            <Sparkles className="w-4 h-4" />
            Analyze My Resume — Free
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Resume<span className="text-indigo-400">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The smartest AI-powered resume analyzer. Get instant ATS scores, skill gap analysis,
              and personalized suggestions to land more interviews.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2">
              {badges.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-indigo-400">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              {[
                { icon: <Mail className="w-3.5 h-3.5" />, text: 'support@resumeai.com' },
                { icon: <Phone className="w-3.5 h-3.5" />, text: '+1 (555) 000-0000' },
                { icon: <MapPin className="w-3.5 h-3.5" />, text: 'San Francisco, CA' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-600">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all text-slate-400 hover:text-white hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm mb-1">Get resume tips in your inbox</h4>
              <p className="text-xs text-slate-500">Weekly career advice, ATS tips, and job search strategies.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-56 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ResumeAI. All rights reserved. Built with Gemini AI + Spring Boot + React.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="hover:text-slate-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
