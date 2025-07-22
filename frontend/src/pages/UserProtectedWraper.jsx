import React, { useContext, useEffect, useState } from 'react'
import { userDateContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWraper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(userDateContext)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.ok || response.status === 200) {
                setUserData(response.data)
                setIsLoading(false)
            }
        }).catch(err => {
            console.log("error of message", err.message)
            localStorage.removeItem('token')
            navigate("/login")
        })
    }, [token])

    if (isLoading) {
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