import React from 'react'
import { Link } from 'react-router-dom'
import RiderDetails from '../components/riderDetails'
import RidePopUp from '../components/RidePopUp'

const Home2 = () => {
  return (
    <div className='h-screen'>
      {/* <div className='fixed  w-full p-3 top-0  flex items-center justify-between'>
        <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-screen h-1/2 object-cover' />
        <Link to="/home1" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className=" text-xl font-bold ri-home-smile-line"></i>
        </Link>
      </div> */}
      <div className='h-3/5 w-screen bg-red-200'>

      </div>
      <div className='h-2/5 p-4'>
      <RiderDetails />
      </div> 
      <div  className='fixed w-full z-10 bottom-0 p-5 translate-y-full bg-white  '>
        <RidePopUp />
      </div>
    </div>
  )
}

export default Home2