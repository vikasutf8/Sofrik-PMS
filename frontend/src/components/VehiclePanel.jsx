import React from 'react'

const VehiclePanel = ({setConfirmeridePanelOpen,setVehiclePanelOpen}) => {
    return (
        <div>
            <h5  className=' text-center text-2xl'>  <i className="ri-arrow-down-s-line"></i></h5>
            <h3 className='text-3xl mb-5'>Your Trips Choose</h3>
            <div 
               
                onClick={()=>setConfirmeridePanelOpen(true)}
            className='px-5 py-2 mb-4 flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
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
            <div
             onClick={()=>setConfirmeridePanelOpen(true)}
             className='px-5 py-2 mb-4  flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
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
            <div 
            onClick={() => setVehiclePanelOpen(false)}
            className='px-5 py-2  mb-4 flex w-full items-center justify-between gap-2 border-2  active:border-black rounded-xl'>
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
    )
}

export default VehiclePanel