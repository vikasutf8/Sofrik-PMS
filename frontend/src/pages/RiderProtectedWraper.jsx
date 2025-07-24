import React, { useContext, useEffect, useState } from 'react'
import { riderDateContext } from '../context/RiderContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RiderProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    const { riderData, setRiderData } = useContext(riderDateContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (!token) {
            navigate('/riderlogin')
            return
        }

        // API call to verify token and get rider data
        axios.get(`${import.meta.env.VITE_BASE_URL}/riders/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setRiderData(response.data.rider)
                setIsLoading(false)
            }
        })
        .catch(err => {
            console.log("Authentication error:", err)
            localStorage.removeItem('token')
            navigate("/riderlogin")
        })
    }, [navigate, setRiderData]) // Remove token from dependencies

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default RiderProtectedWrapper