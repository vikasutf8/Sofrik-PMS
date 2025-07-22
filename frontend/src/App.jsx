import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import RiderLogin from './pages/RiderLogin'
import RiderSignUp from './pages/RiderSignUp'
import Home1 from './pages/Home1'
import UserProtectedWraper from './pages/UserProtectedWraper'
import Userlogout from './pages/Userlogout'
import RiderProtectedWraper from './pages/RiderProtectedWraper'
import Home2 from './pages/Home2'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/riderlogin' element={<RiderLogin />} />
        <Route path='/ridersignup' element={<RiderSignUp />} />
        <Route path='/home1' element={
          <UserProtectedWraper>
            <Home1 />
          </UserProtectedWraper>
        } />
        <Route path='/logout' element={
          <UserProtectedWraper>
            <Userlogout />
          </UserProtectedWraper>
        } />
        <Route path='/home2' element={
            <RiderProtectedWraper>
              <Home2 />
            </RiderProtectedWraper>
        }/>

      </Routes>
    </>
  )
}

export default App
