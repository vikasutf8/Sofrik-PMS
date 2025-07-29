import React from 'react'

const RidePopUp = ({ setRidePopUpPanel,setConfirmRidePopUp,ride, confirmRide }) => {
    return (
        <div >
            <h5
                onClick={() => setRidePopUpPanel(false)}
                className=' text-center text-2xl'>  <i className="ri-arrow-down-s-line"></i></h5>
            <h3 className='text-2xl   pb-2'>New Ride Available</h3>

            <div className='flex justify-between items-center p-2 bg-amber-200 rounded-2xl  '>
                <div className='flex justify-start items-center gap-4'>
                    <img
                        className=' h-15 w-15 rounded-full object-cover'
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
                    <h4 className='text-lg font-medium'>{ride?.user?.fullname.firstname}</h4>
                </div>
                <h5>4.5 KM</h5>
            </div>


            <div className='flex flex-col justify-between items-center gap-3  '>
                <div className='w-full mt-3'>
                    <div className='flex items-center gap-6 p-4 border-b-2 '>
                        <i className="ri-map-pin-fill text-xl"></i>
                        <div>
                            <h3 className='text-lg font-medium'> Sector 45</h3>
                            <p className='text-base text-gray-600 -mt-1'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 p-4 border-b-2 '>
                        <i className="text-xl ri-road-map-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'> Sector 7</h3>
                            <p className='text-base text-gray-600 -mt-1'>{ride.dropoff}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 p-4 '>
                        <i className=" text-xl ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'> {ride.fare}</h3>
                            <p className='text-base text-gray-600 -mt-1'>Cash | Uber Wallet</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setConfirmRidePopUp(true) 
                        confirmRide() }}
                    className='w-full text-lg bg-green-300 font-semibold py-2 rounded-xl'>
                    Accept
                </button>
                <button
                    onClick={() => setRidePopUpPanel(false)}
                    className='w-full text-lg bg-gray-300 font-semibold py-2 rounded-xl'>
                    Ignore
                </button >
            </div>
        </div>
    )
}

export default RidePopUp