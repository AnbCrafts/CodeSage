import React, { useContext, useEffect, useState } from 'react';
import { 
  Play, Trash2, Copy, Download, Maximize2, Minimize2,
  FileCode, MessageSquare, Scissors, Lightbulb, Loader2 
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "@monaco-editor/react";
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';

const Analyze = () => {
   
  const {
    input, setInput,
    isLoading,
    handleSaveAsTxt,
    handleCopyExplanation,
    handleCode,
    result, setResult, // Ensure setResult is exported from your ContextProvider
    userChats, getUserChats
  } = useContext(CodeContext); 

  const [activeTab, setActiveTab] = useState("summary");
  
  // --- EXPANSION STATES ---
  const [leftExpanded, setLeftExpanded] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  // --- ANALYSIS HANDLER ---
  const runAnalysis = async (actionType) => {
    let backendAction = "Summarize";
    if (actionType === "summary") backendAction = "Summarize";
    if (actionType === "explain") backendAction = "Explain";
    if (actionType === "suggest") backendAction = "Suggest";
    if (actionType === "trim") backendAction = "Trim";

    setActiveTab(actionType);
    await handleCode({ code: input, action: backendAction });
  };

  const handleSelectChat = (chat) => {
    setInput(chat.code);
    
    if (setResult) {
        setResult(chat.result);
    }

    const tabMapping = {
        "Summarize": "summary",
        "Explain": "explain",
        "Suggest": "suggest",
        "Trim": "trim"
    };
    setActiveTab(tabMapping[chat.action] || "summary");
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        setIsHistoryOpen(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme('codesage-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'e2e8f0', background: '0f172a' },
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c084fc' },
        { token: 'string', foreground: '4ade80' },
        { token: 'number', foreground: 'facc15' },
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#e2e8f0',
        'editorCursor.foreground': '#c084fc',
        'editor.lineHighlightBackground': '#1e293b',
        'editorLineNumber.foreground': '#475569',
        'editorIndentGuide.background': '#1e293b',
      }
    });
    monaco.editor.setTheme('codesage-dark');
  };

  // --- 🧠 SMART LAYOUT LOGIC ---
  const isVertical = leftExpanded && rightExpanded; 

  const containerClass = isVertical ? "flex-col" : "flex-row";

  // LEFT PANEL DYNAMIC CLASSES
  const getLeftClass = () => {
    if (isVertical) return "w-full h-1/2 border-b border-white/5"; 
    if (leftExpanded) return "flex-1 w-full"; 
    if (rightExpanded) return "w-12 border-r border-white/5"; 
    return "w-1/2 border-r border-white/5"; 
  };

  // RIGHT PANEL DYNAMIC CLASSES
  const getRightClass = () => {
    if (isVertical) return "w-full h-1/2"; 
    if (rightExpanded) return "flex-1 w-full"; 
    if (leftExpanded) return "w-12"; 
    return "w-1/2"; 
  };

  const isLeftStrip = !leftExpanded && rightExpanded && !isVertical;
  const isRightStrip = !rightExpanded && leftExpanded && !isVertical;

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) getUserChats();
  },[])

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />
      
      <div className="pt-24 pb-10 px-6 h-screen flex flex-col">
        
        {/* GLOBAL TOOLBAR */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border-b border-white/5 px-6 py-4 rounded-t-xl gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm font-mono text-slate-400">editor.js</span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setInput("")} className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors" title="Clear Editor">
              <Trash2 size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-purple-900/20"
              onClick={() => runAnalysis(activeTab)}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16} fill="currentColor" />}
              Run Analysis
            </button>
          </div>
        </div>

        {/* MAIN SPLIT WORKSPACE */}
        <div className={`flex-1 flex overflow-hidden border border-white/5 border-t-0 rounded-b-xl bg-slate-900/50 backdrop-blur-sm transition-all duration-500 ease-in-out ${containerClass}`}>
        
        {userChats && (
            <ChatHistorySidebar 
                chats={userChats} 
                isOpen={isHistoryOpen}
                toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)}
                onSelectChat={handleSelectChat}
            />
        )}
          
          {/* ================= LEFT: EDITOR ================= */}
          <div className={`relative bg-[#0f172a] transition-all duration-500 ease-in-out ${getLeftClass()} ${isLeftStrip ? 'cursor-pointer hover:bg-slate-800' : ''}`}
               onClick={() => isLeftStrip && setLeftExpanded(true)} 
          >
            
            {/* Toggle Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLeftExpanded(!leftExpanded); }}
              className={`absolute z-20 p-1.5 text-slate-500 hover:text-white bg-slate-800/50 rounded-md backdrop-blur-md transition-all hover:bg-purple-500/20
                ${isLeftStrip ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-2 right-4'} 
              `}
              title={leftExpanded ? "Shrink" : "Expand"}
            >
              {leftExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Content (Hide if Strip) */}
            <div className={`h-full w-full flex flex-col ${isLeftStrip ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Editor
                height="100%"
                defaultLanguage="javascript" 
                onMount={handleEditorDidMount}
                theme="vs-dark"
                value={input}
                onChange={(value) => setInput(value)} 
                loading={<div className="p-4 text-slate-500">Loading Editor...</div>}
                options={{
                  minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 20, bottom: 20 },
                  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace", 
                }}
              />
              <div className="absolute bottom-2 right-4 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400 font-mono z-10 backdrop-blur-sm pointer-events-none border border-white/5">
                {input?.length || 0} chars
              </div>
            </div>
          </div>

          {/* ================= RIGHT: AI OUTPUT ================= */}
          <div className={`relative bg-slate-900 transition-all duration-500 ease-in-out ${getRightClass()} ${isRightStrip ? 'cursor-pointer hover:bg-slate-800' : ''}`}
               onClick={() => isRightStrip && setRightExpanded(true)} 
          >
            
            {/* Toggle Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setRightExpanded(!rightExpanded); }}
              className={`absolute z-20 p-1.5 text-slate-500 hover:text-white bg-slate-800/50 rounded-md backdrop-blur-md transition-all hover:bg-purple-500/20
                ${isRightStrip ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-2 right-2'}
              `}
              title={rightExpanded ? "Shrink" : "Expand"}
            >
              {rightExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Content (Hide if Strip) */}
            <div className={`h-full w-full flex flex-col ${isRightStrip ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              
              {/* Tabs */}
              <div className="flex border-b border-white/5 pr-12">
                {[
                  { id: "summary", label: "Summary", icon: <FileCode size={16} /> },
                  { id: "explain", label: "Explain", icon: <MessageSquare size={16} /> },
                  { id: "suggest", label: "Suggest", icon: <Lightbulb size={16} /> },
                  { id: "trim", label: "Trim", icon: <Scissors size={16} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => runAnalysis(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-all ${
                      activeTab === tab.id ? "border-purple-500 text-white bg-white/5" : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Output Body */}
              <div className="flex-1 p-6 overflow-y-auto relative custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                    <Loader2 size={40} className="animate-spin text-purple-500" />
                    <p className="animate-pulse">Thinking...</p>
                  </div>
                ) : result ? (
                  <div className="relative group">
                    <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-slate-900 pl-2 pb-2">
                      <button onClick={handleCopyExplanation} className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-purple-600 hover:text-white transition-colors shadow-lg"><Copy size={16} /></button>
                      <button onClick={handleSaveAsTxt} className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white transition-colors shadow-lg"><Download size={16} /></button>
                    </div>
                    {activeTab === "trim" || activeTab === "suggest" ? (
                      <SyntaxHighlighter 
                        language="javascript" 
                        style={vscDarkPlus}
                        customStyle={{ padding: '1.5rem', borderRadius: '0.75rem', fontSize: '0.9rem', backgroundColor: '#0f172a' }}
                        wrapLongLines={true}
                      >
                        {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                      </SyntaxHighlighter>
                    ) : (
                      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                        {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
                    <Maximize2 size={48} strokeWidth={1} className="mb-4" />
                    <p>Paste code and click "Run Analysis"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analyze;