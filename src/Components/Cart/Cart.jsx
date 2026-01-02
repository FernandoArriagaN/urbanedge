import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseQuantity, toggleCart } from '../store/slices/cartSlice';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import gsap from "gsap";
import './styles.css';

export const Cart = () => { 
    const items = useSelector((state => state.cart.items));
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const cartRef = useRef();

    useEffect(() => {
        gsap.fromTo(cartRef.current, 
            { x: 500, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        );
    }, []);


    const closeWithAnimation = (callback) => {
        gsap.to(cartRef.current, {
            x: 500,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.in',
            onComplete: () => {
                dispatch(toggleCart());
                if (callback) callback();
            }
        });
    };

    const handleClose = () => closeWithAnimation();


    const handleGoToPay = () => {
        closeWithAnimation(() => {
            navigate("/PaySection"); 
        });
    };

    return (
        <aside className="cartContainer" ref={cartRef}>
            <button className="btnCloseCart" onClick={handleClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <h3 className="titleCart">Carrito</h3>

            {items.length === 0 ? (
                <p className="emptyMessage">Tu carrito está vacío</p>
            ) : (
                <div className="cartContent">
                    <div className="itemsScroll">
                        {items.map(item => (
                            <div className="elementeContainer" key={item.id}>
                                <img loading="lazy" 
                                    className="imgCart" 
                                    src={item.image} 
                                    alt={item.name} />
                                <div className="infoProduct">
                                    <p className="productName">{item.name}</p>
                                    <div className="quantity">
                                        <span onClick={() => dispatch(decreaseQuantity(item.id))}>—</span>
                                        <span>{item.quantity}</span>
                                        <span onClick={() => dispatch(addItem(item))}>+</span>
                                    </div>
                                </div>
                                <p className="itemPrice">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cartFooter">
                        <hr className="divider" />
                        <div className="summaryRow">
                            <span>Total Productos:</span>
                            <span>{totalQuantity}</span>
                        </div>
                        <div className="summaryRow total">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                      
                        <button className="btnPay" onClick={handleGoToPay}>
                            Proceder al pago
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
};