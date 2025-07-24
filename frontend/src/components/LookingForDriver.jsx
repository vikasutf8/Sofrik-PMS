import React from 'react'

const LookingForDriver = ({setVehicleFound}) => {
    return (
        <div >
            <h5 onClick={() => setVehicleFound(false)} className=' text-center text-2xl'>  <i className="ri-arrow-down-s-line"></i></h5>
            <h3 className='text-2xl'>Looking For Driver</h3>
            {/* image accroding to vehicel */}
            <div className='flex flex-col justify-between items-center gap-6 mt-5 '>
                <img
                    className=' h-25'
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-6 p-4 border-b-2 '>
                        <i className="ri-map-pin-fill text-xl"></i>
                        <div>
                            <h3 className='text-lg font-medium'> Sector 45</h3>
                            <p className='text-base text-gray-600 -mt-1'>Gurugram, Haryana</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 p-4 border-b-2 '>
                        <i className="text-xl ri-road-map-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'> Sector 7</h3>
                            <p className='text-base text-gray-600 -mt-1'>Gurugram, Haryana</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 p-4 '>
                        <i class=" text-xl ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'> 148.74</h3>
                            <p className='text-base text-gray-600 -mt-1'>Cash | Uber Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver