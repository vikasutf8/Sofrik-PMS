import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div className='w-full h-full'>

        <h4 className='text-2xl font-semibold my-2'>Search for a location</h4>
         <div className='flex items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-lg'><i className="ri-map-pin-fill"></i></h2>
            <h4 className=' text-md font-normal'>lag,gasg,ssagsfags agsafg.sf.gsfgas fgasf gsa khfyhliu6tyi</h4>
         </div>
          <div className='flex items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-lg'><i className="ri-map-pin-fill"></i></h2>
            <h4 className=' text-md font-normal '>lag,gasg,ssagsfags agsafg.sf.gsfgas fgasf gsa</h4>
         </div>
    </div>
  )
}

export default LocationSearchPanel