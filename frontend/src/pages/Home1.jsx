
import React, { use, useEffect, useRef, useState,useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ComfirmedRide from '../components/ComfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { useSocket } from '../context/SocketContext'
import { userDateContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



const Home1 = () => {
  const [pickLocation, setPickLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmeRidePanelOpen, setConfirmeridePanelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [activeInput, setActiveInput] = useState('')
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState('')
const [ride,setRide] =useState(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmeRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitForDriverRef = useRef(null)

  const { socket } = useSocket();

    const { userData } = useContext(userDateContext);

    const navigate = useNavigate()

  useEffect(() => {
    userData && socket.emit("join",{userId: userData.user._id,userType: "user"})
    
  },[userData])

  socket.on("rideConfirmed",ride=>{
    setWaitingForDriver(true)
    setVehicleFound(false)
    setRide(ride)
  })

  socket.on("rideStarted",ride=>{
    setWaitingForDriver(false)
    navigate("/riding",{state:{ride}})
  })


  const SubmitHandler = (e) => {
    e.preventDefault() 
    console.log("submit")
  }

  const findTrip = async () => {
    setPanelOpen(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/fare`, {
        params: {
          pickup: pickLocation,
          dropoff: dropoffLocation,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFare(response.data.fare);
      setVehiclePanelOpen(true);
    } catch (error) {
      console.error("Failed to fetch fare:", error);

    }
  };

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      vehicleType: vehicleType,
      pickup: pickLocation,
      dropoff: dropoffLocation,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }


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

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [vehiclePanelRef, vehiclePanelOpen])

  useGSAP(() => {
    if (confirmeRidePanelOpen) {
      gsap.to(confirmeRidePanelRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(confirmeRidePanelRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [confirmeRidePanelRef, confirmeRidePanelOpen])


  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [vehicleFoundRef, vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitForDriverRef.current, {
        duration: 0.3,
        translateY: '0%'
      })
    } else {
      gsap.to(waitForDriverRef.current, {
        duration: 0.3,
        translateY: '100%'
      })
    }
  }, [waitForDriverRef, waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      {/* logo */}
      <img src='https://toppng.com/uploads/preview/uber-new-logo-2018-11550112725dlrgv5nhdy.png' alt='Uber Logo' className='w-16 absolute left-5 top-5' />
      {/* Map temp image */}
      <div
        // onClick={()=>setVehiclePanelOpen(false)}
        className='h-screen w-screen'>

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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-2/5 left-10 bg-black rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveInput('pickup')
              }}
              value={pickLocation}
              onChange={(e) => setPickLocation(e.target.value)}
              className='bg-[#eee] px-10 py-2 text-lg rounded-xl w-full mt-3'
              type="text"
              placeholder='Add a pick location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveInput('dropoff')
              }}
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className='bg-[#eee] px-10 py-2 text-lg rounded-xl w-full mt-3'
              type="text"
              placeholder='Enter your dropoff location'
            />
            {pickLocation && dropoffLocation && (
              <button
                onClick={() => { findTrip() }}
                className='w-full bg-black text-white py-3 rounded-xl mt-3 font-semibold'
              >
                Select Vehicle
              </button>
            )}
          </form>
        </div>
        <div className={`bg-white px-5`} ref={panelRef}>
          <LocationSearchPanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
            searchInput={activeInput === 'pickup' ? pickLocation : dropoffLocation}
            setLocation={activeInput === 'pickup' ? setPickLocation : setDropoffLocation}
            isPickup={activeInput === 'pickup'}
          />
        </div>
      </div>
      {/* after selecting the location */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 p-5 translate-y-full bg-white  '>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmeridePanelOpen={setConfirmeridePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      {/* after selecting the vehicle */}
      <div ref={confirmeRidePanelRef} className='fixed w-full z-10 bottom-0 p-5 translate-y-full bg-white '>
        <ComfirmedRide
          vehicleType={vehicleType}
          pickLocation={pickLocation}
          dropoffLocation={dropoffLocation}
          createRide={createRide}
          fare={fare}
          setConfirmeridePanelOpen={setConfirmeridePanelOpen}
          setVehicleFound={setVehicleFound} 
          />
      </div>

      {/*  */}

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 p-5 translate-y-full bg-white '>
        <LookingForDriver
          vehicleType={vehicleType}
          pickLocation={pickLocation}
          dropoffLocation={dropoffLocation}
          createRide={createRide}
          fare={fare}
          setVehicleFound={setVehicleFound} />
      </div>


      <div ref={waitForDriverRef} className='fixed w-full z-10 bottom-0 p-5  bg-white '>
        <WaitingForDriver
        ride ={ride}
        setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  )
}

export default Home1