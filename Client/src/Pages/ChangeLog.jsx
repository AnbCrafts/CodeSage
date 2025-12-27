import React from 'react';
import { 
  GitCommit, CheckCircle, Sparkles, Zap, Clock, 
  Construction, ArrowUpRight, Rocket 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Changelog = () => {

  const releases = [
    {
      version: "Upcoming",
      date: "In Development",
      type: "roadmap",
      description: "What we are building next.",
      items: [
        "Premium Subscription features",
        "Direct GitHub Repository integration",
        "User Progress Tracking dashboard",
        "Public Profile sharing"
      ]
    },
    {
      version: "v1.1.0",
      date: "Dec 15, 2024",
      type: "minor",
      description: "Focus on Learning Mode and UX polish.",
      items: [
        "IMPROVED: Learning Mode explanations are now 2x more detailed",
        "NEW: Auto-generated intelligent Chat Titles",
        "POLISH: Refined UI for the Code Editor workspace",
        "FIX: Mobile responsiveness for sidebar navigation"
      ]
    },
    {
      version: "v1.0.0",
      date: "Dec 01, 2024",
      type: "major",
      description: "Initial Public Release.",
      items: [
        "NEW: Core Analysis Engine (Explain, Summarize, Suggest, Trim)",
        "NEW: Syntax Highlighting for JavaScript/React",
        "NEW: Persistent Chat History",
        "NEW: Basic User Authentication"
      ]
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-4xl mx-auto pt-28 pb-20 px-6">

        {/* HEADER */}
        <div className="text-center mb-16 border-b border-white/5 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
            <GitCommit size={14} /> Release Notes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Changelog
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            We build in public. Here is a timeline of our journey, updates, and improvements to CodeSage.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="space-y-12 relative">
          
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/10 hidden md:block" />

          {releases.map((release, idx) => (
            <div key={idx} className="relative md:pl-16 group">
              
              {/* Timeline Dot (Desktop) */}
              <div className={`
                hidden md:flex absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 border-slate-950 items-center justify-center z-10
                ${release.type === 'roadmap' ? 'bg-slate-800 text-slate-400' : 
                  release.type === 'major' ? 'bg-purple-600 text-white' : 
                  'bg-slate-800 text-blue-400'}
              `}>
                {release.type === 'roadmap' ? <Construction size={18} /> : 
                 release.type === 'major' ? <Rocket size={18} /> : 
                 <Zap size={18} />}
              </div>

              {/* Content Card */}
              <div className={`
                rounded-2xl border p-8 transition-all duration-300
                ${release.type === 'roadmap' 
                  ? 'bg-slate-900/30 border-dashed border-white/10' 
                  : 'bg-slate-900 border-white/5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/10'}
              `}>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xl font-bold ${release.type === 'roadmap' ? 'text-slate-400' : 'text-white'}`}>
                        {release.version}
                      </span>
                      <span className="text-sm text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                        {release.date}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">
                      {release.description}
                    </p>
                  </div>

                  {release.type === 'major' && (
                     <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider rounded-full border border-purple-500/20 self-start md:self-center">
                       Major Release
                     </span>
                  )}
                </div>

                <ul className="space-y-4">
                  {release.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      {release.type === 'roadmap' ? (
                        <Clock size={16} className="text-slate-600 mt-0.5 shrink-0" />
                      ) : (
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                      )}
                      <span className={release.type === 'roadmap' ? 'text-slate-500' : 'text-slate-300'}>
                        {item.includes(":") ? (
                          <>
                            <strong className="text-white opacity-80">{item.split(":")[0]}:</strong>
                            {item.split(":")[1]}
                          </>
                        ) : item}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}

        </div>
        
        {/* FOOTER NOTE */}
        <div className="mt-20 text-center">
           <a 
             href="https://github.com" 
             target="_blank" 
             rel="noreferrer"
             className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
           >
             View commit history on GitHub <ArrowUpRight size={14} />
           </a>
        </div>

      </div>
    </div>
  );
};

export default Changelog;