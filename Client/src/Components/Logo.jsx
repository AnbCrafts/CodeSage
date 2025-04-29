import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'} className=' h-[80px] w-[80px] shadow shadow-[#ee82ee80] border border-[#ee82ee6b]  rounded-2xl p-1 cursor-pointer'>
        <img src={assets.logo} className=' h-[70px] w-[70px] object-cover rounded-full shadow' alt="" />
    </Link>
  )
}

export default Logo
