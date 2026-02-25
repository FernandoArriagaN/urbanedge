import axios from "axios"
import { useEffect, useState } from "react"



export const useCategoryProducts = (category) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await axios.get(`https://furniture-api.fly.dev/v1/products?category=${category}&limit=20`)
                setProducts(response.data.data)
                
            } catch (error) {
                setError(error.response?.data?.message || "error al cargar los productos");
                setLoading(false)
            } finally {
            setLoading(false)
        }
        } 
        fetchDiscount();
    }, [category])


    return{products, loading, error }


}


