import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Brain, Scissors, History, ArrowRight, 
  CheckCircle, Crown, Shield, Lock, EyeOff, Server,
  Zap, Layers
} from 'lucide-react';

const HomeSupport = () => {
  
  const features = [
    { icon: <Code2 className="text-blue-400" />, title: "Explain Code", desc: "Beginner-friendly breakdowns of complex logic." },
    { icon: <Zap className="text-yellow-400" />, title: "Summarize Logic", desc: "Get the gist of long files in seconds." },
    { icon: <Brain className="text-purple-400" />, title: "DSA & Algorithms", desc: "Visualize data structures with examples." },
    { icon: <Scissors className="text-red-400" />, title: "Clean & Trim", desc: "Remove comments and unnecessary whitespace." },
    { icon: <History className="text-green-400" />, title: "Learning History", desc: "Auto-saved chats to revisit your growth." },
  ];

  const securityPoints = [
    { icon: <Shield size={18} />, text: "Secure Auth" },
    { icon: <EyeOff size={18} />, text: "Private History" },
    { icon: <Lock size={18} />, text: "No Public Sharing" },
    { icon: <Server size={18} />, text: "Encrypted Data" },
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ================= SECTION 3: MOTTO (Positioning) ================= */}
        <section className="py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Layers size={14} /> Philosophy
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Not another <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI chatbot.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            CodeSage is a personal code learning companion — built to help developers understand their own code, revisit it later, and track improvement over time.
          </p>
        </section>

        {/* ================= SECTION 4: CORE FEATURES (Free) ================= */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-white mb-2">Learn Without Pressure</h3>
            <p className="text-slate-400">Everything you need to grow is included in the free plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feat, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {React.cloneElement(feat.icon, { size: 24 })}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feat.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
            
            {/* CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col justify-center items-center text-center shadow-lg shadow-purple-900/20">
              <h4 className="text-xl font-bold text-white mb-2">Ready to start?</h4>
              <p className="text-purple-100 text-sm mb-6">Join thousands of developers coding smarter.</p>
              <Link to="/auth" className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2">
                Start Free <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: LEARNING MODE (The Edge) ================= */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full mb-4 border border-green-500/20">
                Your Edge
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Learning Mode <br/>
                <span className="text-slate-500 text-2xl md:text-4xl">Built for Real Understanding</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Most AI just gives you the answer. CodeSage teaches you *why* it works. This is where you win against generic chatbots.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Step-by-step logic breakdowns",
                  "Inline comments added to your code",
                  "Example-based explanations",
                  "Focus on 'Why' not just 'What'"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Representation */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                AI Analysis
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-4">
                   <div className="text-slate-600 select-none">1</div>
                   <div className="text-purple-400">const <span className="text-blue-400">calculate</span> = (a, b) =&gt; &#123;</div>
                </div>
                <div className="flex gap-4 bg-green-500/10 -mx-6 px-6 py-1 border-l-2 border-green-500">
                   <div className="text-slate-600 select-none">2</div>
                   <div className="text-slate-400 italic">// AI: This adds two numbers securely</div>
                </div>
                <div className="flex gap-4">
                   <div className="text-slate-600 select-none">3</div>
                   <div className="text-slate-300 pl-4">return a + b;</div>
                </div>
                <div className="flex gap-4">
                   <div className="text-slate-600 select-none">4</div>
                   <div className="text-purple-400">&#125;;</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: PREMIUM (Teaser) ================= */}
        <section className="py-20 border-t border-white/5">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 p-8 md:p-16 text-center">
            
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                <Crown size={32} className="text-yellow-500" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Upgrade When You’re Ready to Master</h2>
              <p className="text-slate-400 mb-8">
                Unlock personalized learning paths, progress tracking, and deep code comparisons.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {["Personalized Explanations", "Progress Tracking", "Smart Re-analysis", "Advanced DSA"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-800 border border-white/5 text-slate-300 text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <button disabled className="px-8 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl border border-white/5 cursor-not-allowed flex items-center gap-2 mx-auto">
                <Lock size={16} /> Premium Access — Coming Soon
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 7: TRUST & SECURITY ================= */}
        <section className="py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Your Code. Your Control.</h3>
            <p className="text-slate-500 text-sm">We prioritize privacy above all else.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8">
            {securityPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span className="text-purple-500">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomeSupport;