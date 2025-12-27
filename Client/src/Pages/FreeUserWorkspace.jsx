import React, { useContext, useEffect, useState } from 'react';
import { 
  Play, Trash2, Copy, Download, Maximize2, 
  FileCode, MessageSquare, Scissors, Lightbulb, Loader2,
  Menu,
  Code,
  ChevronDown,
  Code2
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "@monaco-editor/react";
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';
import { useLocation } from 'react-router-dom';

const FreeUserWorkSpace = () => {
    
  const {
    input, setInput,
    isLoading,
    handleSaveAsTxt,
    handleCopyExplanation,
    handleCode,
    result, setResult,
    userChats, getUserChats
  } = useContext(CodeContext); 
  const [language,setLanguage]= useState("javascript");

  const [activeTab, setActiveTab] = useState("summary");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const runAnalysis = async (actionType) => {
    const selectedAction = actionType || activeTab;
    setActiveTab(selectedAction);

    let backendAction = "Summarize";
    if (selectedAction === "summary") backendAction = "Summarize";
    if (selectedAction === "explain") backendAction = "Explain";
    if (selectedAction === "suggest") backendAction = "Suggest";
    if (selectedAction === "trim") backendAction = "Trim";
    if (selectedAction === "dsa_guide") backendAction = "DSA Guide";

    await handleCode({ 
      code: input, 
      action: backendAction, 
      chatId: currentChatId ,
      language:language
    });
  };

  const handleSelectChat = (chat) => {
    setInput(chat.code);
    setCurrentChatId(chat._id); 
    if (setResult) setResult(chat.result);

    const tabMapping = {
        "Summarize": "summary",
        "Explain": "explain",
        "Suggest": "suggest",
        "Trim": "trim",
        "DSA Guide": "dsa_guide"
    };
    setActiveTab(tabMapping[chat.action] || "summary");
    
    if (window.innerWidth < 768) setIsHistoryOpen(false);
  };

  const handleClearEditor = () => {
    setInput("");          
    setResult(null);       
    setCurrentChatId(null); 
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

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) getUserChats();
  },[])

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const { templatePrompt, activeTab } = location.state;
      if (templatePrompt) setInput(templatePrompt);
      if (activeTab) setActiveTab(activeTab);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
];



  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="flex-1 flex pt-20 min-h-screen overflow-hidden">
        
        {userChats && (
           <ChatHistorySidebar 
               chats={userChats} 
               isOpen={isHistoryOpen}
               toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)}
               onSelectChat={handleSelectChat}
           />
        )}

        <div className="flex-1 flex  flex-col min-w-0 w-lg bg-[#020617] min-h-screen">
          
          <div className="h-16 border-b border-white/5 bg-slate-900/50 flex items-center justify-between px-4 md:px-6 shrink-0 backdrop-blur-sm z-20">
            
            <div className="flex items-center gap-4">
               {!isHistoryOpen && (
                 <button onClick={() => setIsHistoryOpen(true)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
                    <Menu size={20} />
                 </button>
               )}
               
               <div className="hidden md:flex items-center gap-3">
                 <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-mono text-purple-400">editor</span>
                    {currentChatId && (
                      <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">
                        Editing
                      </span>
                    )}
                 </div>

                 <div className="h-4 w-px bg-white/10 mx-2"></div>

                 <div className="relative z-50 w-40">
                    <button 
                      onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300
                        ${isLangMenuOpen 
                            ? "bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                            : "bg-slate-900/50 border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-slate-200"
                        }
                      `}
                    >
                        <Code2 size={14} className={isLangMenuOpen ? "text-purple-400" : "text-slate-500"} />
                        <span className="tracking-wide">{languages.find(l => l.value === language)?.label}</span>
                        <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? "rotate-180 text-purple-400" : "text-slate-600"}`} />
                    </button>

                    {isLangMenuOpen && (
                        <>
                            <div className="fixed inset-0" onClick={() => setIsLangMenuOpen(false)} />
                            <div className="absolute top-full mt-2 left-0 w-48 max-h-80 overflow-y-auto noScroll bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl shadow-purple-900/20 backdrop-blur-xl flex flex-col p-1 gap-0.5 animate-in fade-in zoom-in-95 duration-200">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.value}
                                        onClick={() => {
                                            setLanguage(lang.value);
                                            setIsLangMenuOpen(false);
                                        }}
                                        className={`
                                            w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between
                                            ${language === lang.value 
                                                ? "bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40" 
                                                : "text-slate-400 hover:bg-white/5 hover:text-purple-300"
                                            }
                                        `}
                                    >
                                        {lang.label}
                                        {language === lang.value && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                 </div>
               </div>
            </div>

            <div className="flex bg-slate-950/50 rounded-lg p-1 border border-white/5">
              {[
                  { id: "summary", label: "Summary", icon: <FileCode size={14} /> },
                  { id: "explain", label: "Explain", icon: <MessageSquare size={14} /> },
                  { id: "suggest", label: "Suggest", icon: <Lightbulb size={14} /> },
                  { id: "trim", label: "Trim", icon: <Scissors size={14} /> },
                  { id: "dsa_guide", label: "DSA Guide", icon: <Code size={14} /> },
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      activeTab === tab.id 
                        ? "bg-purple-600 text-white shadow-lg" 
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                  </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
               <button onClick={handleClearEditor} className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors" title="Clear">
                  <Trash2 size={18} />
               </button>
               <button 
                  onClick={() => runAnalysis(activeTab)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all"
               >
                  {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16} fill="currentColor" />}
                  <span className="hidden md:inline">{currentChatId ? "Update" : "Run Analysis"}</span>
               </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-screen">
            
            <div className="flex-1 min-w-0 noScroll relative border-r border-white/5 min-h-[50%] md:min-h-full flex flex-col">
               <Editor
                  height="100%"
                  language={language || result?.language} 
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  value={input}
                  onChange={(value) => setInput(value)} 
                  loading={<div className="p-10 text-slate-500">Loading Editor...</div>}
                  options={{
                    minimap: { enabled: false }, 
                    fontSize: 14, 
                    scrollBeyondLastLine: false, 
                    automaticLayout: true, 
                    padding: { top: 20, bottom: 20 },
                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace", 
                  }}
               />
               <div className="absolute bottom-2 right-4 bg-slate-800/80 px-2 py-1 rounded text-[10px] text-slate-400 font-mono pointer-events-none backdrop-blur-sm border border-white/5">
                  {input?.length || 0} chars
               </div>
            </div>

            <div className="flex-1 min-w-0 bg-slate-900 flex flex-col min-h-[50%] md:min-h-full border-t md:border-t-0 md:border-l border-white/5 max-h-screen noScroll">
               
               <div className="h-10 flex items-center justify-between px-4 bg-slate-950 border-b border-white/5 shrink-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Console / Result
                  </span>
                  {result && (
                    <div className="flex gap-1">
                       <button onClick={handleCopyExplanation} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Copy"><Copy size={14}/></button>
                       <button onClick={handleSaveAsTxt} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Download"><Download size={14}/></button>
                    </div>
                  )}
               </div>

               <div className="flex-1 overflow-auto p-6 noScroll">
                  {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                       <div className="relative">
                          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full"></div>
                          <Loader2 size={40} className="animate-spin text-purple-500 relative z-10" />
                       </div>
                       <p className="animate-pulse text-sm">Analyzing code logic...</p>
                    </div>
                  ) : result ? (
                    <div className="animate-in fade-in duration-500 max-w-full noScroll">
                       {activeTab === "trim" || activeTab === "suggest"|| activeTab === "dsa_guide" ? (
                         <SyntaxHighlighter 
                           language="javascript" 
                           style={vscDarkPlus}
                           customStyle={{ margin: 0, padding: '1.5rem', borderRadius: '0.5rem', fontSize: '0.9rem', backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)' }}
                           wrapLongLines={true}
                         >
                           {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                         </SyntaxHighlighter>
                       ) : ( 
                         <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-sans">
                           <div className="whitespace-pre-wrap noScroll">
                             {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                           </div>
                         </div>
                       )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                       <Maximize2 size={32} strokeWidth={1} className="mb-3" />
                       <p className="text-sm">Output will appear here</p>
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

export default FreeUserWorkSpace;