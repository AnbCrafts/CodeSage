import React, { useState } from 'react';
import { 
  Shield, Lock, FileText, Eye, Server, 
  AlertTriangle, CheckCircle, Scale 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const PrivacyTerms = ({tab}) => {
  const [activeTab, setActiveTab] = useState(tab ||'privacy'); // 'privacy' | 'terms'

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-4xl mx-auto pt-28 pb-20 px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Legal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Trust</span>
          </h1>
          <p className="text-slate-400 text-lg">
            We believe in transparency. Here is exactly how we handle your data and the rules of the road.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900 p-1 rounded-xl border border-white/10 flex">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'privacy' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Lock size={16} /> Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'terms' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={16} /> Terms of Service
            </button>
          </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl">
          
          {/* ================= PRIVACY POLICY ================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Eye size={20} /></div>
                   <h2 className="text-2xl font-bold text-white">What We Collect</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We only store what is necessary to make CodeSage work for you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                    <span><strong>Account Info:</strong> Your username and email (used strictly for authentication).</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                    <span><strong>Code Snippets:</strong> The code you paste into the editor is sent to our AI engine for analysis.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                    <span><strong>Chat History:</strong> We save your conversations so you can revisit them later in your Dashboard.</span>
                  </li>
                </ul>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Server size={20} /></div>
                   <h2 className="text-2xl font-bold text-white">How Data is Used</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We use your data solely to provide the CodeSage service. 
                  <span className="text-white font-bold"> We do not sell your personal data to advertisers.</span>
                </p>
                <div className="bg-slate-950 border border-white/5 p-4 rounded-xl text-sm text-slate-400">
                  <strong className="text-purple-400 block mb-1">AI Disclaimer:</strong> 
                  Your code snippets are processed by Large Language Models (LLMs) to generate explanations. 
                  We do not use your private code to train public models.
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><Shield size={20} /></div>
                   <h2 className="text-2xl font-bold text-white">Security</h2>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  We use industry-standard <strong>JWT (JSON Web Token)</strong> authentication to ensure only you can access your account. 
                  Passwords are salted and hashed—we never see your raw password.
                </p>
              </div>

            </div>
          )}

          {/* ================= TERMS OF SERVICE ================= */}
          {activeTab === 'terms' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl flex items-start gap-4">
                <AlertTriangle size={24} className="text-yellow-500 shrink-0 mt-1" />
                <div>
                   <h3 className="font-bold text-yellow-500 mb-1">Important Disclaimer</h3>
                   <p className="text-slate-300 text-sm leading-relaxed">
                     CodeSage is a <strong>learning tool</strong>, not a replacement for professional code review or security auditing. 
                     AI can hallucinate or suggest insecure patterns. Always review code before deploying it to production.
                   </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-slate-950 rounded-lg border border-white/10 text-slate-400"><Scale size={20} /></div>
                   <h2 className="text-2xl font-bold text-white">Acceptable Use</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                    You must not use CodeSage to generate malicious code or malware.
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                    You are responsible for keeping your account credentials secure.
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                    Automated scraping of our API (outside of documented limits) is prohibited.
                  </li>
                </ul>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-slate-950 rounded-lg border border-white/10 text-slate-400"><Lock size={20} /></div>
                   <h2 className="text-2xl font-bold text-white">No Warranty</h2>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  The service is provided "as is". While we strive for high availability and accuracy, we cannot guarantee that the AI's suggestions will always be correct, bug-free, or optimal. You assume full responsibility for the code you implement based on CodeSage suggestions.
                </p>
              </div>

            </div>
          )}

        </div>
        
        <div className="text-center mt-12 text-slate-500 text-xs">
           Last updated: December 2024
        </div>

      </div>
    </div>
  );
};

export default PrivacyTerms;