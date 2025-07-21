import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const RiderSignUp = () => {

     const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e) => {
        e.preventDefault()


        setUserData({
            fullName:{
                firstName,lastName
            },
            email,
            password
        })

        console.log(userData)
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }
  return (
     <div className='p-6 h-screen flex flex-col justify-between'>
            <div>
                <form action="" className=''
                    onSubmit={submitHandler}>
                    <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-14 mb-6' />
                    <h3 className='text-2xl font-semibold mb-4'>What's your Name?</h3>
                    <div className='mb-5 flex gap-4'>
                        <input required type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name' className='bg-[#eeeeee] rounded-xl w-1/2 py-2 px-4 border-2  text-xl  placeholder:text-lg' />
                        <input required type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name' className='bg-[#eeeeee] rounded-xl py-2 px-4  border-2 w-1/2 text-xl  placeholder:text-lg' />

                    </div>
                    <h3 className='text-2xl font-semibold mb-4'>What's your email?</h3>
                    <input required type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email@example.com' className='bg-[#eeeeee] rounded-xl py-2 px-4 mb-4 border-2 w-full text-xl  placeholder:text-lg' />

                    <h3 className='text-2xl font-semibold mb-4'>Enter Password?</h3>
                    <input required type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password' className='bg-[#eeeeee] rounded-xl py-2 px-4 mb-4 border-2 w-full text-xl  placeholder:text-lg' />
                    <button
                        className='bg-[#111] text-[#fff] font-medium rounded-xl py-2 px-4 mb-2 w-full text-xl  '>
                        Sign Up
                    </button>

                </form>
                <p className='text-center '>
                    Have u Account? <Link to='/riderlogin' className='text-blue-500 font-medium'>
                        Moved to Login
                    </Link>
                </p>
            </div>
            <div>

                <Link to='/riderlogin'
                    className='bg-red-300 flex justify-center items-center hover:bg-red-400 text-[#fff] font-medium rounded-xl py-2 px-4 mb-4 w-full text-xl   '>
                    Login as a Rider
                </Link>

            </div>

        </div>
  )
}

export default RiderSignUp