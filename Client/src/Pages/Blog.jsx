import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Code, User, ArrowRight, Calendar, Clock, 
  Tag, Terminal, PenTool 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const Blog = () => {

  // Mock Data - In a real app, this would fetch from a CMS (Sanity, Strapi, etc.)
  const posts = [
    {
      id: 1,
      title: "Why CodeSage Exists: The Learning-First Approach",
      excerpt: "Most AI tools just give you the answer. Here is why we decided to build a tool that focuses on the 'Why' behind the code, and how we designed the UX to prevent reliance.",
      category: "Product",
      date: "Dec 12, 2024",
      readTime: "5 min read",
      featured: true,
      color: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      title: "How AI Explains Code: Prompt Engineering Secrets",
      excerpt: "A deep dive into how we structure prompts to force LLMs to act like a senior engineer rather than a code generator.",
      category: "Technical",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      featured: false,
      icon: <Terminal size={20} />
    },
    {
      id: 3,
      title: "My Struggle with DSA (And How Tools Can Help)",
      excerpt: "I used to hate LeetCode. This is a personal story of how breaking down logic into plain English changed my perspective on algorithms.",
      category: "Personal",
      date: "Nov 28, 2024",
      readTime: "4 min read",
      featured: false,
      icon: <User size={20} />
    },
    {
      id: 4,
      title: "UX Mistakes: Why We Removed the 'Fix It' Button",
      excerpt: "We found that users learned less when the AI auto-fixed bugs. Here is why we pivoted to 'Suggestion Mode' instead.",
      category: "Design",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      featured: false,
      icon: <PenTool size={20} />
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">

        {/* ================= HERO ================= */}
        <div className="text-center mb-16 border-b border-white/5 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={14} /> Engineering Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Thinking in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Code.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A collection of technical deep dives, product philosophy, and the honest journey of building CodeSage.
          </p>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FEATURED POST (Spans 2 cols on Large screens) */}
          <div className="lg:col-span-2">
            {posts.filter(p => p.featured).map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="group relative block h-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Abstract Background Art */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="absolute top-0 right-0 p-32 bg-purple-500/20 blur-[100px] rounded-full" />

                <div className="relative p-8 md:p-12 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* SIDE LIST (Recent Posts) */}
          <div className="space-y-6">
             {posts.filter(p => !p.featured).map((post, idx) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group block p-6 bg-slate-900/50 border border-white/5 rounded-2xl hover:bg-slate-900 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                     <div className="p-3 bg-slate-950 rounded-lg border border-white/10 text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
                        {post.icon}
                     </div>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       {post.category}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                     <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                     </span>
                     <span className="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-1">
                        Read <ArrowRight size={12} />
                     </span>
                  </div>
                </Link>
             ))}
             
             {/* Newsletter / Subscribe Box */}
             <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 rounded-2xl">
                <h4 className="font-bold text-white mb-2">Subscribe to updates</h4>
                <p className="text-xs text-slate-400 mb-4">Get the latest technical deep dives sent to your inbox.</p>
                <div className="flex gap-2">
                   <input type="email" placeholder="Email address" className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-purple-500" />
                   <button className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-purple-500 transition-colors">
                      Join
                   </button>
                </div>
             </div>
          </div>

        </div>

        {/* ================= CATEGORIES TAGS ================= */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-4 justify-center">
           {["React", "Node.js", "System Design", "Career", "Algorithms", "Open Source"].map((tag, i) => (
             <button key={i} className="px-4 py-2 bg-slate-900 rounded-full border border-white/5 text-slate-400 text-sm hover:text-white hover:border-purple-500/30 transition-all flex items-center gap-2">
                <Tag size={14} /> {tag}
             </button>
           ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;