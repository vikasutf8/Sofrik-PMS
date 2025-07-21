import React, { createContext, useState } from 'react'

export const userDateContext =createContext();


const UserContext = ({ children }) => {

    const [userData, setUserData] = useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:''
    })


  return (
    <div>
       <userDateContext.Provider value={{userData, setUserData}}>
         {children}
       </userDateContext.Provider>
        </div>
  )
}

export default UserContext