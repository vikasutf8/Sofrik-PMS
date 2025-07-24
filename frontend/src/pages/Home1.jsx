import React, { use, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home1 = () => {
  const [pickLocation, setPickLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)


  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        duration: 0.3,
        height: '80%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })

    } else {
      gsap.to(panelRef.current, {
        duration: 0.3,
        height: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }

  }, [panelOpen])

  const SubmitHandler = (e) => {
    e.preventDefault()
    console.log("submit")
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-16 absolute left-5 top-5' />

      <div className='h-screen w-screen'>
        {/* temp image */}
        <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oTuUjZdW-7ETyH28q6Gxog06BFv6SMpEtA&s" alt="asdfasdfasf" />
      </div>
      <div className='flex flex-col justify-end absolute w-full h-screen top-0 '>
        <div className='h-[20%] bg-white p-5 relative'>
          <h5
            ref={panelCloseRef}
            className='absolute top-6 right-6 text-2xl opacity-0' onClick={() => { setPanelOpen(false) }}>
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find Trip</h4>
          <form action="" onSubmit={(e) => {
            SubmitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-2/5 left-10 bg-black rounded-full"></div>
            <input
              onClick={() => { setPanelOpen(true) }}
              value={pickLocation}
              onChange={(e) => {
                setPickLocation(e.target.value)
              }}
              className='bg-[#eee] px-10 py-2 text-lg rounded-xl w-full mt-3' type="text" placeholder='Add a pick location' />
            <input
              onClick={() => { setPanelOpen(true) }}
              value={dropoffLocation}
              onChange={(e) => {
                setDropoffLocation(e.target.value)
              }}
              className='bg-[#eee] px-10 py-2 text-lg rounded-xl w-full mt-3' type="text" placeholder='Enter your dropoff location' />
          </form>
        </div>
        <div className={` bg-white px-5 `} ref={panelRef}>
          <LocationSearchPanel />
        </div>
      </div>

      <div className='fixed w-full z-10 bottom-0 p-5 '>
        <h3 className='text-3xl mb-5'>Your Trips Choose</h3>
        <div className='px-5 py-2 mb-4 flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
              <img
              className='w-15 h-15'
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
               <div className='w-1/2'>
                 <h4 className='text-lg font-medium'>Uber's Car <span><i className="ri-user-5-fill">4</i></span></h4>
                 <h5 className='text-sm font-medium'>Few min Away</h5>
                 <p className='text-xm text-gray-700'>Discount Price</p>
               </div>
               <h2 className='text-2xl'>Rs. 100</h2>
        </div>
        <div className='px-5 py-2 mb-4  flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
              <img
              className='w-15 h-15'
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
               <div className='w-1/2'>
                 <h4 className='text-lg font-medium'>Uber's Car <span><i className="ri-user-5-fill">4</i></span></h4>
                 <h5 className='text-sm font-medium'>Few min Away</h5>
                 <p className='text-xm text-gray-700'>Discount Price</p>
               </div>
               <h2 className='text-2xl'>Rs. 100</h2>
        </div>
        <div className='px-5 py-2  mb-4 flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
              <img
              className='w-15 h-15'
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
               <div className='w-1/2'>
                 <h4 className='text-lg font-medium'>Uber's Car <span><i className="ri-user-5-fill">4</i></span></h4>
                 <h5 className='text-sm font-medium'>Few min Away</h5>
                 <p className='text-xm text-gray-700'>Discount Price</p>
               </div>
               <h2 className='text-2xl'>Rs. 100</h2>
        </div>
      </div>

    </div>
  )
}

export default Home1