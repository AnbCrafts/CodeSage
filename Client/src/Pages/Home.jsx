import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Cpu, 
  FileText, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  UploadCloud, 
  Settings, 
  FileOutput, 
  Users, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';
import { assets } from '../assets/assets';

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      {/* ================= HERO SECTION ================= */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Understand Code <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Instantly with AI
            </span>
          </h1>

          <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CodeSage decodes complex logic into plain English, suggests optimizations, 
            and refactors your code — tailored for developers who want speed and clarity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
            >
              Start Analyzing Free <ArrowRight size={18} />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-medium border border-white/10 rounded-full hover:bg-white/10 transition-all"
            >
              View Demo
            </a>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE DEMO (Mockup) ================= */}
      <div className="max-w-6xl mx-auto px-6 mb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20" />
        
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-xl group">
          {/* Mock Browser Header */}
          <div className="h-12 bg-slate-900/80 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 px-3 py-1 bg-black/20 rounded text-xs text-slate-500 font-mono">codesage.ai/editor</div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
             <img 
               src={assets.hero_bg} 
               alt="CodeSage Interface" 
               className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" 
             />
             <div className="relative z-10 text-center">
                <Link to="/analyze" className="inline-flex flex-col items-center gap-4 group/btn">
                   <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover/btn:scale-110 transition-transform duration-300">
                      <UploadCloud size={32} className="text-white" />
                   </div>
                   <span className="text-white font-semibold text-lg drop-shadow-md">Upload or Paste Code</span>
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* ================= FEATURES GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supercharge your workflow</h2>
          <p className="text-slate-400">Everything you need to write better code, faster.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Cpu className="text-indigo-400" />, title: "AI Understanding", desc: "Instantly explain logic in plain English." },
            { icon: <Zap className="text-purple-400" />, title: "Optimization", desc: "Reduce complexity & improve Big O." },
            { icon: <FileText className="text-cyan-400" />, title: "File Support", desc: "Upload full files for batch analysis." },
            { icon: <Code2 className="text-pink-400" />, title: "Refactoring", desc: "Clean up messy code automatically." },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="py-24 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How CodeSage Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            {[
              { icon: <UploadCloud />, title: "1. Input", desc: "Paste code or upload a file." },
              { icon: <Settings />, title: "2. Analyze", desc: "AI scans for logic & errors." },
              { icon: <FileOutput />, title: "3. Result", desc: "Get explanation & optimization." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-slate-950 border-4 border-slate-900 rounded-full flex items-center justify-center text-purple-400 mb-6 shadow-xl relative">
                   {step.icon}
                   <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= LIVE EDITOR PREVIEW ================= */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Try it Live
          </h2>
          <p className="text-slate-400 mt-2">Paste a snippet to see the magic happen.</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-white/10 shadow-2xl p-1">
          <div className="flex flex-col md:flex-row">
            <textarea 
              className="w-full md:w-2/3 h-64 p-6 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none placeholder:text-slate-600"
              placeholder="// Paste your complex code here..."
            ></textarea>
            <div className="w-full md:w-1/3 bg-slate-950/50 p-6 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-4">
               <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Actions</div>
               <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                 <Zap size={16} /> Optimize
               </button>
               <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                 <FileText size={16} /> Explain
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= USE CASES ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Who uses CodeSage?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <GraduationCap />, label: "Students", sub: "Learn logic faster" },
            { icon: <Users />, label: "Teachers", sub: "Create examples" },
            { icon: <Briefcase />, label: "Developers", sub: "Refactor daily" },
            { icon: <Terminal />, label: "Interviewers", sub: "Check solutions" },
          ].map((user, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-white/5 rounded-xl text-center hover:bg-slate-800 transition-colors">
              <div className="text-purple-400 flex justify-center mb-4">{user.icon}</div>
              <h3 className="font-bold text-white">{user.label}</h3>
              <p className="text-xs text-slate-500 mt-1">{user.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRICING ================= */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* FREE PLAN */}
          <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">Hobby</h3>
            <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-slate-400">
              {['Unlimited Explanations', 'Basic Optimization', 'Community Support'].map(feat => (
                <li key={feat} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-500" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-white/20 text-white rounded-xl hover:bg-white hover:text-slate-900 transition-all font-semibold">
              Get Started
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="p-8 bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="text-4xl font-bold text-white mb-6">TBD<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-slate-300">
              {['Deep Refactoring', 'Priority Processing', 'Project Analysis', 'Early Access'].map(feat => (
                <li key={feat} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-indigo-400" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all font-semibold shadow-lg shadow-indigo-900/20">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="max-w-3xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay updated</h2>
        <p className="text-slate-400 mb-8">Get the latest AI coding tips straight to your inbox.</p>
        <div className="flex max-w-md mx-auto relative">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full pl-6 pr-32 py-4 bg-slate-900 border border-white/10 rounded-full text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors">
            Join
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;