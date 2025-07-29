import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const RiderRiding = () => {


    const [FinshRidePanel, setFinshRidePanel] = useState(false)
    const location =useLocation()
    const FinshRidePanelRef = useRef(null)
    const rideData =location.state?.ride

    useGSAP(() => {
        if (FinshRidePanel) {
            gsap.to(FinshRidePanelRef.current, {
                duration: 0.3,
                translateY: '0%'
            })
        } else {
            gsap.to(FinshRidePanelRef.current, {
                duration: 0.3,
                translateY: '100%'
            })
        }
    }, [FinshRidePanelRef, FinshRidePanel])



    return (
        <div className='h-screen'>

            <div className='h-4/5 w-screen bg-red-200'>
            </div>
            <div 
            onClick={()=>setFinshRidePanel(true)}
            className='h-1/5 p-4 bg-gray-200 flex flex-col justify-center items-center gap-6  '>
                <div className='flex justify-center items-center gap-4'>
                    <i className="p-2 bg-white text-black  text-4xl rounded-full ri-arrow-up-double-fill"></i>
                    <h4 className='text-xl font-medium'>4 Km Away</h4>

                </div>
                <Link 
                    className='w-full text-lg bg-gray-400 text-white flex justify-center font-semibold py-2 rounded-xl'>
                    Confirm
                </Link>
            </div>
            <div
                ref={FinshRidePanelRef}
                className='fixed w-full h-screen z-10 bottom-0 p-5 translate-y-full  bg-white  '>
                    <FinishRide setFinshRidePanel={setFinshRidePanel} ride={rideData} />
            </div>
        </div>
    )
}

export default RiderRiding