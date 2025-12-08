import React, { useContext, useEffect, useState } from 'react';
import { 
  Play, 
  Trash2, 
  Copy, 
  Download, 
  Maximize2, 
  FileCode, 
  MessageSquare, 
  Scissors, 
  Lightbulb, 
  Loader2 
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';

const Analyze = () => {
  
  const {
    input, setInput,
    suggestedCode,
    explanation,
    trimmedCode,
    summarizedCode,
    isLoading,
    getExplanation,
    getSuggestion,
    getSummary,
    getTrimmedCode,
    handleSaveAsTxt,
    handleCopyExplanation
  } = useContext(CodeContext);

  const [activeTab, setActiveTab] = useState("summary");

  // Map actions to tabs
  const handleAction = async (action) => {
    setActiveTab(action);
    if (action === "summary") getSummary();
    if (action === "explain") getExplanation();
    if (action === "suggest") getSuggestion();
    if (action === "trim") getTrimmedCode();
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case "summary": return summarizedCode;
      case "explain": return explanation;
      case "suggest": return suggestedCode;
      case "trim": return trimmedCode;
      default: return "";
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="pt-24 pb-10 px-6 h-screen flex flex-col">
        
        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border-b border-white/5 px-6 py-4 rounded-t-xl gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm font-mono text-slate-400">editor.js</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setInput("")}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Clear Editor"
            >
              <Trash2 size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-purple-900/20"
              onClick={() => handleAction("summary")} // Default action
            >
              <Play size={16} fill="currentColor" /> Run Analysis
            </button>
          </div>
        </div>

        {/* MAIN WORKSPACE (Split View) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden border border-white/5 border-t-0 rounded-b-xl bg-slate-900/50 backdrop-blur-sm">
          
          {/* LEFT: EDITOR */}
          <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="// Paste your code here..."
              className="flex-1 w-full h-full bg-slate-950/50 p-6 font-mono text-sm text-slate-300 resize-none focus:outline-none focus:bg-slate-950/80 transition-colors"
              spellCheck="false"
            />
            <div className="absolute bottom-4 right-6 text-xs text-slate-500 font-mono">
              {input.length} chars
            </div>
          </div>

          {/* RIGHT: AI OUTPUT */}
          <div className="w-full lg:w-1/2 flex flex-col bg-slate-900">
            
            {/* TABS */}
            <div className="flex border-b border-white/5">
              {[
                { id: "summary", label: "Summary", icon: <FileCode size={16} /> },
                { id: "explain", label: "Explain", icon: <MessageSquare size={16} /> },
                { id: "suggest", label: "Suggestions", icon: <Lightbulb size={16} /> },
                { id: "trim", label: "Trim", icon: <Scissors size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleAction(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id 
                      ? "border-purple-500 text-white bg-white/5" 
                      : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-6 overflow-y-auto relative custom-scrollbar">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                  <Loader2 size={40} className="animate-spin text-purple-500" />
                  <p className="animate-pulse">Analyzing logic...</p>
                </div>
              ) : getActiveContent() ? (
                <div className="relative group">
                  {/* Action Buttons (Copy/Download) */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={handleCopyExplanation}
                      className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-purple-600 hover:text-white transition-colors shadow-lg"
                      title="Copy to Clipboard"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={handleSaveAsTxt}
                      className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
                      title="Download as .txt"
                    >
                      <Download size={16} />
                    </button>
                  </div>

                  {/* Code / Text Output */}
                  {activeTab === "trim" || activeTab === "suggest" ? (
                    <SyntaxHighlighter 
                      language="javascript" 
                      style={vscDarkPlus}
                      customStyle={{ padding: '1.5rem', borderRadius: '0.75rem', fontSize: '0.9rem', backgroundColor: '#0f172a' }}
                      wrapLongLines={true}
                    >
                      {getActiveContent()}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                      {getActiveContent()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
                  <Maximize2 size={48} strokeWidth={1} className="mb-4" />
                  <p>Select an action to analyze your code.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Analyze;