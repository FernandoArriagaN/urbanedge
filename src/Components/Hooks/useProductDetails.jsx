
import axios from "axios"
import { useEffect, useState } from "react"



export const useProductsDetils = (sku) => {

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://furniture-api.fly.dev/v1/products/${sku}`)
                setProduct(response.data.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        };
        fetchDetails();
    }, [sku])


    return{product, loading, error }


}


