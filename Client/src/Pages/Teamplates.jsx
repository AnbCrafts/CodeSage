import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Sparkles, Zap, BookOpen, ArrowRight, 
  Binary, Briefcase, FolderGit2, Code2
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Templates = () => {
  const navigate = useNavigate();
  const { secureHash } = useParams();

  const handleUseTemplate = (template) => {
    // Navigate to Analyze page with data
    navigate(`/code-sage/${secureHash}/analyze`, { 
      state: { 
        templatePrompt: template.prompt,
        activeTab: template.mode // 'explain', 'suggest', 'summary', etc.
      } 
    });
  };

  const categories = [
    {
      title: "DSA & Algorithms",
      description: "Master complex logic and understand efficiency.",
      icon: <Binary className="text-blue-400" size={24} />,
      items: [
        { 
          title: "Step-by-Step Walkthrough", 
          desc: "Break down the algorithm logic into simple steps.", 
          mode: "explain",
          prompt: "// Paste your algorithm here...\n\n// Request: Explain this algorithm step-by-step, focusing on the logic flow." 
        },
        { 
          title: "Dry Run with Input", 
          desc: "Simulate the code execution with example data.", 
          mode: "explain",
          prompt: "// Paste your code here...\n\n// Request: Perform a dry run of this code using the input: [Insert Input Here]. Show the state of variables at each step." 
        },
        { 
          title: "Time & Space Complexity", 
          desc: "Analyze Big-O notation for performance.", 
          mode: "explain",
          prompt: "// Paste your solution here...\n\n// Request: Analyze the Time and Space complexity of this solution and explain why." 
        },
      ]
    },
    {
      title: "Project Development",
      description: "Clean up code and document it for the future.",
      icon: <FolderGit2 className="text-purple-400" size={24} />,
      items: [
        { 
          title: "Explain for 'Future Me'", 
          desc: "Generate clear documentation for this function.", 
          mode: "summary",
          prompt: "// Paste your function here...\n\n// Request: Write a high-level summary and documentation for this function so I can understand it 6 months from now." 
        },
        { 
          title: "Refactor for Readability", 
          desc: "Make variables descriptive and logic cleaner.", 
          mode: "suggest",
          prompt: "// Paste your code here...\n\n// Request: Refactor this code to improve readability, variable naming, and maintainability." 
        },
        { 
          title: "Find Edge Cases", 
          desc: "Identify potential bugs and crashing scenarios.", 
          mode: "suggest",
          prompt: "// Paste your logic here...\n\n// Request: Analyze this code for edge cases, potential bugs, and error handling gaps." 
        },
      ]
    },
    {
      title: "Interview Prep",
      description: "Practice answering like a top engineer.",
      icon: <Briefcase className="text-green-400" size={24} />,
      items: [
        { 
          title: "Explain Like an Interview", 
          desc: "Articulate your thought process professionally.", 
          mode: "explain",
          prompt: "// Paste your solution here...\n\n// Request: Explain this code as if I am presenting it in a FAANG technical interview." 
        },
        { 
          title: "Optimize & Justify", 
          desc: "Improve the solution and explain the trade-offs.", 
          mode: "suggest",
          prompt: "// Paste your brute-force solution here...\n\n// Request: Suggest a more optimized approach (Time/Space) and justify the trade-offs." 
        },
      ]
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-xl mb-6 ring-1 ring-purple-500/20">
            <Sparkles size={24} className="text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Blueprint</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Blank page anxiety? We've got you covered. Choose a template below to pre-configure the AI for your specific goal.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-16">
          {categories.map((category, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-white/10 shadow-lg shadow-black/50">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-slate-500 text-sm">{category.description}</p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    onClick={() => handleUseTemplate(item)}
                    className="group relative bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-left hover:bg-slate-900 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10"
                  >
                    <div className="mb-4 flex justify-between items-start">
                      <Code2 size={24} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                      <div className="bg-white/5 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                      {item.desc}
                    </p>
                    
                    {/* Badge */}
                    <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                         item.mode === 'explain' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                         item.mode === 'suggest' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                         'bg-purple-500/10 text-purple-400 border-purple-500/20'
                       }`}>
                         {item.mode} Mode
                       </span>
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