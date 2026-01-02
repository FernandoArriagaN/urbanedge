
import axios from "axios"
import { useEffect, useState } from "react"




export const useSearch = (search) => {
     const [products, setProducts] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
    useEffect(() => {
        const fetchPrproduct = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://furniture-api.fly.dev/v1/products?name=${search}`)
                setProducts(response.data.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        };
        fetchPrproduct()
    },[search])


    return{products, loading, error }
}