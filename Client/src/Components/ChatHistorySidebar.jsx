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

  // Helper: Format Date (e.g., "2 hours ago" or "Dec 14")
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
      className={`flex flex-col bg-slate-900 border border-white/5 rounded-xl noScroll transition-all duration-300 ease-in-out relative 
        ${isOpen ? "w-72" : "w-16"}
        h-[calc(100vh-6rem)]
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between h-16 shrink-0">
        {isOpen ? (
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm animate-in fade-in">
            <Clock size={18} className="text-purple-500" />
            <span>Recent Chats</span>
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
        >
          <ChevronRight 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
          />
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 noScroll overflow-y-auto custom-scrollbar p-2 space-y-2">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <button 
              key={chat._id}
              onClick={() => onSelectChat(chat)}
              className={`w-full group relative flex items-start gap-3 p-3 rounded-xl transition-all border border-transparent
                hover:bg-slate-800 hover:border-white/5 active:scale-[0.98]
                ${!isOpen ? "justify-center px-0" : ""}
              `}
            >
              {/* Icon */}
              <div 
                className={`mt-0.5 p-2 rounded-lg bg-slate-950 border border-white/5 shadow-sm 
                  group-hover:border-purple-500/30 transition-colors
                  ${!isOpen ? "mx-auto" : ""}
                `}
              >
                {getActionIcon(chat.action)}
              </div>

              {/* TEXT CONTENT */}
              {isOpen && (
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-purple-300 uppercase tracking-wider">
                      {chat.action}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {formatDate(chat.createdAt)}
                    </span>
                  </div>
                  
                  {/* TITLE FIXED HERE */}
                  <h4 className="text-sm text-slate-400 font-medium truncate group-hover:text-slate-200 transition-colors">
                    {chat.title 
                      ? chat.title 
                      : chat.code?.slice(0, 30).replace(/\n/g, ' ') + '...'}
                  </h4>
                </div>
              )}
              
              {/* TOOLTIP FOR COLLAPSED MODE */}
              {!isOpen && (
                <div 
                  className="absolute left-full ml-2 top-2 px-2 py-1 bg-slate-800 text-xs text-white rounded 
                    opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50
                    max-w-[220px] truncate
                  "
                >
                  {chat.title || chat.action} • {formatDate(chat.createdAt)}
                </div>
              )}
            </button>
          ))
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
            <MoreHorizontal size={24} opacity={0.5} />
            {isOpen && <p className="text-xs">No history yet</p>}
          </div>
        )}
      </div>

      {/* FOOTER */}
      {isOpen && (
        <div className="p-3 border-t border-white/5 bg-slate-950/30 rounded-b-xl shrink-0">
          <div className="text-xs text-center text-slate-600">
            {chats.length} conversations stored
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistorySidebar;
