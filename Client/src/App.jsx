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
import Settings from './Pages/Settings'
import Templates from './Pages/Teamplates'

  
const App = () => {

  return (
    <div className='min-h-[100vh] w-full glow-bg '>

<Routes>
  {/* ================= PUBLIC ROUTES ================= */}
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/help" element={<Help />} />
  <Route path="/login" element={<Login />} />

  {/* ================= LOGGED-IN ROUTES ================= */}
  <Route path="/code-sage/:secureHash">
    <Route index element={<Home />} />
    <Route path="services" element={<Services />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="help" element={<Help />} />
    <Route path="analyze" element={<Analyze />} />
    <Route path='settings' element={<Settings/>} />
    {/* <Route path='templates' element={<Templates/>} /> */}
  </Route>
</Routes>



      <Footer/>

      
    </div>
  )
}

export default App
