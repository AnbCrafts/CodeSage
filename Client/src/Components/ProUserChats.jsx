import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, ChevronDown, FileCode, MessageSquare, Scissors, Lightbulb, 
  Search, X, Calendar, Code, Sparkles, Languages
} from 'lucide-react';

const ProUserChats = ({ chats = [], onSelectChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // --- 1. CLICK OUTSIDE TO CLOSE ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- 2. HELPERS (Reused for consistency) ---
  const getActionIcon = (action) => {
    const act = (action || "").toLowerCase();
    if (act.includes('summarize')) return <FileCode size={14} className="text-blue-400" />;
    if (act.includes('explain'))   return <MessageSquare size={14} className="text-green-400" />;
    if (act.includes('suggest'))   return <Lightbulb size={14} className="text-yellow-400" />;
    if (act.includes('trim'))      return <Scissors size={14} className="text-red-400" />;
    if (act.includes('polyglot'))  return <Languages size={14} className="text-cyan-400" />;
    if (act.includes('custom'))    return <Sparkles size={14} className="text-pink-400" />;
    return <Code size={14} className="text-purple-400" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // --- 3. FILTER LOGIC (With Safety Checks) ---
  // Ensure chats is always an array before filtering
  const safeChats = Array.isArray(chats) ? chats : [];
  
  const filteredChats = safeChats.filter(chat => {
    if (!chat) return false;
    const term = searchTerm.toLowerCase();
    return (
      (chat.title || "").toLowerCase().includes(term) || 
      (chat.action || "").toLowerCase().includes(term) ||
      (chat.code || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* TRIGGER BUTTON (Header Item) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200
          ${isOpen 
            ? "bg-purple-500/10 border-purple-500/50 text-purple-300" 
            : "bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
          }
        `}
      >
        <Clock size={16} />
        <span className="text-sm font-medium hidden sm:inline">History</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 noScroll overflow-hidden  z-50 animate-in fade-in slide-in-from-top-2">
          
          {/* A. Search Header */}
          <div className="p-3 border-b border-white/5 bg-slate-950/30">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50 placeholder:text-slate-600 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* B. Chat List */}
          <div className="max-h-80 noScroll overflow-y-auto custom-scrollbar p-2 space-y-1">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <button
                  key={chat._id || Math.random()}
                  onClick={() => {
                    onSelectChat(chat);
                    setIsOpen(false);
                  }}
                  className="w-full text-left group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  {/* Icon Box */}
                  <div className="shrink-0 mt-0.5 p-1.5 rounded bg-slate-950 border border-white/5 group-hover:border-purple-500/20 transition-colors">
                    {getActionIcon(chat.action)}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm text-slate-300 font-medium truncate pr-2 group-hover:text-purple-300 transition-colors">
                        {chat.title || "Untitled Analysis"}
                      </h4>
                      <span className="text-[10px] text-slate-600 font-mono shrink-0 pt-0.5">
                        {formatDate(chat.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 group-hover:text-slate-400">
                      {chat.action} • {chat.code?.slice(0, 40).replace(/\n/g, ' ') || "No code"}...
                    </p>
                  </div>
                </button>
              ))
            ) : (
              /* Empty State */
              <div className="py-8 text-center text-slate-500">
                <Calendar size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">No chats found</p>
              </div>
            )}
          </div>

          {/* C. Footer */}
          <div className="px-3 py-2 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-mono">
            <span>{filteredChats.length} results</span>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="hover:text-purple-400 flex items-center gap-1">
                <X size={10} /> Clear Filter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProUserChats;