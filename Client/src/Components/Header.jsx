import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-[90%] mx-auto flex items-center justify-start gap-10 py-5'>
<Link to={'/'}>
<img src={assets.logo} className='h-[80px] w-[80px] rounded-full border border-[violet] cursor-pointer' alt="" /></Link>
 <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
    CodeSage AI Code Analyzer
  </h1>

  <div className='flex items-center justify-end flex-1 gap-5'>
    <span className='text-md text-[violet] border border-[#ee82ee6d] cursor-pointer hover:bg-[violet] hover:text-[black] transition-all rounded-lg py-1 px-4 shadow'>Summarize</span>
    <span className='text-md text-[violet] border border-[#ee82ee6d] cursor-pointer hover:bg-[violet] hover:text-[black] transition-all rounded-lg py-1 px-4 shadow'>Suggestions</span>
    <span className='text-md text-[violet] border border-[#ee82ee6d] cursor-pointer hover:bg-[violet] hover:text-[black] transition-all rounded-lg py-1 px-4 shadow'>Trim</span>
    <span className='text-md text-[violet] border border-[#ee82ee6d] cursor-pointer hover:bg-[violet] hover:text-[black] transition-all rounded-lg py-1 px-4 shadow'>Voice Explanation</span>

  </div>

 </div>
  )
}

export default Header
