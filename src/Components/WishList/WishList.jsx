import { useDispatch, useSelector } from "react-redux";
import { removeWish, toggleWishList } from "../store/slices/wishSlice";
import './styles.css'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export const WishList = ({ setVisible }) => {
    const wishes = useSelector((state) => state.wish.wish || []);
    const dispatch = useDispatch();
    const wishListRef = useRef();
    const navigate = useNavigate()
    const handleClickProduct = (productSku) => {
        navigate(`/product/${productSku}`)
    } 
    useEffect(() => {
        
        gsap.fromTo(wishListRef.current, 
            { x: 100, opacity: 0, backdropFilter: "blur(0px)" },
            { x: 0, opacity: 1, backdropFilter: "blur(15px)", duration: 0.8, ease: 'power3.out' }
        );

       
        if (wishes.length > 0) {
            gsap.fromTo(".wishItem", 
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
            );
        }
    }, []);

    const handleClose = () => {
        gsap.to(wishListRef.current, {
            x: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
                dispatch(toggleWishList());
            }
        });
    };

    return (
        <section className="wishListContainer" ref={wishListRef}>
            <button className="btnCloseWish" onClick={handleClose}>✕</button>
            
            <h3 className="wishTitle">Mi Wishlist</h3>
            
            {wishes.length === 0 ? (
                <div className="emptyWish">
                    <p>Tu lista está esperando ser llenada</p>
                </div>
            ) : (
                <div className="wishGrid">
                    {wishes.map(wish => (
                        <article className="wishItem" key={wish.id}>
                            <div className="wishImageContainer">
                                <img onClick={() => handleClickProduct(wish.sku)}
                                    loading="lazy" 
                                    alt={wish.name} 
                                    src={wish.image_path} />
                                
                            </div>
                            <div className="wishInfo">
                                <p className="wishName">{wish.name}</p>
                            </div>
                            <div>
                                <button 
                                    className="btnRemoveWish" 
                                    onClick={() => dispatch(removeWish(wish.id))}>
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};