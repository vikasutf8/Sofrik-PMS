import React from 'react'
import axios from 'axios'
const Userlogout = () => {

    const token = localStorage.getItem('token')
    if(token){
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
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
    <div>Userlogout</div>
  )
}

export default Userlogout
