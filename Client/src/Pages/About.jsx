import React from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Code2, 
  Users, 
  Globe 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const About = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Our Story</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Built by developers, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              for developers.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CodeSage was born from a simple idea: coding shouldn't be about struggling with syntax, but about building great things. 
            We use AI to bridge the gap between complex logic and human understanding.
          </p>
        </div>
      </section>

      {/* ================= MISSION STATEMENT ================= */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                  Our Mission
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Democratizing software engineering with AI.</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  We believe that every developer—whether a junior just starting out or a senior architect—deserves a tool that acts as a second brain. 
                  Our goal is to reduce cognitive load, catch errors early, and make high-quality code accessible to everyone.
                </p>
                <div className="flex gap-8">
                  <div>
                    <div className="text-3xl font-bold text-white">10k+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Users Helped</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">1M+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Lines Analyzed</div>
                  </div>
                </div>
              </div>
              
              {/* Illustration / Graphic */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-slate-800 p-6 rounded-2xl border border-white/5">
                    <Code2 className="text-purple-400 mb-3" size={32} />
                    <div className="h-2 w-12 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-20 bg-slate-700 rounded" />
                  </div>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 opacity-50">
                    <Globe className="text-indigo-400 mb-3" size={32} />
                    <div className="h-2 w-16 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-10 bg-slate-700 rounded" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 opacity-50">
                    <Users className="text-pink-400 mb-3" size={32} />
                    <div className="h-2 w-12 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-24 bg-slate-700 rounded" />
                  </div>
                  <div className="bg-slate-800 p-6 rounded-2xl border border-white/5">
                    <TrendingUp className="text-green-400 mb-3" size={32} />
                    <div className="h-2 w-20 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-12 bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Builders</h2>
            <p className="text-slate-400">The passionate team behind the code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "John Doe", 
                role: "Founder & CEO", 
                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
                bio: "Ex-Google engineer with a passion for AI and developer tools." 
              },
              { 
                name: "Jane Smith", 
                role: "Lead Engineer", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                bio: "Full-stack wizard specializing in scalable architecture and LLMs." 
              },
              { 
                name: "Samuel Lee", 
                role: "Product Design", 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                bio: "Obsessed with creating intuitive, frictionless user experiences." 
              },
            ].map((member, i) => (
              <div key={i} className="group bg-slate-950 border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors text-center">
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-purple-500 transition-colors">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm font-medium mb-4">{member.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Rocket size={32} />, 
                title: "Innovation", 
                desc: "We don't just follow trends; we aim to set the standard for what AI coding assistants can be.",
                color: "text-blue-400 bg-blue-400/10"
              },
              { 
                icon: <ShieldCheck size={32} />, 
                title: "Privacy First", 
                desc: "Your code is your intellectual property. We process it securely and never use it to train our public models.",
                color: "text-green-400 bg-green-400/10"
              },
              { 
                icon: <TrendingUp size={32} />, 
                title: "Continuous Growth", 
                desc: "We believe in constant iteration—both for our product and for the developers who use it.",
                color: "text-purple-400 bg-purple-400/10"
              },
            ].map((val, i) => (
              <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-slate-800 transition-colors">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${val.color}`}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;