import React, { useContext, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import FreeUserWorkSpace from './FreeUserWorkspace';
import ProUserWorkspace from './ProUserWorkspace';
import { CodeContext } from '../ContextAPI/CodeContext';

const Analyze = () => {
  const { userInfo, isLoading, getInfo } = useContext(CodeContext);

  // useEffect(() => {
  //   if (!userInfo) {
  //     getInfo();
  //   }
  // }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-purple-500" size={40} />
        <p className="animate-pulse font-mono text-sm">Loading Workspace...</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-red-400 gap-2">
        <p>Session expired or user not found.</p>
        <a href="/login" className="text-purple-400 hover:underline text-sm">Return to Login</a>
      </div>
    );
  }

  return userInfo?.isPro
    ? <ProUserWorkspace />
    : <FreeUserWorkSpace />;
};

export default Analyze;
