import React, { useState } from 'react';
import { User, Lock, Bell, Monitor, Save } from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account", label: "Account Security", icon: <Lock size={18} /> },
    { id: "preferences", label: "Preferences", icon: <Monitor size={18} /> },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <div className="w-full md:w-64 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT PANEL */}
          <div className="flex-1 bg-slate-900 border border-white/5 rounded-2xl p-8">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-bold text-white mb-6">Public Profile</h2>
                
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 cursor-pointer hover:border-purple-500 hover:text-purple-400 transition-colors">
                    <User size={32} />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white text-slate-950 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">
                      Upload New
                    </button>
                    <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max 1MB.</p>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                    <input type="text" defaultValue="Anubhaw" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Bio</label>
                    <textarea rows="3" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Tell us about yourself"></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === "account" && (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-xl font-bold text-white mb-6">Account Security</h2>
                 <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                    <input type="email" defaultValue="user@example.com" disabled className="w-full bg-slate-950/50 border border-white/5 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" />
                  </div>
                  <hr className="border-white/5 my-6"/>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                    <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                    <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                 </div>
               </div>
            )}

            {/* SAVE BUTTON (Common) */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-900/20">
                <Save size={18} /> Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;