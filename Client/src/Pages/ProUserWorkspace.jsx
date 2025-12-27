import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { 
  Play, Copy, Download, MessageSquare, Scissors, Lightbulb, Loader2,
  Code, Upload, Languages, Sparkles, FileText, Check, X
} from 'lucide-react';
import Editor from "@monaco-editor/react";
import { toast } from 'react-toastify';

import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';
import ProUserChats from '../Components/ProUserChats'; 

// Moved outside component to prevent recreation on every render
const TABS_CONFIG = [
  { id: "summary", label: "Summary", icon: <FileText size={14} />, type: "text" },
  { id: "explain", label: "Explain", icon: <MessageSquare size={14} />, type: "text" },
  { id: "suggest", label: "Suggest", icon: <Lightbulb size={14} />, type: "text" },
  { id: "trim", label: "Trim", icon: <Scissors size={14} />, type: "code" },
  { id: "dsa_guide", label: "DSA Guide", icon: <Code size={14} />, type: "code" },
  { id: "polyglot", label: "Polyglot", icon: <Languages size={14} />, type: "code" },
  { id: "custom", label: "Custom", icon: <Sparkles size={14} />, type: "text" },
];

const ProUserWorkspace = () => {
   
  const { 
    input, setInput,
    isLoading,
    handleSaveAsTxt,
    handleCopyExplanation,
    handleCode,
    result, setResult,
    userChats, getUserChats,
  } = useContext(CodeContext); 

  const [language, setLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("summary");
  const [currentChatId, setCurrentChatId] = useState(null);
  
  // PRO SPECIFIC STATE
  const [targetLang, setTargetLang] = useState("python"); 
  const [customPrompt, setCustomPrompt] = useState("");   
  const [editorView, setEditorView] = useState("input");  
  const fileInputRef = useRef(null);

  // Memoized calculations
  const isCodeResult = useMemo(() => {
    return TABS_CONFIG.find(t => t.id === activeTab)?.type === "code";
  }, [activeTab]);

  // Memoized Options to prevent Editor freeze on re-render
  const commonEditorOptions = useMemo(() => ({
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "'Fira Code', monospace",
    padding: { top: 20 },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  }), []);

  const inputEditorOptions = useMemo(() => ({
    ...commonEditorOptions,
    readOnly: false
  }), [commonEditorOptions]);

  const outputEditorOptions = useMemo(() => ({
    ...commonEditorOptions,
    readOnly: true
  }), [commonEditorOptions]);

  // --- HANDLERS ---
  const runAnalysis = async () => {
    let backendAction = "Summarize";
    if (activeTab === "summary") backendAction = "Summarize";
    if (activeTab === "explain") backendAction = "Explain";
    if (activeTab === "suggest") backendAction = "Suggest";
    if (activeTab === "trim") backendAction = "Trim";
    if (activeTab === "dsa_guide") backendAction = "DSA Guide";
    if (activeTab === "polyglot") backendAction = "Polyglot"; 
    if (activeTab === "custom") backendAction = "Custom"; 

    if (isCodeResult) setEditorView("output");

    await handleCode({ 
      code: input, 
      action: backendAction, 
      chatId: currentChatId,
      language: language,
      targetLanguage: activeTab === 'polyglot' ? targetLang : null,
      customPrompt: activeTab === 'custom' ? customPrompt : null,
    });
  };

  const handleSelectChat = (chat) => {
    setInput(chat.code);
    setCurrentChatId(chat._id); 
    if (setResult) setResult(chat.result);
    const foundTab = TABS_CONFIG.find(t => t.label === chat.action || t.id === chat.action.toLowerCase());
    if (foundTab) setActiveTab(foundTab.id);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return toast.error("File too large (Max 1MB)");
    const reader = new FileReader();
    reader.onload = (ev) => {
        setInput(ev.target.result);
        toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
  };

  const handleEditorDidMount = useCallback((editor, monaco) => {
    monaco.editor.defineTheme('codesage-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ token: '', foreground: 'e2e8f0', background: '0f172a' }],
      colors: {
        'editor.background': '#0f172a',
        'editor.lineHighlightBackground': '#1e293b',
      }
    });
    monaco.editor.setTheme('codesage-dark');
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token && getUserChats) getUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]); 

  return (
    <div className="bg-slate-950 h-screen w-full flex flex-col overflow-hidden text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      
      <HomeHeader />

      <div className="flex-1 flex flex-col pt-20 h-full w-full max-w-[1920px] mx-auto">
        
        {/* ========================================================= */}
        {/* 1. MAIN TOOLBAR (Split into Static and Scrollable)        */}
        {/* ========================================================= */}
        <div className="h-16 shrink-0 border-b border-white/5 bg-[#020617] flex items-center px-4 md:px-6 z-20">
           
           {/* PART A: STATIC SECTION (History Dropdown needs to float OVER everything) */}
           {/* Removed overflow here so dropdown works */}
           <div className="shrink-0 relative z-50 mr-4">
              <ProUserChats chats={Array.isArray(userChats) ? userChats : []} onSelectChat={handleSelectChat} />
           </div>

           {/* PART B: SCROLLABLE SECTION (The rest of the tools) */}
           <div className="flex-1 flex items-center justify-between overflow-x-auto noScroll h-full min-w-0">
              
              {/* Left Controls (Inputs) */}
              <div className="flex items-center gap-3 shrink-0">
                 <div className="h-6 w-px bg-white/10 hidden md:block"></div>

                 <div className="flex items-center gap-2">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                    <button 
                       onClick={() => fileInputRef.current.click()}
                       className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                       title="Upload File"
                    >
                       <Upload size={16} />
                    </button>
                    
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-slate-900 border border-white/10 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-500"
                    >
                       <option value="javascript">JavaScript</option>
                       <option value="python">Python</option>
                       <option value="java">Java</option>
                       <option value="cpp">C++</option>
                       <option value="typescript">TypeScript</option>
                       <option value="go">Go</option>
                       <option value="rust">Rust</option>
                    </select>
                 </div>

                 {/* Dynamic Inputs */}
                 {activeTab === 'custom' && (
                    <div className="flex items-center gap-2 animate-in slide-in-from-left-2 ml-2">
                       <div className="h-6 w-px bg-white/10"></div>
                       <input 
                          type="text" 
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          placeholder="Type your custom instruction..."
                          className="w-32 md:w-64 bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-purple-500 transition-all outline-none placeholder:text-slate-600"
                       />
                    </div>
                 )}

                 {activeTab === 'polyglot' && (
                    <div className="flex items-center gap-2 animate-in slide-in-from-left-2 ml-2">
                       <div className="h-6 w-px bg-white/10"></div>
                       <span className="text-[10px] text-slate-500 font-mono uppercase">To:</span>
                       <select 
                          value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                          className="bg-slate-900 border border-white/10 text-xs rounded-lg px-2 py-1.5 text-white focus:border-purple-500 outline-none"
                       >
                          <option value="python">Python</option>
                          <option value="javascript">JavaScript</option>
                          <option value="cpp">C++</option>
                          <option value="java">Java</option>
                          <option value="go">Go</option>
                       </select>
                    </div>
                 )}
              </div>

              {/* Right Controls (Tabs & Run) */}
              <div className="flex items-center gap-4 shrink-0 pl-4">
                 <div className="hidden lg:flex bg-slate-900/50 rounded-lg p-1 border border-white/5">
                     {TABS_CONFIG.map((tab) => (
                         <button
                           key={tab.id}
                           onClick={() => { setActiveTab(tab.id); setEditorView('input'); }}
                           className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                             activeTab === tab.id 
                               ? "bg-purple-600 text-white shadow-lg" 
                               : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                           }`}
                         >
                           {tab.icon} <span className="hidden xl:inline">{tab.label}</span>
                         </button>
                     ))}
                 </div>
                 
                 {/* Mobile Tab Select */}
                 <div className="lg:hidden">
                    <select 
                       value={activeTab} 
                       onChange={(e) => setActiveTab(e.target.value)}
                       className="bg-slate-900 border border-white/10 text-xs rounded-lg px-2 py-1.5 text-white focus:border-purple-500 outline-none"
                    >
                       {TABS_CONFIG.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
                    </select>
                 </div>

                 {/* Run Button */}
                 <button 
                   onClick={runAnalysis}
                   disabled={isLoading}
                   className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all active:scale-95 shrink-0"
                 >
                    {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16} fill="currentColor" />}
                    <span>Run</span>
                 </button>
              </div>

           </div>
        </div>

        {/* ========================================================= */}
        {/* 2. WORKSPACE CONTENT                                      */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#020617] relative">
           
           {isCodeResult ? (
              <div className="flex flex-col h-full">
                 {/* File Tabs for Code Result */}
                 <div className="h-10 shrink-0 flex items-center px-6 border-b border-white/5 bg-slate-900/30">
                    <button 
                       onClick={() => setEditorView('input')}
                       className={`px-4 h-full text-xs font-mono border-b-2 transition-colors ${editorView === 'input' ? 'border-purple-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        Input.js
                    </button>
                    <button 
                       onClick={() => setEditorView('output')}
                       disabled={!result}
                       className={`px-4 h-full text-xs font-mono border-b-2 transition-colors flex items-center gap-2 ${editorView === 'output' ? 'border-purple-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        Output.{activeTab === 'polyglot' ? targetLang : 'js'}
                        {result && <Check size={10} className="text-green-500"/>}
                    </button>
                 </div>

                 <div className="flex-1 relative min-h-0">
                    <Editor
                        height="100%"
                        path={editorView === 'input' ? 'input_model' : 'output_model'}
                        language={editorView === 'input' ? language : (activeTab === 'polyglot' ? targetLang : language)}
                        theme="codesage-dark"
                        value={editorView === 'input' ? input : (typeof result === 'string' ? result : '')}
                        onChange={editorView === 'input' ? setInput : undefined}
                        options={editorView === 'input' ? inputEditorOptions : outputEditorOptions}
                        onMount={handleEditorDidMount}
                        loading={<Loader2 className="animate-spin text-purple-500" />}
                    />
                 </div>
              </div>
           ) : (
              /* Split View for Text Result */
              <div className="flex flex-col h-full">
                 {result && (
                     <div className="h-1/2 shrink-0 border-b border-white/10 flex flex-col bg-slate-900/20 min-h-0 animate-in slide-in-from-top-4 duration-300">
                        <div className="h-9 shrink-0 flex items-center justify-between px-4 bg-slate-950/50 border-b border-white/5">
                           <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                              <Sparkles size={12} /> Analysis Result
                           </span>
                           <div className="flex gap-2">
                               <button onClick={handleCopyExplanation} title="Copy" className="p-1 text-slate-500 hover:text-white transition-colors"><Copy size={14}/></button>
                               <button onClick={handleSaveAsTxt} title="Download" className="p-1 text-slate-500 hover:text-white transition-colors"><Download size={14}/></button>
                           </div>
                        </div>
                        <div className="flex-1 overflow-auto p-6 prose prose-invert prose-sm max-w-none custom-scrollbar">
                           {isLoading ? (
                               <div className="flex items-center gap-2 text-purple-400 animate-pulse"><Loader2 className="animate-spin" size={16}/> Generating analysis...</div>
                           ) : (
                               <div className="whitespace-pre-wrap">{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</div>
                           )}
                        </div>
                     </div>
                 )}

                 <div className="flex-1 flex flex-col relative min-h-0">
                    {!result && <div className="absolute top-2 right-4 z-10 text-[10px] text-slate-500 bg-slate-900/80 px-2 rounded border border-white/5 pointer-events-none">Input Code</div>}
                    <Editor
                        height="100%"
                        path="input_model"
                        language={language}
                        theme="codesage-dark"
                        value={input}
                        onChange={setInput}
                        options={inputEditorOptions}
                        onMount={handleEditorDidMount}
                        loading={<Loader2 className="animate-spin text-purple-500" />}
                    />
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default ProUserWorkspace;