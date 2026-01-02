import { useDispatch, useSelector } from "react-redux";
import { useProductsDetils } from "../Hooks/useProductDetails";
import { useLocation, useParams } from "react-router-dom";
import { addItem } from '../store/slices/cartSlice';
import { addWish, removeWish } from "../store/slices/wishSlice";
import { useEffect } from "react";
import gsap from "gsap"; 
import './styles.css'


export const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useProductsDetils(id);
    const wishItems = useSelector((state) => state.wish.wish)
    const isInWishList = (productId) => wishItems.some(item => item.id === productId)
    const location = useLocation();
    const discountData = location.state;
    const currentPrice = discountData?.hasDiscount ? discountData.finalPrice : product?.price;



    const handleAddCart = () => {
        dispatch(addItem({
            id: product.id,
            name: product.name,
            price: currentPrice, 
            image: product.image_path  
        }));
    };
    
    
    const handleToggleWish = (product) => {
        if (isInWishList(product.id)) {
            dispatch(removeWish(product.id));
        } else {
            dispatch(addWish(product));
        }
    };


   useEffect(() => {
    
    if (!loading && product) {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            
            tl.fromTo(".imgContainer", 
                { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, ease: "power4.inOut" }
            )
            .from(".priceDetails > *", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                immediateRender: false, 
                clearProps: "all"       
            }, "-=0.5")
            .from(".descriptionProducts", {
                opacity: 0,
                duration: 0.8,
                clearProps: "all"
            }, "-=0.2");
        });

        return () => ctx.revert(); 
    }
}, [loading, product]);

    if (loading) return <p className="loadingText">Cargando detalles...</p>;
    if (error) return <p className="errorText">Error al cargar el producto</p>;
    if (!product) return null; 

  

    return (
        <section className="detailsContainer">
            <article className="imgContainer">
                <img loading="lazy" 
                    src={product.image_path} 
                    alt={product.name} />
                <button className={`wishBtn ${isInWishList(product.id) ? 'filled' : ''}`}
                    onClick={(e) => {
                         e.stopPropagation();
                        handleToggleWish(product)}}>

                    <svg className="svg-icon" viewBox="0 0 20 20">
                        <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                    </svg>
                </button>
            </article>

            <article className="priceDetails">
                <h2>{product.name}</h2>
                    {discountData?.hasDiscount ? (
                        <div className="priceContainerDetail">
                            <p className="priceTag discount">$ {discountData.finalPrice}</p>
                            <p className="priceBefore">$ {discountData.originalPrice}</p>
                        </div>
                    ) : (
                        <p className="priceTag">$ {product.price}</p>
                    )}
             
                <button className="addBtn" onClick={handleAddCart}>Add to Cart</button>
            </article>

            <article className="descriptionProducts">
                <p className="mainDesc">{product.description}</p>
                
                <dl className="specs"> 
                    <dt>Dimensiones</dt>
                    <dd>Ancho: {product.dimensions?.width}cm</dd>
                    <dd>Alto: {product.dimensions?.height}cm</dd>
                    <dd>Fondo: {product.dimensions?.depth}cm</dd>
                </dl>

                <div className="materials">
                    <p><span>Madera:</span> {product.wood_type}</p>
                    <p><span>Acabado:</span> {product.finish}</p>
                </div>
            </article>
        </section>
    );
};