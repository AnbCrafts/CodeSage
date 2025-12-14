import React from 'react';
import { Sparkles, Bug, Zap, BookOpen, ArrowRight } from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Templates = () => {
  const categories = [
    {
      title: "Optimization",
      icon: <Zap className="text-yellow-400" size={20} />,
      items: [
        { title: "Reduce Time Complexity", desc: "Identify loops and logic that slow down execution.", prompt: "Analyze this code for time complexity and suggest optimizations." },
        { title: "Memory Leak Check", desc: "Find variables and closures that consume excess memory.", prompt: "Check for potential memory leaks in this function." },
      ]
    },
    {
      title: "Debugging & Cleanup",
      icon: <Bug className="text-red-400" size={20} />,
      items: [
        { title: "Find Logic Errors", desc: "Spot off-by-one errors and edge cases.", prompt: "Debug this code and find logical errors." },
        { title: "Clean Code Refactor", desc: "Apply DRY principles and improve readability.", prompt: "Refactor this code to follow Clean Code principles." },
      ]
    },
    {
      title: "Learning",
      icon: <BookOpen className="text-blue-400" size={20} />,
      items: [
        { title: "Explain Line-by-Line", desc: "Great for understanding complex regex or algorithms.", prompt: "Explain this code line by line for a beginner." },
        { title: "Convert to Python", desc: "Translate logic from JS/Java to Python.", prompt: "Convert this code to Python and explain the differences." },
      ]
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Analysis Templates
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Don't know what to ask? Choose a template to get instant, specialized results for your code.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-900 rounded-lg border border-white/10">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    className="group bg-slate-900 border border-white/5 rounded-2xl p-6 text-left hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    <div className="mb-4">
                      <Sparkles size={24} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-white transition-colors">
                      Use Template <ArrowRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Templates;