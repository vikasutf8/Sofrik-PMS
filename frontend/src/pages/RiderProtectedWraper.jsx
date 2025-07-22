import { riderDateContext } from '../context/RiderContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'

const RiderProtectedWraper = ({children}) => {
const token =localStorage.getItem('token')
const {riderData,setRiderData} =useContext(riderDateContext)
const [isLoading,setIsLoading]=useState(true)
const nagivation = useNavigate()
    useEffect(()=>{
        if(!token){
            nagivation('/riderlogin')
        }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/riders/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        if(response.ok || response.status === 200){
            const data = response.data
            setRiderData(data.rider)
            setIsLoading(false)
        }
    }).catch(err=>{
        console.log(err)
        localStorage.removeItem('token') 
        nagivation("/riderlogin")
    })

    if(isLoading){
        return (
            <div>Loading....</div>
        )
    }



  return (
   <>
    {children}
   </>
  )
}

export default RiderProtectedWraper