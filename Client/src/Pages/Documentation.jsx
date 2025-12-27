import React, { useState } from 'react';
import { 
  Book, Play, Layout, Zap, Shield, HelpCircle, 
  FileCode, MessageSquare, Scissors, Lightbulb, ChevronRight, CheckCircle 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('start');

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'start', label: 'Getting Started', icon: <Play size={16} /> },
    { id: 'workspace', label: 'Using the Workspace', icon: <Layout size={16} /> },
    { id: 'learning', label: 'Learning Mode', icon: <Zap size={16} /> },
    { id: 'security', label: 'Account & Security', icon: <Shield size={16} /> },
    { id: 'troubleshoot', label: 'Troubleshooting', icon: <HelpCircle size={16} /> },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            User <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Documentation</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Master CodeSage in minutes. Learn how to analyze, optimize, and understand your code without the technical jargon.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ================= LEFT SIDEBAR (Sticky Navigation) ================= */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">On this page</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* ================= RIGHT CONTENT AREA ================= */}
          <div className="flex-1 space-y-16">
            
            {/* 1. GETTING STARTED */}
            <section id="start" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Book size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Getting Started</h2>
              </div>
              
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">What is CodeSage?</h3>
                  <p className="text-slate-400 leading-relaxed">
                    CodeSage isn't just a chatbot; it's a <strong>personal code learning companion</strong>. While other AI tools generate code for you, CodeSage focuses on helping you understand the code you already have. It helps you revisit logic, debug errors, and track your improvement over time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Understanding Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                        <FileCode size={18} /> Summarize
                      </div>
                      <p className="text-sm text-slate-400">Creates a quick, plain-English overview of what the code does. Great for long files.</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                        <MessageSquare size={18} /> Explain
                      </div>
                      <p className="text-sm text-slate-400">A deep dive line-by-line breakdown. Best for learning new logic or DSA.</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                        <Lightbulb size={18} /> Suggest
                      </div>
                      <p className="text-sm text-slate-400">Finds bugs, potential errors, or ways to make your code faster.</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                        <Scissors size={18} /> Trim
                      </div>
                      <p className="text-sm text-slate-400">Removes comments, spaces, and logs to make the code production-ready.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. USING THE WORKSPACE */}
            <section id="workspace" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Layout size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Using the Workspace</h2>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-2xl p-8">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">1</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">Code Editor (Left Panel)</h4>
                      <p className="text-slate-400 text-sm">Paste your code here. It supports JavaScript syntax highlighting. You can type directly or paste from your IDE.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">2</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">Output Console (Right Panel)</h4>
                      <p className="text-slate-400 text-sm">This is where the AI responds. You can switch between tabs (Summary, Explain, etc.) to view different perspectives on the same code without re-running it.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">3</span>
                    <div>
                      <h4 className="font-bold text-white mb-1">Templates</h4>
                      <p className="text-slate-400 text-sm">Don't know what to ask? Use the <strong>Templates</strong> page to load pre-written prompts for debugging, interviewing, or refactoring.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. LEARNING MODE */}
            <section id="learning" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Zap size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Learning Mode</h2>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Lightbulb size={120} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-4">Why use this instead of ChatGPT?</h3>
                  <p className="text-slate-400 mb-6">
                    Generic chatbots give you the answer. CodeSage gives you the <strong>understanding</strong>.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-green-500" />
                      <span><strong>Step-by-Step Logic:</strong> We break down complex loops and functions into simple English.</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-green-500" />
                      <span><strong>DSA Friendly:</strong> Perfect for LeetCode. It explains "Why" a solution works, not just "How".</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-green-500" />
                      <span><strong>Context Retention:</strong> We remember your previous chats so you can revisit them later.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. ACCOUNT & SECURITY */}
            <section id="security" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg"><Shield size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Account & Security</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                   <h4 className="font-bold text-white mb-2">Data Privacy</h4>
                   <p className="text-sm text-slate-400">Your code is processed in real-time and your chat history is private to your account. We do not use your code to train public models.</p>
                </div>
                <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                   <h4 className="font-bold text-white mb-2">Chat History</h4>
                   <p className="text-sm text-slate-400">All your analyses are saved automatically. You can access them from the Dashboard or the Sidebar in the workspace.</p>
                </div>
              </div>
            </section>

            {/* 5. TROUBLESHOOTING */}
            <section id="troubleshoot" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/20 text-red-400 rounded-lg"><HelpCircle size={24} /></div>
                <h2 className="text-2xl font-bold text-white">Troubleshooting</h2>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-slate-300">
                    <span>The AI isn't responding or loading forever</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight size={16} />
                    </span>
                  </summary>
                  <div className="text-slate-400 text-sm mt-3 leading-relaxed">
                    This usually happens if the API key limit is reached or if the input code is too large. Try refreshing the page or pasting a smaller snippet of code.
                  </div>
                </details>
                <div className="h-px bg-white/5" />
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-slate-300">
                    <span>My Chat History is empty</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight size={16} />
                    </span>
                  </summary>
                  <div className="text-slate-400 text-sm mt-3 leading-relaxed">
                    Ensure you are logged in. History is tied to your account. If you just registered, your history will be empty until you run your first analysis.
                  </div>
                </details>
                <div className="h-px bg-white/5" />
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-slate-300">
                    <span>Can I delete a chat?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight size={16} />
                    </span>
                  </summary>
                  <div className="text-slate-400 text-sm mt-3 leading-relaxed">
                    Currently, chat deletion is not supported in the UI but will be available in the next update.
                  </div>
                </details>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Documentation;