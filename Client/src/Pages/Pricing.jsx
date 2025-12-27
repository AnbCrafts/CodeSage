import React, { useContext, useState, useEffect } from 'react';
import { Check, X, Zap, Crown, HelpCircle } from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { CodeContext } from '../ContextAPI/CodeContext';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  
  // 1. Get real context values (assuming you have isLoading in context, if not local state is fine)
  const { subscribeToPro, isLoading: contextLoading } = useContext(CodeContext);
  const [localLoading, setLocalLoading] = useState(false); // Local state for button feedback
  
  const { secureHash } = useParams();
  const navigate = useNavigate();

  // 2. Real Auth Check
  const isLoggedIn = !!localStorage.getItem("token"); 

  const handleUpgrade = async () => {
    if (!isLoggedIn) {
      // Redirect to login, preserving where they came from
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    setLocalLoading(true);
    
    // 3. Call the real function (No setTimeout needed)
    await subscribeToPro(billingCycle, secureHash);
    
    // Note: If successful, the page redirects to Stripe. 
    // If it fails, we stop loading.
    setLocalLoading(false);
  };

  const features = [
    { name: "Daily Analysis Limits", free: "10 / day", pro: "Unlimited" },
    { name: "Chat History", free: "Last 5 chats", pro: "Unlimited Storage" },
    { name: "Input Character Limit", free: "2,000 chars", pro: "50,000 chars" },
    { name: "File Uploads", free: false, pro: true },
    { name: "Advanced Refactoring", free: false, pro: true },
    { name: "Security Vulnerability Scan", free: false, pro: true },
    { name: "Priority Support", free: false, pro: true },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        
        {/* HEADER & TOGGLE */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Start for free, upgrade when you need the power. No hidden fees.
          </p>

          <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-white/10 relative">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly <span className="text-green-400 text-xs ml-1">-20%</span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          
          {/* FREE PLAN */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col hover:border-white/10 transition-all">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-300">Hobbyist</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-500">/ forever</span>
              </div>
              <p className="text-slate-400 mt-4 text-sm">Perfect for students and quick code checks.</p>
            </div>
            
            <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors mb-8 cursor-default">
              Current Plan
            </button>

            <div className="space-y-4 flex-1">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  {feat.free ? (
                      <Check size={16} className="text-slate-500 shrink-0" />
                  ) : (
                      <X size={16} className="text-slate-700 shrink-0" />
                  )}
                  <span className={feat.free ? "text-slate-300" : "text-slate-600 line-through"}>
                    {typeof feat.free === 'string' ? `${feat.name}: ${feat.free}` : feat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-75 blur group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#0f172a] rounded-3xl p-8 flex flex-col h-full">
              
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">
                MOST POPULAR
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Crown size={20} className="text-yellow-400" /> Pro Developer
                </h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold text-white">
                    {/* Updated prices to match Backend (999 cents = 9.99) */}
                    {billingCycle === 'monthly' ? '$9.99' : '$99.99'}
                  </span>
                  <span className="text-slate-500">
                    {billingCycle === 'monthly' ? '/ month' : '/ year'}
                  </span>
                </div>
                <p className="text-purple-200/60 mt-4 text-sm">For serious developers who need power.</p>
              </div>

              <button 
                onClick={handleUpgrade}
                disabled={localLoading || contextLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity mb-8 flex justify-center items-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(localLoading || contextLoading) ? "Processing..." : "Upgrade Now"} <Zap size={18} fill="currentColor" />
              </button>

              <div className="space-y-4 flex-1">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {feat.pro ? (
                        <Check size={16} className="text-green-400 shrink-0" />
                    ) : (
                        <X size={16} className="text-slate-700 shrink-0" />
                    )}
                    <span className={feat.pro ? "text-white font-medium" : "text-slate-600"}>
                        {typeof feat.pro === 'string' ? `${feat.name}: ${feat.pro}` : feat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto border-t border-white/5 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You will retain access until the end of your billing period." },
              { q: "How is the code stored?", a: "We store your code snippets securely in encrypted databases. We do not use your code to train our public AI models." },
              { q: "Do you offer student discounts?", a: "Yes! If you have a .edu email, contact support for 50% off." }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle size={16} className="text-purple-500"/> {faq.q}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;