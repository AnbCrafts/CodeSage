import React from 'react';
import HomeHeader from '../Components/HomeHeader';
import { assets } from '../assets/assets';

const Services = () => {
  return (
 
    <div>
        <HomeHeader/>
        
        <section className="text-white py-5 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Our Services
        </h2>
        <p className="text-lg text-gray-300 mb-16">Explore the powerful features we offer to make your coding experience smarter and easier with AI-powered tools.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">💻</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Code Review & Debugging</h3>
            <p className="text-gray-300">Get automated code reviews and debugging suggestions to improve your code quality and fix issues instantly with AI-driven insights.</p>
          </div>

          {/* Service 2 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Code Explanation</h3>
            <p className="text-gray-300">Understand your code better with detailed explanations that break down complex logic into easy-to-understand steps, in simple English.</p>
          </div>

          {/* Service 3 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">⚡</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Code Optimization</h3>
            <p className="text-gray-300">Let AI suggest optimizations for your code, making it more efficient, cleaner, and faster while maintaining its readability and functionality.</p>
          </div>

          {/* Service 4 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">📑</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Custom Code Summarization</h3>
            <p className="text-gray-300">Upload your code and let our platform summarize it for you with a concise overview, making it easier to understand and share.</p>
          </div>

          {/* Service 5 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">🌐</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Multi-Language Support</h3>
            <p className="text-gray-300">Work with code in multiple programming languages — from Python to JavaScript, and everything in between — with our AI-powered platform.</p>
          </div>

          {/* Service 6 */}
          <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all hover:border hover:border-[red]">
            <div className="text-5xl mb-4 text-indigo-400">🤖</div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Insights</h3>
            <p className="text-gray-300">Receive personalized, AI-driven insights that help you enhance your coding skills, follow best practices, and stay up-to-date with coding standards.</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Services;
