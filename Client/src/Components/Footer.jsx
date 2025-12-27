import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { 
  Github, Twitter, Linkedin, MessageCircle, Heart 
} from 'lucide-react';
import { assets } from '../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { secureHash } = useParams();
  const location = useLocation();
  
  // Check auth state
  const isLoggedIn = localStorage.getItem("token") || localStorage.getItem("userId");

  // Logic: Show full footer ONLY if NOT logged in AND NOT in a workspace (secureHash)
  const showFullFooter = !secureHash && !isLoggedIn;

  const socialLinks = [
    { icon: <Twitter size={18} />, href: "https://github.com/AnbCrafts" },
    { icon: <Github size={18} />, href: "https://github.com/AnbCrafts" },
    { icon: <Linkedin size={18} />, href: "#" },
    { icon: <MessageCircle size={18} />, href: "#" },
  ];

  const footerLinks = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Live Demo", href: "/#demo" },
      { name: "Changelog", href: "/changelog" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Community", href: "/community" },
      { name: "Blog", href: "/blog" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ]
  };

  return (
    <footer 
      className={`bg-slate-950 font-sans transition-all duration-300 border-t border-white/5 ${
        showFullFooter ? "pt-20 pb-10" : "py-6"
      }`}
    >
      
      {/* ================= MODE 1: FULL LANDING FOOTER ================= */}
      {showFullFooter ? (
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            
            {/* BRAND COLUMN */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={assets.logo} 
                        alt="CodeSage" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" 
                      />
                  </div>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  Code<span className="text-purple-500">Sage</span>
                </span>
              </Link>
              
              <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
                The AI-powered coding companion that turns complex logic into plain English. 
                Built for developers, students, and educators.
              </p>
  
              {/* Socials for Landing Mode */}
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS COLUMNS */}
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1 group">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 hover:text-purple-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-slate-400 hover:text-purple-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* BOTTOM BAR (Landing Version) */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="flex items-center gap-1 text-slate-500">
              © {currentYear} CodeSage. Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Anubhaw.
            </p>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-slate-400">All systems operational</span>
               </div>
            </div>
          </div>

        </div>
      ) : (
        
      /* ================= MODE 2: COMPACT FOOTER (App/Workspace) ================= */
      /* Shows Copyright + Socials in one row */
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-bold text-slate-300">CodeSage</span>
                <span>© {currentYear}</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:flex items-center gap-1">
                    Made with <Heart size={12} className="text-red-500 fill-red-500" /> by Anubhaw
                </span>
            </div>

            {/* Right: Social Icons (Compact) */}
            <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover:bg-white/5 text-slate-500 hover:text-purple-400 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
            </div>

        </div>
      )}

    </footer>
  );
};

export default Footer;