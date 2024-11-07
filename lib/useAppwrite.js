import { useState, useEffect } from "react"

export const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
            setData(response)
        } catch (error) {
            Alert.alert("Error", "Videos nod loaded")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, fetchData }
}