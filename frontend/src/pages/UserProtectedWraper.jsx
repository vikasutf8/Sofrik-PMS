import React ,{ useContext } from 'react'
import { userDateContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const UserProtectedWraper = ({children}) => {
const token =localStorage.getItem('token')

const nagivation = useNavigate()
    useEffect(()=>{
        if(!token){
            nagivation('/login')
        }
    },[token])

  return (
   <>
    {children}
   </>
  )
}

export default UserProtectedWraper