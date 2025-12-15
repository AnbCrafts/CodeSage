import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Plus, Clock, Zap, Crown, ArrowRight, Activity, FileCode 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext';

const Dashboard = () => {
  const { userChats, getUserChats,getInfo,userInfo } = useContext(CodeContext);
  const {secureHash} = useParams();
  // Mock User Data (Replace with real context later)
  const user = JSON.parse(localStorage.getItem("userInfo")) || { username: "Developer", isPro: false };
  
  // Mock Usage Stats (Replace with real API data)
  const usage = { used: 4, total: 10 }; 
  const usagePercentage = (usage.used / usage.total) * 100;

  useEffect(() => {
    getUserChats();
    getInfo();
  }, []);



  useEffect(()=>{
    console.log("UserInfo", userInfo);
  },[userInfo])


  const username = localStorage.getItem("username")

  return (
    <div className="bg-slate-950 w-full min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        
        {/* 1. WELCOME HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{username}</span>
            </h1>
            <p className="text-slate-400">Ready to optimize some code today?</p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 border border-white/5 px-4 py-2 rounded-full">
            {user.isPro ? (
              <Crown size={20} className="text-yellow-400" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-slate-500" />
            )}
            <span className="text-sm font-medium text-slate-300">
              {user.isPro ? "Pro Plan Active" : "Free Plan"}
            </span>
          </div>
        </div>

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* CARD A: NEW ANALYSIS (The Main Action) */}
          <Link to={`/code-sage/${secureHash}/analyze`} className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden shadow-2xl shadow-purple-900/20 hover:scale-[1.02] transition-transform duration-300">
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Plus size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">New Analysis</h2>
              <p className="text-purple-100 mb-6">Paste code, get insights, fix bugs.</p>
              <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                Start Coding <ArrowRight size={18} />
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
              <FileCode size={200} />
            </div>
          </Link>

          {/* CARD B: USAGE STATS */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Activity size={24} className="text-green-400" />
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Daily Limit</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{usage.used} <span className="text-lg text-slate-500 font-normal">/ {usage.total}</span></h2>
              <p className="text-slate-400 text-sm">Analyses used today</p>
            </div>
            
            <div className="mt-6">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              {!user.isPro && (
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  <Zap size={12} className="text-yellow-500" /> 
                  <Link to={`/code-sage/${secureHash}/pricing`} className="hover:text-purple-400 hover:underline">Upgrade for unlimited access</Link>
                </p>
              )}
            </div>
          </div>

          {/* CARD C: QUICK HISTORY */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-white/5 flex flex-col hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-blue-400" />
              </div>
              <h3 className="font-bold text-white">Recent Activity</h3>
            </div>

            <div className="flex-1 space-y-3">
              {userChats && userChats.length > 0 ? (
                userChats.slice(0, 3).map((chat) => (
                  <Link 
                    to={`/code-sage/${secureHash}/analyze`} 
                    key={chat._id}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-blue-400 uppercase">{chat.action}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 truncate font-mono">
                      {chat.code.slice(0, 20)}...
                    </p>
                  </Link>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 3. PRO BANNER (Only for Free Users) */}
        {!user.isPro && (
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                 <Crown size={24} className="text-yellow-400" /> Go Pro
               </h3>
               <p className="text-slate-400 max-w-lg">
                 Unlock unlimited analyses, file uploads, and advanced refactoring tools. 
                 Code without limits starting at just $9/mo.
               </p>
             </div>
             <Link 
               to={`/code-sage/${secureHash}/pricing`}
               className="relative z-10 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
             >
               View Plans
             </Link>

             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;