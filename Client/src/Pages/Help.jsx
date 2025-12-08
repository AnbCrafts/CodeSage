import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  AlertTriangle, 
  Cpu, 
  MessageCircle, 
  FileCode, 
  ChevronDown, 
  ChevronUp,
  Zap,
  LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeHeader from '../Components/HomeHeader';

const Help = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const troubleshootingItems = [
    {
      question: "AI Not Analyzing Code",
      answer: "Ensure your code file is in a supported format (.js, .py, .java, .cpp, .html). If you are pasting code, make sure it exceeds 10 characters but stays within the 5000-character limit for the free tier."
    },
    {
      question: "Error in Output / Hallucinations",
      answer: "AI models can sometimes be unpredictable. If the output seems wrong, try adding more context comments to your code or click 'Regenerate' to try a different temperature setting."
    },
    {
      question: "Slow Response Time",
      answer: "During peak hours, free tier requests are queued. Pro users get priority processing. If it takes longer than 30 seconds, check your internet connection or refresh the page."
    },
    {
      question: "File Upload Failed",
      answer: "We currently support files up to 2MB. Ensure your file is plain text (not a binary or compiled executable)."
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      {/* ================= HERO SEARCH SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How can we help you?
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-full px-6 py-4 shadow-xl">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search for articles, errors, or guides..." 
                className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK CATEGORIES ================= */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Book className="text-blue-400" />, title: "Getting Started", desc: "Learn the basics of CodeSage" },
            { icon: <Cpu className="text-purple-400" />, title: "API Reference", desc: "Integrate with your tools" },
            { icon: <FileCode className="text-green-400" />, title: "Supported Langs", desc: "List of all syntaxes" },
          ].map((card, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-xl hover:border-purple-500/30 hover:bg-slate-800 transition-all cursor-pointer group">
              <div className="mb-4 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAIN HELP CONTENT ================= */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          
          {/* LEFT: Troubleshooting Accordion */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">Troubleshooting & FAQs</h2>
            </div>

            <div className="space-y-4">
              {troubleshootingItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-slate-200">{item.question}</span>
                    {activeAccordion === index ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-slate-500" />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Quick Tips Section */}
            <div className="mt-12 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 mt-1">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Pro Tip: Better Prompts</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To get the best optimization results, try adding comments to your code before uploading. 
                    Example: <span className="font-mono text-purple-300 bg-black/30 px-1 rounded">// This function is too slow</span>. 
                    The AI will prioritize fixing that specific issue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Support Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <LifeBuoy className="text-purple-400" />
                <h3 className="text-xl font-bold text-white">Still stuck?</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Our support team is available Monday to Friday, 9am - 5pm EST. We usually respond within 2 hours.
              </p>
              
              <a 
                href="mailto:support@codesage.com"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-colors mb-3"
              >
                <MessageCircle size={18} /> Email Support
              </a>
              <a 
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Open Ticket
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Help;