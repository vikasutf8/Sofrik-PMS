import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RiderDetails from '../components/RiderDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useSocket } from '../context/SocketContext'
import { riderDateContext } from '../context/RiderContext'

const Home2 = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpRef = useRef(null)


  const { socket } = useSocket();

  const { riderData } = useContext(riderDateContext);
  
  useEffect(() => {
    riderData && socket.emit("join", { userId: riderData._id, userType: "rider" })
  }, [riderData])

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [ridePopUpPanelRef, ridePopUpPanel])


  useGSAP(() => {
    if (confirmRidePopUp) {
      gsap.to(confirmRidePopUpRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [confirmRidePopUpRef, confirmRidePopUp])


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
      <div
        ref={ridePopUpPanelRef}
        className='fixed w-full z-10 bottom-0 p-5 translate-y-full  bg-white  '>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUp={setConfirmRidePopUp} />
      </div>

      <div
        ref={confirmRidePopUpRef}
        className='fixed w-full h-screen z-10 bottom-0 p-5 translate-y-full  bg-white  '>
        <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default Home2