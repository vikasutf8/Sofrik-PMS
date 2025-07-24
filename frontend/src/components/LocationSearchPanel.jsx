import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen, searchInput, setLocation, isPickup }) => {

  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchInput || searchInput.length < 3) return
      setLoading(true)
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/getSuggestions?input=${searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        console.log(response.data.suggestions)
        setSuggestions(response.data.suggestions)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      } finally {
        setLoading(false)
      }
    }
    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchInput])


  return (
    <div className='w-full h-full'>
      <h4 className='text-2xl font-semibold my-2'>Search for a location</h4>

      {loading && <div className="text-center py-2">Loading...</div>}

      {suggestions?.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            setLocation(suggestion.prediction.description)
          }}
          className='flex items-center border-2 p-2 rounded-2xl border-[#eee] active:border-black my-2 justify-start gap-4'
        >
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-lg'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='text-md font-normal'>
            {suggestion.prediction.description}
          </h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel