import React from 'react'
import Logo from './Logo'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className=" text-white px-6 py-12 mt-20 rounded-t-2xl shadow-inner">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Logo & Tagline */}
    <div>
      <img src={assets.logo} className='h-[70px] w-[70px] rounded-full border border-[violet] shadow-[#ee82ee72] shadow-2xl' alt="" />
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CodeSage</h2>
      <p className="mt-3 text-md text-gray-300">Your AI coding companion — simplifying code, boosting productivity.</p>
    </div>

    {/* Navigation */}
    <div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-200">
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Home</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Features</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Languages</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Upload</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Resources</h3>
      <ul className="space-y-2 text-sm text-gray-200">
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Documentation</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">GitHub</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Blog</a></li>
        <li><a href="#" className="hover:text-purple-400 transition text-lg">Help Center</a></li>
      </ul>
    </div>

    {/* Socials */}
    <div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Connect</h3>
      <div className="flex gap-4 mt-3 text-lg text-gray-300">
        <a href="#" className="hover:text-purple-400"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-purple-400"><i className="fab fa-github"></i></a>
        <a href="#" className="hover:text-purple-400"><i className="fab fa-linkedin"></i></a>
        <a href="#" className="hover:text-purple-400"><i className="fab fa-discord"></i></a>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
    © {new Date().getFullYear()} CodeSage. All rights reserved.
  </div>
</footer>

  )
}

export default Footer
