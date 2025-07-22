import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { riderDateContext } from '../context/RiderContext'
import axios from 'axios'

const RiderLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') //two way binding - to know react as what we typing 

    const {riderData, setRiderData} = useContext(riderDateContext)
    const nagivation = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const riderLoginData = {
            email,
            password
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/riders/login`,riderLoginData)
        if(response.ok || response.status === 200){
            const data = response.data
            setRiderData(data.rider)
            localStorage.setItem('token', data.token)
            nagivation('/home2')
        }

        setEmail('')
        setPassword('')
    }
  return (
     <div className='p-6 h-screen flex flex-col justify-between'>
        <div>
            <form action="" className=''
            onSubmit={submitHandler}>
            <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-14 mb-6' />

            <h3 className='text-2xl font-semibold mb-4'>What's your email?</h3>
            <input required type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
             placeholder='rider@example.com' className='bg-[#eeeeee] rounded-xl py-2 px-4 mb-7 border-2 w-full text-xl  placeholder:text-lg' />

            <h3 className='text-2xl font-semibold mb-4'>Enter Password?</h3>
            <input required type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'className='bg-[#eeeeee] rounded-xl py-2 px-4 mb-7 border-2 w-full text-xl  placeholder:text-lg' />
            <button
            className='bg-[#111] text-[#fff] font-medium rounded-xl py-2 px-4 mb-2 w-full text-xl  '>
                Rider Login
            </button>
            
        </form>
          <p className='text-center '>
                New here? <Link to='/ridersignup' className='text-blue-500 font-medium'>
                Create a Rider Account
            </Link>
            </p>
        </div>
        <div>
          
            <Link to='/login'
            className='bg-orange-300 flex justify-center items-center hover:bg-orange-400 text-[#fff] font-medium rounded-xl py-2 px-4 mb-7 w-full text-xl   '>
                Login as a User
            </Link>
           
        </div>

    </div>
  )
}

export default RiderLogin