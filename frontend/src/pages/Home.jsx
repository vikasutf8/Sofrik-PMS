import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg)] h-screen w-full pt-8 bg-red-200 flex flex-col justify-between'>
            <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-10 ml-8' />
            <div className='bg-white px-5 pb-4 py-3 flex  flex-col items-start'>
                <h3 className='text-3xl font-bold'>Get Started with Uber</h3>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white text-2xl font-medium py-3 mt-8 rounded-2xl'>
                Continue
                </Link>
            </div>

        </div>


    </div>
  )
}

export default Home