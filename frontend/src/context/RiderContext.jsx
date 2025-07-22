import React,{ useState ,createContext}  from 'react'


export const riderDateContext =createContext();

// export const useRider = () => {
//     const context = React.useContext(riderDateContext);
//     if (context === undefined) {
//         throw new Error('useRider must be used within a RiderContext');
//     }
//     return context;
// }


const RiderContext = ({ children }) => {
    const [riderData, setRiderData] = useState({})
    const [isLoading ,setIsLoading ] = useState(false)

    const updateRiderData = (data) => {
        setRiderData(data)
    }

    const value={
        riderData,
        setRiderData,
        updateRiderData,
        isLoading,
        setIsLoading
    }

  return (
    <div>
        <riderDateContext.Provider value={value}>
          {children}
        </riderDateContext.Provider>
    </div>
  )
}

export default RiderContext