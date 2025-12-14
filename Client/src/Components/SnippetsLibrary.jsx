import React, { useState } from 'react';
import { Search, Copy, Trash2, Edit2, Code, Terminal, Hash } from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const SnippetLibrary = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Mock Data
  const snippets = [
    { id: 1, title: "Auth Middleware", lang: "javascript", code: "const auth = (req, res, next) => { ... }", date: "2 days ago" },
    { id: 2, title: "Python Data Sort", lang: "python", code: "def sort_data(arr):\n  return sorted(arr)", date: "5 days ago" },
    { id: 3, title: "React Button Component", lang: "jsx", code: "const Button = ({ children }) => <button>{children}</button>", date: "1 week ago" },
    { id: 4, title: "Docker Compose Config", lang: "yaml", code: "version: '3.8'\nservices:\n  web: ...", date: "2 weeks ago" },
  ];

  // Filter Logic
  const filteredSnippets = snippets.filter(s => 
    (filter === "All" || s.lang === filter.toLowerCase()) &&
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const getLangColor = (lang) => {
    if (lang === 'javascript' || lang === 'jsx') return 'text-yellow-400 bg-yellow-400/10';
    if (lang === 'python') return 'text-blue-400 bg-blue-400/10';
    return 'text-purple-400 bg-purple-400/10';
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-10 px-6">
        
        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Snippets</h1>
            <p className="text-slate-400">Manage your saved code blocks.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search snippets..." 
                className="bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 w-full sm:w-64 transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10">
              {["All", "Javascript", "Python"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    filter === item ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="group bg-slate-900 border border-white/5 rounded-xl p-5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex flex-col h-48">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${getLangColor(snippet.lang)}`}>
                    <Code size={16} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${getLangColor(snippet.lang).split(' ')[0]}`}>
                    {snippet.lang}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Copy"><Copy size={14}/></button>
                  <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white" title="Edit"><Edit2 size={14}/></button>
                  <button className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400" title="Delete"><Trash2 size={14}/></button>
                </div>
              </div>

              {/* Title & Preview */}
              <h3 className="font-semibold text-white mb-2 truncate">{snippet.title}</h3>
              <div className="flex-1 bg-slate-950 rounded-lg p-3 overflow-hidden relative">
                <code className="text-xs text-slate-400 font-mono whitespace-pre-wrap">
                  {snippet.code}
                </code>
                {/* Fade out effect at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent" />
              </div>

              {/* Footer */}
              <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
                <span>{snippet.date}</span>
                <span className="group-hover:text-purple-400 transition-colors cursor-pointer">Open in Editor →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SnippetLibrary;