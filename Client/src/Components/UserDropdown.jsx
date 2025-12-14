import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, User, LogOut } from 'lucide-react';


const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {secureHash}= useParams();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 border border-transparent
          ${isOpen ? "bg-white/10 border-white/5" : "hover:bg-white/5"}
        `}
      >
        {/* Avatar Circle (Optional aesthetic touch) */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {user?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* Username & Arrow */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-200 hidden sm:block">
            {user|| "Guest"}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
          />
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header (Mobile Only - shows name if hidden in trigger) */}
          <div className="sm:hidden px-4 py-3 border-b border-white/5">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>

          <div className="p-1">
            {/* Profile Link */}
            <Link 
              to={`/code-sage/${secureHash}/${user}`} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <User size={16} className="text-purple-400" />
              Profile
            </Link>

            {/* Logout Button */}
            <button 
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;