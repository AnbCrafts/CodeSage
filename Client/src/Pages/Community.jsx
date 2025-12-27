import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, MessageSquare, Bug, Lightbulb, Heart, 
  Globe, Map, Share2, Construction 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Community = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">

        {/* ================= HERO ================= */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Construction size={14} /> Building in Public
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Shaped by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Developers</span>,<br />
            Built for Developers.
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            CodeSage isn't just a tool; it's a project growing alongside its users. 
            We value honesty, transparency, and code that actually works.
          </p>
        </div>

        {/* ================= MISSION / WHAT IS THIS ================= */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8">
                 <h2 className="text-2xl font-bold text-white mb-4">Not a walled garden.</h2>
                 <p className="text-slate-400 leading-relaxed mb-6">
                   Too many AI tools are black boxes. We believe in building tools that help you understand the "Why" behind the code, not just generating the "What".
                 </p>
                 <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-2"><Heart size={16} className="text-red-500" /> User First</div>
                    <div className="flex items-center gap-2"><Globe size={16} className="text-blue-500" /> Open Feedback</div>
                 </div>
              </div>
           </div>
           
           <div>
              <h3 className="text-xl font-bold text-white mb-6">Our Core Values</h3>
              <div className="space-y-6">
                 {[
                   { title: "Transparency", desc: "We share what we're building and why. No hidden agendas." },
                   { title: "Utility over Hype", desc: "We focus on features that solve real coding problems, not flashy demos." },
                   { title: "Community Driven", desc: "Your bug reports and feature requests directly dictate our roadmap." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-1 h-full bg-white/10 rounded-full">
                         <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                      </div>
                      <div>
                         <h4 className="font-bold text-white">{item.title}</h4>
                         <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* ================= WAYS TO ENGAGE ================= */}
        <div className="mb-24">
           <h2 className="text-3xl font-bold text-white text-center mb-12">How to Get Involved</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Feedback */}
              <Link to="/contact" className="group p-6 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/30 hover:bg-slate-900/80 transition-all text-center">
                 <div className="w-12 h-12 mx-auto bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Share Feedback</h3>
                 <p className="text-slate-400 text-sm mb-4">Love it? Hate it? Let us know what we can do better.</p>
                 <span className="text-xs font-bold text-blue-400 uppercase tracking-wider group-hover:underline">Write to us</span>
              </Link>

              {/* Card 2: Bug Report */}
              <Link to="/contact" className="group p-6 bg-slate-900 border border-white/5 rounded-2xl hover:border-red-500/30 hover:bg-slate-900/80 transition-all text-center">
                 <div className="w-12 h-12 mx-auto bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-red-400 group-hover:scale-110 transition-transform">
                    <Bug size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Report Bugs</h3>
                 <p className="text-slate-400 text-sm mb-4">Found a glitch in the matrix? Help us squash it quickly.</p>
                 <span className="text-xs font-bold text-red-400 uppercase tracking-wider group-hover:underline">Submit Report</span>
              </Link>

              {/* Card 3: Features */}
              <Link to="/contact" className="group p-6 bg-slate-900 border border-white/5 rounded-2xl hover:border-yellow-500/30 hover:bg-slate-900/80 transition-all text-center">
                 <div className="w-12 h-12 mx-auto bg-slate-950 rounded-xl flex items-center justify-center mb-4 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Lightbulb size={24} />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">Suggest Features</h3>
                 <p className="text-slate-400 text-sm mb-4">Have a brilliant idea? We prioritize user suggestions.</p>
                 <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider group-hover:underline">Pitch Idea</span>
              </Link>

           </div>
        </div>

        {/* ================= FUTURE VISION ================= */}
        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-slate-950 rounded-lg text-purple-400 border border-white/10"><Map size={24} /></div>
                 <h2 className="text-3xl font-bold text-white">The Roadmap</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 
                 <div>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                       <Share2 size={16} className="text-slate-500"/> Community Templates
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       Soon, you'll be able to create custom analysis templates and share them with the community. Imagine a "React Performance Audit" template built by a senior engineer, available to everyone.
                    </p>
                 </div>

                 <div>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                       <Users size={16} className="text-slate-500"/> Shared Learning
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       Optionally make specific analysis sessions public (read-only) to share a "Eureka!" moment or a tricky bug fix with your team or Twitter followers.
                    </p>
                 </div>

                 <div>
                    <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                       <MessageSquare size={16} className="text-slate-500"/> Open Discussions
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                       A lightweight forum where users can debate code efficiency, ask for human optimization tips, and discuss the nuances of AI suggestions.
                    </p>
                 </div>

              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Community;