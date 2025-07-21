import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import RiderLogin from './pages/RiderLogin'
import RiderSignUp from './pages/RiderSignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/riderlogin' element={<RiderLogin />} />
        <Route path='/ridersignup' element={<RiderSignUp />} />

      </Routes>
    </>
  )
}

export default App
