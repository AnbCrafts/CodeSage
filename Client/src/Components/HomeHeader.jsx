import React from 'react'
import Logo from './Logo'
import { Link, useLocation } from 'react-router-dom'

const HomeHeader = () => {
    const location = useLocation();

    

    
  return (
    <div className=' flex items-center justify-between py-5 px-10 mb-10'>
        
        <Logo/>
    <div className=' px-5 shadow  rounded flex items-center justify-start gap-5'>
        <Link to={'/'} className={` text-sm px-5 py-1 rounded ${location.pathname==='/'?'text-[white]  font-semibold  border border-[violet] ':'text-[white] shadow shadow-[indigo] hover:shadow-lg hover:shadow-[indigo]'}`}>
        Home
        </Link>
        
        <Link to={'/services'} className={` text-sm px-5 py-1 rounded ${location.pathname==='/services'?'text-[white]  font-semibold  border border-[violet] ':'text-[white] shadow shadow-[indigo] hover:shadow-lg hover:shadow-[indigo]'}`}>
        Services
        </Link>
        <Link to={'/about'} className={` text-sm px-5 py-1 rounded ${location.pathname==='/about'?'text-[white]  font-semibold  border border-[violet] ':'text-[white] shadow shadow-[indigo] hover:shadow-lg hover:shadow-[indigo]'}`}>
        About
        </Link>
        
        <Link to={'/contact'} className={` text-sm px-5 py-1 rounded ${location.pathname==='/contact'?'text-[white]  font-semibold  border border-[violet] ':'text-[white] shadow shadow-[indigo] hover:shadow-lg hover:shadow-[indigo]'}`}>
        Contact
        </Link>
        
        <Link to={'/help'} className={` text-sm px-5 py-1 rounded ${location.pathname==='/help'?'text-[white]  font-semibold  border border-[violet] ':'text-[white] shadow shadow-[indigo] hover:shadow-lg hover:shadow-[indigo]'}`}>
        Help
        </Link>
        

      
    </div>

    <div>
        <Link to={'/login'} className={`${location.pathname ==='/login'?'bg-[blue] text-white':'bg-[indigo] text-[white]'} hover:shadow-2xl hover:shadow-[indigo] hover:text-[#fff] transition-all cursor-pointer font-semibold py-2 px-5 rounded `}>
        Login/Signup
        </Link>
    </div>
    </div>
  )
}

export default HomeHeader
