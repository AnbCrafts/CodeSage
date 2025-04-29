import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=''>
        <HomeHeader/>

     <div className='h-auto w-[90%] mx-auto relative  '>
       
<div className="text-center px-4 py-5 w-full h-auto mx-auto hero border  border-[#ee82ee4e] rounded-2xl">
  
  <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-glow">
    Understand Code Instantly with AI
  </h1>
  <p className="mt-2 text-xl md:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
    CodeSage helps you decode complex code into simple English, suggests improvements, and optimizes your code — all powered by intelligent AI, built for developers like you.
  </p>

 
  

</div>

<div className='my-5 border border-[#ff00004c] rounded-2xl h-[80vh] w-full relative'>
  <img src={assets.hero_bg} className=' object-cover rounded-2xl h-full w-full ' alt="" />
  <div className='absolute top-0 h-full w-full bg-[#0000005d] flex items-baseline-last justify-baseline'>
    <div className='p-10 bg-slate-900 rounded shadow shadow-[gray] max-w-[500px] m-10'>
      <h1 className='text-4xl text-white py-2'>Upload your code and see <span className='text-indigo-400 py-1'>The Magic!!</span></h1>
      <h1 className='text-2xl text-slate-300 mt-5 w-fit'>Let's get Stared</h1>

      <Link to={'/analyze'} className='mt-3 rounded shadow block'>
        <img src={assets.upload} className='h-[80px] w-[220px] rounded cursor-pointer' alt="" />
      </Link>

    </div>


  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-16 px-6 text-center text-slate-200">
  
  {/* Feature 1 */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500 shadow-lg hover:scale-105 transition">
    <div className="text-4xl mb-4">🧠</div>
    <h3 className="text-xl font-semibold">AI-Powered Understanding</h3>
    <p className="mt-2 text-sm text-slate-400">Instantly explain any code in plain English using intelligent algorithms.</p>
  </div>

  {/* Feature 2 */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500 shadow-lg hover:scale-105 transition">
    <div className="text-4xl mb-4">⚙️</div>
    <h3 className="text-xl font-semibold">Code Optimization</h3>
    <p className="mt-2 text-sm text-slate-400">Get suggestions to shorten, refactor, and improve your code.</p>
  </div>

  {/* Feature 3 */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500 shadow-lg hover:scale-105 transition">
    <div className="text-4xl mb-4">📄</div>
    <h3 className="text-xl font-semibold">File Upload Support</h3>
    <p className="mt-2 text-sm text-slate-400">Upload code files for batch analysis, summaries, and corrections.</p>
  </div>

  {/* Feature 4 */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-6 border border-fuchsia-500 shadow-lg hover:scale-105 transition">
    <div className="text-4xl mb-4">🚀</div>
    <h3 className="text-xl font-semibold">Instant Results</h3>
    <p className="mt-2 text-sm text-slate-400">Blazing fast insights with clean UI and modern tools.</p>
  </div>

</div>



<div className=" border border-[#ff000047] hover:shadow-2xl hover:shadow-[#ff000047] rounded-lg py-20 px-6 text-white text-center">
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    Try CodeSage Live
  </h2>
  <p className="text-slate-400 max-w-xl mx-auto mb-10">
    Paste your code below and see how CodeSage transforms it into plain English explanations.
  </p>
  <div className="bg-slate-900 p-6 rounded-xl max-w-3xl mx-auto shadow-lg">
    <textarea
      className="w-full h-48 p-4 bg-slate-800 rounded-md text-white font-mono resize-none"
      placeholder="Paste your code here..."
    ></textarea>
    <button className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold">
      Explain Code
    </button>
  </div>
</div>

<div className=" text-white py-20 px-6 text-center">
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    How CodeSage Works
  </h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
    <div className='border border-[#ff00006a] py-5 rounded-lg px-2'>
      <div className="text-5xl mb-4 ">📥</div>
      <h3 className="text-xl font-bold mb-2">1. Paste or Upload</h3>
      <p className="text-slate-400">Drop your code into the editor or upload files directly.</p>
    </div>
    <div className='border border-[#ff00006a] py-5 rounded-lg px-2'>
      <div className="text-5xl mb-4 ">⚙️</div>
      <h3 className="text-xl font-bold mb-2">2. Choose Action</h3>
      <p className="text-slate-400">Select what you want: Explain, Summarize, or Optimize.</p>
    </div>
    <div className='border border-[#ff00006a] py-5 rounded-lg px-2'>
      <div className="text-5xl mb-4 ">📄</div>
      <h3 className="text-xl font-bold mb-2">3. Get Instant Results</h3>
      <p className="text-slate-400">View simplified, AI-generated output in seconds.</p>
    </div>
  </div>
</div>

<div className=" text-white py-20 px-6">
  <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    Who Is CodeSage For?
  </h2>
  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <div className="text-center border border-[purple] rounded py-5 px-3">
      <div className="text-5xl">👨‍🎓</div>
      <h3 className="font-semibold mt-4">Students</h3>
      <p className="text-slate-400">Grasp code logic faster while learning.</p>
    </div>
    <div className="text-center border border-[purple] rounded py-5 px-3">
      <div className="text-5xl">🧑‍🏫</div>
      <h3 className="font-semibold mt-4">Teachers</h3>
      <p className="text-slate-400">Use AI to create easy-to-understand examples.</p>
    </div>
    <div className="text-center border border-[purple] rounded py-5 px-3">
      <div className="text-5xl">👨‍💻</div>
      <h3 className="font-semibold mt-4">Developers</h3>
      <p className="text-slate-400">Quickly review or refactor code.</p>
    </div>
    <div className="text-center border border-[purple] rounded py-5 px-3">
      <div className="text-5xl">🧪</div>
      <h3 className="font-semibold mt-4">Interview Prep</h3>
      <p className="text-slate-400">Understand tricky algorithms in simple terms.</p>
    </div>
  </div>
</div>

<div className=" text-white py-20 px-6 text-center hover:shadow-lg border border-[#ff000047]  ">
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    Why Choose CodeSage?
  </h2>
  <p className="text-slate-400 max-w-2xl mx-auto mb-10">
    Unlike forums or documentation, CodeSage gives you real-time, personalized code explanations and enhancements — instantly.
  </p>
  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="p-6 rounded-xl bg-slate-800 shadow-lg">
      <h3 className="font-bold text-xl mb-2">⏱️ Instant Response</h3>
      <p className="text-slate-400">Get insights without waiting for community answers.</p>
    </div>
    <div className="p-6 rounded-xl bg-slate-800 shadow-lg">
      <h3 className="font-bold text-xl mb-2">💡 AI-Level Understanding</h3>
      <p className="text-slate-400">CodeSage reads like a human — only faster and smarter.</p>
    </div>
    <div className="p-6 rounded-xl bg-slate-800 shadow-lg">
      <h3 className="font-bold text-xl mb-2">🔧 Practical Fixes</h3>
      <p className="text-slate-400">From bugs to formatting, improve your code easily.</p>
    </div>
  </div>
</div>


<div className='py-5 mt-10'>
<div className="text-center ">
  <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-glow">
    Supported Languages
  </h2>
  <p className="mt-2 text-slate-400 text-lg">From frontend to backend — we speak your language.</p>
</div>

  
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-10 px-6 text-center text-slate-200">
  
  {/* JavaScript */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">🟨</div>
    <p className="text-lg font-medium">JavaScript</p>
  </div>

  {/* Python */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-green-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">🐍</div>
    <p className="text-lg font-medium">Python</p>
  </div>

  {/* Java */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-red-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">☕</div>
    <p className="text-lg font-medium">Java</p>
  </div>

  {/* C++ */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">💠</div>
    <p className="text-lg font-medium">C++</p>
  </div>

  {/* C */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-sky-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">🔵</div>
    <p className="text-lg font-medium">C</p>
  </div>

  {/* HTML/CSS */}
  <div className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-4 border border-pink-400 shadow-lg hover:scale-105 transition">
    <div className="text-3xl mb-2">🌐</div>
    <p className="text-lg font-medium">HTML & CSS</p>
  </div>

</div>
</div>


<div className="bg-[#0c0c3a] text-white py-20 px-6 text-center">
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    Plans & Pricing
  </h2>
  <p className="text-slate-400 max-w-xl mx-auto mb-10">
    Simple, fair pricing to help you get started right away.
  </p>
  <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
    <div className="p-6 rounded-xl bg-slate-800 shadow-lg w-full md:w-1/2">
      <h3 className="text-2xl font-bold mb-2">🎉 Free Forever</h3>
      <p className="text-slate-400 mb-4">Unlimited explanations for personal projects.</p>
      <ul className="text-slate-300 mb-4 text-sm text-left list-disc pl-5">
        <li>✔ Unlimited summaries</li>
        <li>✔ Basic optimizations</li>
        <li>✔ Community support</li>
      </ul>
      <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold">
        Start Free
      </button>
    </div>
    <div className="p-6 rounded-xl bg-slate-900 shadow-lg w-full md:w-1/2 border border-indigo-600">
      <h3 className="text-2xl font-bold mb-2">🚀 Coming Soon: Pro</h3>
      <p className="text-slate-400 mb-4">Advanced tools for professionals and teams.</p>
      <ul className="text-slate-300 mb-4 text-sm text-left list-disc pl-5">
        <li>✔ Deep refactoring</li>
        <li>✔ Priority AI processing</li>
        <li>✔ Team dashboard</li>
      </ul>
      <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold">
        Notify Me
      </button>
    </div>
  </div>
</div>


<div className=" mt-10 text-white py-20 px-6 text-center border border-[#4c00827e]">
  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
    Stay in the Loop 📨
  </h2>
  <p className="text-slate-300 max-w-xl mx-auto mb-6">
    Get updates on new features, tutorials, and releases straight to your inbox.
  </p>
  <div className="flex justify-center max-w-md mx-auto">
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full px-4 py-2 rounded-l-lg text-black bg-white border-none outline-none"
    />
    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg text-white font-semibold">
      Subscribe
    </button>
  </div>
</div>







        </div>

    
      
    </div>
  )
}

export default Home
