import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Plus, Clock, Zap, Crown, ArrowRight, Play, Layout, TrendingUp 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';

const Dashboard = () => {
  const { userChats, getUserChats, getInfo, userInfo } = useContext(CodeContext);
  const { secureHash } = useParams();

  // 1. Load Data on Mount
  useEffect(() => {
    getUserChats();
    getInfo();
  }, []);

  // 2. Data Fallbacks (Safe access to Context or LocalStorage)
  const user = userInfo || JSON.parse(localStorage.getItem("userInfo")) || { username: "Developer", isPro: false };
  const username = user.username || localStorage.getItem("username") || "Developer";
  
  // 3. Derived Data
  const lastChat = userChats && userChats.length > 0 ? userChats[0] : null;
  const totalAnalyses = userChats ? userChats.length : 0;
  
  // Calculate most used action (Simple logic)
  const actionCounts = userChats?.reduce((acc, chat) => {
    acc[chat.action] = (acc[chat.action] || 0) + 1;
    return acc;
  }, {}) || {};
  const mostUsedAction = Object.keys(actionCounts).sort((a,b) => actionCounts[b] - actionCounts[a])[0] || "None";


  
  useEffect(()=>{
    console.log("Info", userInfo);
  },[userInfo])

  

  return (
    <div className="bg-slate-950 py-5 w-full min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6 border-b border-gray-700 bg-white/5 rounded-2xl ">
        
        {/* ================= SECTION 1: WELCOME & CONTEXT ================= */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            
            {/* Welcome Text */}
           <div>
  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
    Welcome back,{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
      {userInfo?.username || localStorage.getItem("username")}
    </span>

    {/* PRO BADGE LOGIC */}
    {userInfo?.isPro && (
      <div 
        className="inline-flex items-center justify-center ml-3 align-middle bg-yellow-500/10 border border-yellow-500/30 p-1.5 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        title="Pro User"
      >
        <Crown 
          size={24} 
          className="text-yellow-400 fill-yellow-400/20" 
          strokeWidth={2.5}
        />
      </div>
    )}
  </h1>
  
  <p className="text-slate-400 text-lg">
    Ready to continue where you left off?
  </p>
</div>

            {/* Context Widget: Resume Last Chat */}
            {lastChat && (
              <div className="w-full md:w-auto">
                <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-purple-500/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Resume Last Session</p>
                    <p className="text-white font-medium truncate max-w-[200px]">{lastChat.title || "Untitled Analysis"}</p>
                  </div>
                  <Link 
                    to={`/code-sage/${secureHash}/analyze`} // You might want to pass state/ID here to load specific chat
                    className="ml-4 px-3 py-1.5 bg-purple-600/10 text-purple-400 text-sm font-bold rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-all"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= SECTION 2: LEARNING SNAPSHOT ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {/* Stat 1 */}
          <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <TrendingUp size={16} /> <span className="text-xs font-bold uppercase">Total Analyses</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalAnalyses}</p>
            <p className="text-xs text-slate-500 mt-1">Snippets processed</p>
          </div>

          {/* Stat 2 */}
          <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Zap size={16} /> <span className="text-xs font-bold uppercase">Favorite Tool</span>
            </div>
            <p className="text-2xl font-bold text-white capitalize">{mostUsedAction}</p>
            <p className="text-xs text-slate-500 mt-1">Most frequent action</p>
          </div>

          {/* Stat 3 (Usage Limit - Visual Text) */}
          <div className="col-span-2 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Daily Allowance</span>
                <span className="text-white font-mono text-sm">{user.usage?.count || 0} / 50</span>
             </div>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                  style={{ width: `${Math.min(((user.usage?.count || 0) / 50) * 100, 100)}%` }} 
                />
             </div>
             <p className="text-xs text-slate-500 mt-2">
               {(userInfo && userInfo?.isPro) ? "Unlimited Access Active" : "Resets at midnight"}
             </p>
          </div>
        </div>

        {/* ================= SECTION 3: QUICK ACTIONS ================= */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
           <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Layout size={18} className="text-slate-500" /> Workspace
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. START NEW (Primary) */}
              <Link 
                to={`/code-sage/${secureHash}/analyze`}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl shadow-purple-900/20 hover:scale-[1.02] transition-all"
              >
                <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm text-white">
                  <Plus size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">New Analysis</h3>
                <p className="text-purple-100 text-sm mb-4">Start fresh with a new snippet.</p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-bold group-hover:gap-3 transition-all">
                  Open Editor <ArrowRight size={16} />
                </span>
              </Link>

              {/* 2. HISTORY (Secondary) */}
              {lastChat ? (
                 <Link 
                    to={`/code-sage/${secureHash}/analyze`} // Ideally route to a history list, but analyze works for now
                    className="group p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 hover:bg-slate-900/80 transition-all"
                 >
                    <div className="bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:text-white transition-colors">
                      <Clock size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Continue Work</h3>
                    <p className="text-slate-400 text-sm mb-4">Jump back into your recent sessions.</p>
                    <span className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors">
                       View History
                    </span>
                 </Link>
              ) : (
                // Alternate if no history
                <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 opacity-50 cursor-not-allowed">
                    <div className="bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-slate-500">
                      <Clock size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-500 mb-1">History Empty</h3>
                    <p className="text-slate-600 text-sm">Your analyzed snippets will appear here.</p>
                </div>
              )}

              {/* 3. TEMPLATES (Tertiary) */}
              <button 
                className="group p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 hover:bg-slate-900/80 transition-all text-left"
                onClick={() => alert("Template Library coming soon!")}
              >
                <div className="bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-green-400 group-hover:text-white transition-colors">
                  <Layout size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Templates</h3>
                <p className="text-slate-400 text-sm mb-4">Use pre-built prompts for React, Node, etc.</p>
                <span className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors">
                   Browse Library
                </span>
              </button>

           </div>
        </div>

        {/* ================= SECTION 4: PREMIUM TEASER ================= */}
        {(userInfo && !userInfo?.isPro) && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
             <div className="rounded-xl border border-dashed border-white/10 bg-slate-900/30 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <Crown size={18} className="text-yellow-500" />
                   </div>
                   <p className="text-sm text-slate-400">
                      <span className="text-slate-200 font-bold">Pro Tip:</span> Upgrade to unlock unlimited history and deeper AI explanations.
                   </p>
                </div>
                <Link 
                   to={`/code-sage/${secureHash}/pricing`}
                   className="text-sm font-bold text-yellow-500 hover:text-yellow-400 whitespace-nowrap"
                >
                   See Plans
                </Link>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;