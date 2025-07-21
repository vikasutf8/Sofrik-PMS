import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import RiderLogin from './pages/RiderLogin'
import RiderSignUp from './pages/RiderSignUp'
import Home1 from './pages/Home1'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/riderlogin' element={<RiderLogin />} />
        <Route path='/ridersignup' element={<RiderSignUp />} />
        <Route path='/home1' element={<Home1 />} />

      </Routes>
    </>
  )
}

export default App
