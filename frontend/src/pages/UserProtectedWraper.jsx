import React, { useContext, useEffect, useState } from 'react'
import { userDateContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(userDateContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (!token) {
            navigate('/login')
            return
        }

        // API call to verify token and get user data
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                // console.log(response.data)
                setUserData(response.data) // Note: using response.data.user based on your controller
                setIsLoading(false)
            }
        })
        .catch(err => {
            console.log("Authentication error:", err.message)
            localStorage.removeItem('token')
            navigate("/login")
        })
    }, [navigate, setUserData]) // Remove token from dependencies

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

export default UserProtectedWrapper