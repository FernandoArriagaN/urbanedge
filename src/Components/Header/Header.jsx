import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import { useState } from 'react';
import { useSearch } from '../Hooks/useSearch';
import logoPage from './img/urbanedgeBlk.png'
import { useNavigate } from 'react-router-dom';
import { toggleCart } from '../store/slices/cartSlice';
import { toggleWishList } from '../store/slices/wishSlice';



export const Header = () => {


const[ searchTerm, setSearchTerm] = useState('')
const [serachQuery, setSearchQuery] = useState('')
const {products, loading} = useSearch(serachQuery)
const navigate = useNavigate()
const dispatch = useDispatch()
  
    const handleSearch =() => {
       setSearchQuery(searchTerm)
       setSearchOpen(true)
    }
const [searchOpen, setSearchOpen] = useState(false)    





const handleCloseSearch = () => {
    setSearchOpen(false)    
    setSearchTerm('')     
    setSearchQuery('')    
}
    


const cartItems = useSelector((state) => state.cart.items);
const totalQuantityCart = cartItems.reduce((sum, item) => sum +item.quantity, 0);


const wishItems = useSelector((state) => state.wish.wish);
const hasWishItems = wishItems.length > 0;

const handleClickProduct = (productSku) => {
    handleCloseSearch()
        navigate(`/product/${productSku}`)
    }



    const handleClickHome = () => {
        navigate(`/`)
    } 
    
 



    return(

        <section className='headerContainer'>
            <article className='searchContainer'>
                <input 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='SEARCH FOR FURNITURE...'
                    value={searchTerm}
                />
                <button className="searchIconBtn" onClick={handleSearch}>
                    <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </article>

            <img  loading="lazy"
            onClick={handleClickHome}
                className='logopageHome' 
                src={logoPage}
                alt='urbanEdgeLogo'/> 


            
        <nav className='iconsNavContainer'>
      
            <div className='iconWrapper' onClick={() => dispatch(toggleCart())}>
                <svg className="cartIcon" viewBox="0 0 20 20">
                    <path
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
                </svg>
                {totalQuantityCart > 0 && (
                    <span className='badgeCart'>{totalQuantityCart}</span>
                )}
            </div>


            <div className='iconWrapper' onClick={() => dispatch(toggleWishList())}>
                <svg className="wishIcon" viewBox="0 0 20 20">
                    <path fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                </svg>
                {hasWishItems && (
                    <span className='badgeWish'></span>
                )}
            </div>
        </nav>

            {searchOpen && (
            <div className="searchResultsContainer">
                <h4>Results for: {serachQuery} </h4>
                <button onClick={handleCloseSearch}>X</button> 
                <div className="resultsGrid">
                    {products.map(product => (
                        <article key={product.id}>
                            <img loading='lazy'
                                alt={product.name} 
                                src={product.image_path} 
                                onClick={() => handleClickProduct(product.sku)} />
                            <p>{product.name} </p>
                        </article>
                    ))}
                </div>
            </div>
            )}

        </section>




    )
}

