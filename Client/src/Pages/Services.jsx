import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bug, 
  BookOpen, 
  Zap, 
  FileText, 
  Globe, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Services = () => {
  
  const servicesList = [ 
    {
      icon: <Bug size={28} />,
      title: "Code Review & Debugging",
      desc: "Automated analysis to identify bugs, security vulnerabilities, and logic errors before they break your production build.",
      color: "text-red-400",
      bg: "bg-red-400/10"
    },
    {
      icon: <BookOpen size={28} />,
      title: "Code Explanation",
      desc: "Struggling with legacy code? Get line-by-line explanations in plain English to understand complex logic instantly.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: <Zap size={28} />,
      title: "Performance Optimization",
      desc: "AI-driven suggestions to reduce Time Complexity (Big O), refactor loops, and improve memory usage.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    },
    {
      icon: <FileText size={28} />,
      title: "Code Summarization",
      desc: "Generate concise documentation and README files from raw code files automatically.",
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      icon: <Globe size={28} />,
      title: "Multi-Language Support",
      desc: "Seamlessly analyze Python, JavaScript, C++, Java, Go, and Rust with language-specific context awareness.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      icon: <BrainCircuit size={28} />,
      title: "AI Architectural Insights",
      desc: "Get high-level advice on design patterns, modularity, and best practices for scalable software architecture.",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">What we do</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Everything you need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Master Your Codebase
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From instant debugging to architectural advice, CodeSage provides a complete suite of AI tools designed for modern developers.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-8 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/30 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-purple-400 transition-colors">
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURE COMPARISON ================= */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Why developers choose CodeSage</h3>
              <p className="text-slate-400 mb-8 text-lg">
                We don't just find errors; we teach you how to fix them. Our platform is designed to be a learning companion, not just a debugger.
              </p>
              
              <div className="space-y-4">
                {[
                  "99.9% Uptime & Fast Response",
                  "Secure Code Processing (No Storage)",
                  "Integrates with your workflow",
                  "Community-driven updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-1 bg-green-500/10 rounded-full">
                      <CheckCircle2 size={18} className="text-green-500" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl blur-2xl -z-10" />
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-slate-400 font-mono text-sm">analysis_result.json</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-4">
                    <span className="text-slate-600">1</span>
                    <span className="text-purple-400">"status"</span>: <span className="text-green-400">"optimized"</span>,
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">2</span>
                    <span className="text-purple-400">"time_complexity"</span>: <span className="text-yellow-400">"O(n log n)"</span>,
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">3</span>
                    <span className="text-purple-400">"suggestions"</span>: [
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">4</span>
                    <span className="text-slate-300 ml-4">"Use a hash map for lookups",</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">5</span>
                    <span className="text-slate-300 ml-4">"Remove nested loops"</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">6</span>
                    ]
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to write better code?</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10">
          Join thousands of developers using CodeSage to optimize their workflow.
        </p>
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-white/20"
        >
          <Zap size={20} className="fill-slate-950" /> Start optimizing now
        </Link>
      </section>

    </div>
  );
};

export default Services;