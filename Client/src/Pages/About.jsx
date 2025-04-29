import React from 'react';
import HomeHeader from '../Components/HomeHeader';

const About = () => {
  return (
   <div>
    <HomeHeader/>
     <section className=" text-white py-5 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          About CodeSage
        </h2>
        <p className="text-lg text-gray-300 mb-12 py-5 border border-[blue] rounded-2xl">CodeSage is an AI-powered platform designed to help developers understand, optimize, and improve their code. Whether you're a beginner or a professional, our platform offers insights that elevate your coding experience.</p>
        
        {/* Mission Statement */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto py-5 rounded-2xl border border-[red]">Our goal is to create an intelligent, accessible, and easy-to-use AI assistant that helps developers write better code, understand complex algorithms, and debug issues efficiently. We believe in making programming a smooth, efficient, and enjoyable experience for everyone.</p>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all">
              <div className="text-6xl text-indigo-400 mb-4">👨‍💻</div>
              <h4 className="text-xl font-semibold text-white mb-2">John Doe</h4>
              <p className="text-gray-300 text-sm">Founder & CEO - With a passion for coding and AI, John aims to transform the developer experience through innovation.</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all">
              <div className="text-6xl text-indigo-400 mb-4">👩‍💻</div>
              <h4 className="text-xl font-semibold text-white mb-2">Jane Smith</h4>
              <p className="text-gray-300 text-sm">Lead Developer - Jane is a full-stack developer with a keen interest in AI and machine learning, bringing cutting-edge technology to life.</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg hover:scale-105 transition-all">
              <div className="text-6xl text-indigo-400 mb-4">💼</div>
              <h4 className="text-xl font-semibold text-white mb-2">Samuel Lee</h4>
              <p className="text-gray-300 text-sm">Product Manager - Samuel oversees the development process, ensuring that CodeSage meets the needs of developers worldwide.</p>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Our Values</h3>
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 shadow-2xs shadow-[#ff000067] my-5  py-5 px-10">
              <div className="text-indigo-400 text-4xl">💡</div>
              <div className="text-lg text-gray-300">
                <h4 className="font-semibold">Innovation</h4>
                <p>We constantly strive to push the boundaries of AI to deliver groundbreaking features for developers.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border border-[indigo] my-5  py-5 px-10">
              <div className="text-indigo-400 text-4xl">🔐</div>
              <div className="text-lg text-gray-300">
                <h4 className="font-semibold">Security</h4>
                <p>We prioritize the security and privacy of our users' code and personal data at every stage.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 shadow-2xs shadow-[#ff000067] my-5  py-5 px-10">
              <div className="text-indigo-400 text-4xl">📈</div>
              <div className="text-lg text-gray-300">
                <h4 className="font-semibold">Growth</h4>
                <p>We empower developers to learn, improve, and grow their skills through our AI-powered insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   </div>
  );
};

export default About;
