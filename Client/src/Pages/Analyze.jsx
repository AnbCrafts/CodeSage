import React, { useContext, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import FreeUserWorkSpace from './FreeUserWorkspace';
import ProUserWorkspace from './ProUserWorkspace';
import { CodeContext } from '../ContextAPI/CodeContext';

const Analyze = () => {
  // Use a consistent naming convention. 
  // Earlier you used 'currUserData', now 'userInfo'. 
  // Ensure this matches your CodeContext exports exactly.
  const { userInfo, isLoading, getInfo } = useContext(CodeContext);

  useEffect(() => {
    // Force a fresh fetch from the DB every time the Analyze page is visited
    const syncUser = async () => {
       await getInfo();
    };
    syncUser();
  }, []); 

  // 1. Show loader while getInfo is fetching the LATEST status
  if (isLoading) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-purple-500" size={40} />
        <p className="animate-pulse font-mono text-sm">Syncing your status...</p>
      </div>
    );
  }

  // 2. Handle missing user info
  if (!userInfo) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-6">
        <AlertCircle className="text-red-500" size={48} />
        <div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-slate-400 text-sm mt-1">We couldn't verify your session.</p>
        </div>
        <a href="/login" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
          Log In Again
        </a>
      </div>
    );
  }

  // 3. Dynamic Switching
  // Log this to your console to debug: console.log("Current User Pro Status:", userInfo.isPro)
  return (
    <div className="w-full h-full">
      {userInfo.isPro ? (
        <ProUserWorkspace key="pro-view" />
      ) : (
        <FreeUserWorkSpace key="free-view" />
      )}
    </div>
  );
};

export default Analyze;