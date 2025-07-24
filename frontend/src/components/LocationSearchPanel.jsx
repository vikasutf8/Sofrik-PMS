import React from 'react'

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen }) => {


  const locations = [

    "near Lake Tahoe ,California ,US ",
    "near San Francisco ,California ,US ",
    "near Los Angeles ,California ,US ",

    "near Philadelphia ,Pennsylvania ,US ",


  ]

  return (
    <div className='w-full h-full ' >

      <h4 className='text-2xl font-semibold my-2'>Search for a location</h4>




      {
        locations?.map(function (location,idx) {
          return <div key={idx} onClick={() => {
            setVehiclePanelOpen(true)
            setPanelOpen(false)

          }} className='flex items-center border-2 p-2 rounded-2xl border-[#eee] active:border-black my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-lg'><i className="ri-map-pin-fill"></i></h2>
            <h4 className=' text-md font-normal '>
              {location}
            </h4>
          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel