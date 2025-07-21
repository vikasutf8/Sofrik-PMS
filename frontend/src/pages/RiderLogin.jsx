import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RiderLogin = () => {
        const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') //two way binding - to know react as what we typing 

    const [riderDate, setRiderDate] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        

        setRiderDate({
            email,
            password
        })
        console.log(riderDate)
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
                Login
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