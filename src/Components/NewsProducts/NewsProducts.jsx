import { useDispatch, useSelector } from "react-redux";
import { useNewsProducts } from "../Hooks/useNewsProducts"
import './styles.css'
import { useNavigate } from "react-router-dom";
import { addWish, removeWish } from "../store/slices/wishSlice";





export const NewsProducts = () => {
const navigate = useNavigate()
const {products} = useNewsProducts()    
const dispatch = useDispatch()
const handleClickProduct = (productSku) => {
    navigate(`/product/${productSku}`)
}    
 
    const wishItems = useSelector((state) => state.wish.wish)
    const isInWishList = (productId) => wishItems.some(item => item.id === productId)
    
    const handleToggleWish = (product) => {
    if (isInWishList(product.id)) {
        dispatch(removeWish(product.id));
    } else {
        dispatch(addWish(product));
    }
};


    return(
        <section className="newsContainer" >
            <h3 title="newsTitle">NewsProducts</h3>
            <div className="newProductsContainer">
            {products.map((product) => (
                <article className="backImage" 
                key={product.id}
                >

                <div className="imgPRoductContainer"
                    onClick={() => handleClickProduct(product.sku)} 
                    style={{
                    backgroundImage: `url(${product.image_path})`,
                    backgroundSize: 'cover',       
                    backgroundPosition: 'center',  
                    backgroundRepeat: 'no-repeat',
                    width: '100%', 
                    height: '20vw',
                }}>
                    <svg
                    className={`heartIcon ${isInWishList(product.id) ? 'filled' : ''}`}
                    onClick={(e) => {
                         e.stopPropagation();
                        handleToggleWish(product)}}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                 
                    <path
                        className="heart-outline"
                        d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                        2 5.42 4.42 3 7.5 3
                        9.24 3 10.91 3.81 12 5.08
                        13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5
                        22 12.28 18.6 15.36 13.45 20.04
                        l-1.452 1.31z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />

         
                    <path
                        className="heart-fill"
                        d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                        2 5.42 4.42 3 7.5 3
                        9.24 3 10.91 3.81 12 5.08
                        13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5
                        22 12.28 18.6 15.36 13.45 20.04
                        l-1.452 1.31z"
                    />
                </svg>

                </div>
                
                <div className="detailsProduct">
                    <p className="productNewsName">{product.name} </p>
                
               <p className="productPriceNews"> ${product.price} </p>
                </div>
                
            </article>
            ))}
            </div>
        </section>
    )
}



