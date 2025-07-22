import React ,{ useContext } from 'react'
import { userDateContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const UserProtectedWraper = ({children}) => {
const token =localStorage.getItem('token')
const {userData,setUserData} =useContext(userDateContext)
const [isLoading,setIsLoading]=useState(true)
const nagivation = useNavigate()
    useEffect(()=>{
        if(!token){
            nagivation('/login')
        }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        const data = response.data
        setUserData(data.user)
        setIsLoading(false)
    }).catch(err=>{
        console.log(err)
        localStorage.removeItem('token') 
        nagivation("/login")
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

export default UserProtectedWraper