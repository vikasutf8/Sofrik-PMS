import React from 'react'

const RiderDetails = () => {
    return (
        <div>  
            <div className='flex justify-between items-center  border-b-2 border-gray-300 mt-4 pb-8'>
            <div className='flex justify-start items-center gap-5'>
                <img
                    className=' h-15 w-15 rounded-full object-cover'
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png" alt="" />
                <h4 className='text-lg font-medium'>Driver</h4>
            </div>
            <div>
                <h4 className='text-xl font-medium'>4524.00</h4>
                <p className='text-md text-gray-700'>Volvo A7</p>
            </div>
        </div>

            <div className='flex px-4 py-2 justify-center items-center gap-6 mt-4 '>
                <div className='text-center bg-amber-100 p-5 rounded-full'>
                    <i className="text-3xl font-thin ri-time-line"></i>
                    <h5 className='text-lg font-medium '>10.3</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
                <div className=' text-center bg-amber-100 p-5 rounded-full'>
                    <i className="text-3xl font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium '>10.3</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
                <div className='text-center bg-amber-100 p-5 rounded-full'>
                    <i className="text-3xl font-thin ri-booklet-fill"></i>
                    <h5 className='text-lg font-medium '>10.3</h5>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
            </div>

        </div>
    )
}

export default RiderDetails