import axios from "axios"
import { useEffect, useState } from "react"



export const useNewsProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://furniture-api.fly.dev/v1/products?sort=newest&limit=25`)
                setProducts(response.data.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        };
        fetchDiscount();
    }, [])


    return{products, loading, error }


}


