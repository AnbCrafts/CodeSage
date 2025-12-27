import React from 'react';
import { 
  Clock, FileCode, MessageSquare, Scissors, Lightbulb, ChevronRight, MoreHorizontal 
} from 'lucide-react';

const ChatHistorySidebar = ({ chats = [], onSelectChat, isOpen, toggleSidebar }) => {

  // Helper: Get Icon based on Action Type
  const getActionIcon = (action) => {
    switch (action) {
      case 'Summarize': return <FileCode size={16} className="text-blue-400" />;
      case 'Explain':   return <MessageSquare size={16} className="text-green-400" />;
      case 'Suggest':   return <Lightbulb size={16} className="text-yellow-400" />;
      case 'Trim':      return <Scissors size={16} className="text-red-400" />;
      default:          return <FileCode size={16} className="text-purple-400" />;
    }
  };

  // Helper: Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className={`
        relative flex flex-col  noScroll bg-[#0f172a] border-r border-white/5 h-full
        transition-all duration-300 ease-in-out shrink-0 z-10
        ${isOpen ? "w-72" : "w-16"}
      `}
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-slate-900/50 shrink-0 backdrop-blur-sm">
        {isOpen ? (
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm animate-in fade-in slide-in-from-left-2">
            <Clock size={18} className="text-purple-500" />
            <span>History</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Clock size={20} className="text-slate-500" />
          </div>
        )}
        
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronRight 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
          />
        </button>
      </div>

      {/* CHAT LIST */}
      <div className={`flex-1 noScroll max-h-[95vh] min-h-[95vh] overflow-y-auto custom-scrollbar p-2 space-y-1 ${!isOpen && "min-h-[100vh] max-h-[100vh]"}`}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <button 
              key={chat._id}
              onClick={() => onSelectChat(chat)}
              className={`
                w-full group relative flex items-center gap-3 p-2.5 rounded-lg transition-all border border-transparent
                hover:bg-slate-800 hover:border-white/5 active:scale-[0.98]
                ${!isOpen ? "justify-center px-0" : ""}
              `}
            >
              {/* Icon */}
              <div 
                className={`
                  shrink-0 p-2 rounded-md bg-slate-950 border border-white/5 shadow-sm 
                  group-hover:border-purple-500/30 transition-colors
                  ${!isOpen ? "mx-auto" : ""}
                `}
              >
                {getActionIcon(chat.action)}
              </div>

              {/* TEXT CONTENT */}
              {isOpen && (
                <div className="flex-1 text-left overflow-hidden min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-purple-300 uppercase tracking-wider truncate">
                      {chat.action}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono shrink-0 ml-2">
                      {formatDate(chat.createdAt)}
                    </span>
                  </div>
                  
                  <h4 className="text-sm text-slate-300 font-medium truncate group-hover:text-white transition-colors">
                    {chat.title 
                      ? chat.title 
                      : (chat.code?.slice(0, 30).replace(/\n/g, ' ') || 'Untitled') + '...'}
                  </h4>
                </div>
              )}
              
              {/* TOOLTIP FOR COLLAPSED MODE */}
              {!isOpen && (
                <div 
                  className="absolute left-full ml-3 top-2 px-3 py-2 bg-slate-800 border border-white/10 text-xs text-slate-200 rounded-lg shadow-xl
                    opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50
                    transition-opacity duration-200
                  "
                >
                  <p className="font-bold mb-0.5 text-white">{chat.title || chat.action}</p>
                  <p className="text-[10px] text-slate-500">{formatDate(chat.createdAt)}</p>
                  {/* Arrow Tip */}
                  <div className="absolute top-3 -left-1 w-2 h-2 bg-slate-800 border-l border-b border-white/10 rotate-45"></div>
                </div>
              )}
            </button>
          ))
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2 opacity-50">
            <MoreHorizontal size={24} />
            {isOpen && <p className="text-xs text-center px-4">No history found</p>}
          </div>
        )}
      </div>

      {/* FOOTER */}
      {isOpen && (
        <div className="h-10 border-t border-white/5 bg-slate-950/30 flex items-center justify-center shrink-0">
          <span className="text-[10px] text-slate-600 font-mono">
            {chats.length} {chats.length === 1 ? 'chat' : 'chats'} stored
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatHistorySidebar;