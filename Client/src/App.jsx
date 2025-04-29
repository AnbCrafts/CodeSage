import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import About from './Pages/About'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import Help from './Pages/Help'
import Login from './Pages/Login'
import Analyze from './Pages/Analyze'

 
const App = () => {

  return (
    <div className='min-h-[100vh] w-full glow-bg '>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/analyze' element={<Analyze/>}/>

        
      </Routes>

    <hr className='h-[2px] w-full bg-white mt-5' />
      <Footer/>

      
    </div>
  )
}

export default App
