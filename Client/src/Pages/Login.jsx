import React, { useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import { assets } from '../assets/assets'

const Login = () => {
  const [login,setLogin] = useState(true);
  return (
    <div className='min-h-[100vh] w-full mx-auto'>
      <HomeHeader/>

        <div className='h-auto w-full flex items-start justify-between px-5'>
       
        <div className='h-[520px] w-[600px] border relative rounded-2xl'>
        <img src={assets.login} className='h-full w-full object-cover rounded-2xl' alt="" />
    <div className='absolute top-0 h-full w-full bg-[#00000044] rounded-2xl p-10 text-white'>
          
          <h1 className=' text-5xl mx-auto w-fit font-bold'>{login?"Login":"Join Us"}</h1>

          <div className='mb-5 mt-10'>
            {login?
            "":
            (<div className='flex items-center justify-between gap-5 py-3  text-lg'>
              <label htmlFor="email">E-mail:</label> 
              <input type="email" name="email" id="email" className='flex-1 max-w-[400px] border border-[violet] rounded outline-hidden text-sm p-2' />
            </div>)}

          <div className='flex items-center justify-between gap-5 py-3  text-lg'>
            <label htmlFor="username">Username:</label> 
            <input type="text" name="username" id="username" className='flex-1 max-w-[400px] border border-[violet] rounded outline-hidden text-sm p-2' />
          </div>
          <div className='flex items-center justify-between gap-5 py-3 text-lg'>
            <label htmlFor="password">Password:</label> 
            <input type="text" name="password" id="password" className='flex-1 max-w-[400px] border border-[violet] rounded outline-hidden text-sm p-2' />
          </div>

          <button className='block mx-auto w-fit py-3 px-15 my-10 rounded-lg hover:bg-white hover:text-slate-900 bg-slate-900 text-lg cursor-pointer transition-all font-semibold'>{login?"Login":"Create Account"}</button>
          <p onClick={()=>setLogin(!login)} className='cursor-pointer text-lg text-slate-600 hover:text-slate-300 transition-all mx-auto w-fit'>{login?"Don't have an account? Create a new account":"Already have an account? Login now"}</p>
          </div>

    </div>
        </div>
       
       


        <div className='flex-1 px-5 text-white'>
          
          <div className='p-5 border border-[blue] rounded-2xl'>
          <h1 className='text-3xl'>{login?"Welcome Back! Login to your account":"Welcome to CodeSage!!! Create an account to get connected"}</h1>
          {login
          ?
          <p className="text-lg mt-5 text-slate-400 mb-4">
  Welcome back to <strong className='text-[red] text-2xl'>CodeSage </strong>! Log in to continue analyzing, simplifying, and mastering code with the power of AI.
</p>
:<p className="text-lg mt-5 text-slate-400 mb-4">
New to <strong className='text-[red] text-2xl'>CodeSage </strong>? Create your free account and unlock smart code insights, real-time suggestions, and effortless understanding—powered by AI.
</p>

        }
          </div>
          <div className="bg-[#111842] p-8 my-12 w-full mx-auto rounded-2xl shadow-2xl text-white text-center hover:scale-105 transition-transform">
  <div className="text-5xl mb-4">💡</div>
  <h3 className="text-2xl md:text-3xl font-bold text-indigo-300 mb-4">
    AI That Understands Code Like You Do
  </h3>
  <p className="text-gray-300 text-lg">
    At <strong>CodeSage</strong>, we're redefining how you interact with code. Our AI breaks down complex logic, suggests improvements, and teaches you along the way — making coding easier, faster, and smarter.
  </p>
</div>
  
        </div>

        

        

        </div>

        
        <div className=" border w-[90%] mx-auto border-[#3b82f6] rounded-2xl my-10 py-16 px-6 text-white">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
    Worried about something?
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Secure Login */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">🔐</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Secure Login</h3>
      <p className="text-gray-300">Your credentials are encrypted with industry-standard security. Stay safe and worry-free.</p>
    </div>

    {/* Smart Authentication */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">🔏</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Smart Authentication</h3>
      <p className="text-gray-300">Fast, secure, and intelligent login with options like OTP or OAuth for seamless access.</p>
    </div>

    {/* Easy Sign Up */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">📝</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Simple Sign Up</h3>
      <p className="text-gray-300">Start your journey in seconds with our easy, one-step registration process.</p>
    </div>

    {/* Personal Dashboard */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">🧠</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Personalized Dashboard</h3>
      <p className="text-gray-300">Manage your uploads, see AI insights, and track changes—all in one place.</p>
    </div>

    {/* Password Recovery */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">🔄</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Password Recovery</h3>
      <p className="text-gray-300">Forgot your password? No worries—recover it instantly through verified email support.</p>
    </div>

    {/* User Privacy */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">🛡️</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-300">Full Privacy Control</h3>
      <p className="text-gray-300">Your data stays private. We never share user info and ensure complete confidentiality.</p>
    </div>
  </div>
</div>

       

      
    </div>
  )
}

export default Login
