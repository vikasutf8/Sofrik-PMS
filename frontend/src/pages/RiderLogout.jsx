import axios from 'axios'
import React from 'react'

const RiderLogout = () => {

    const token = localStorage.getItem('token')
    if(token){
        axios.get(`${import.meta.env.VITE_BASE_URL}/riders/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response) => {
            if(response.ok || response.status === 200){
                localStorage.removeItem('token')
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log(token)
    
  return (
    <div>RiderLogout</div>
  )
}

export default RiderLogout