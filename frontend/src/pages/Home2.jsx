import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RiderDetails from '../components/RiderDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import useSocket from '../context/SocketContext'
import { riderDateContext } from '../context/RiderContext'

const Home2 = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)
  const [ride,setRide] =useState(null)
  

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpRef = useRef(null)


  const { socket } = useContext(useSocket)
  const { riderData } = useContext(riderDateContext);

  useEffect(() => {
    riderData && socket.emit("join", { userId: riderData._id, userType: "rider" })
    // after rider join ->location of rider send to server via websocket and saved in db
    const updatelocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ops => {

          console.log({
            userId: riderData._id,
            location: {
              ltd: ops.coords.latitude,
              lng: ops.coords.longitude
            }
          })
          socket.emit('updateLocationRider', {
            userId: riderData._id,
            location: {
              ltd: ops.coords.latitude,
              lng: ops.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updatelocation, 10000);
    updatelocation()
    // return ()=>{
    //   clearInterval(locationInterval)
    // }
  }, [riderData])


  socket.on("newRide", (data) => {
    console.log(data);

    setRide(data)
    setRidePopUpPanel(true)
  })


  const confirmRide = async () => {
    
    // socket.emit("comfirmRide",{userId: riderData._id, rideId: ride._id})
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        riderId : riderData._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);
      setConfirmRidePopUp(true)
      setRidePopUpPanel(false)
    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }

  }


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
        <RidePopUp
        ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUp={setConfirmRidePopUp}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopUpRef}
        className='fixed w-full h-screen z-10 bottom-0 p-5 translate-y-full  bg-white  '>
        <ConfirmRidePopUp
        ride ={ride}
          setConfirmRidePopUp={setConfirmRidePopUp}
          setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default Home2