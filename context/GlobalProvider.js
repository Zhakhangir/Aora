import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                if (user) {
                    setIsLoggedIn(true)
                    setUser(user)
                } else {
                    setIsLoggedIn(true)
                    setUser(user)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (<GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
    >
        {children}
    </GlobalContext.Provider>)

}

export default GlobalProvider