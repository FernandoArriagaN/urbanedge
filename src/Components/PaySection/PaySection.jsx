import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, clearCart, addItem, decreaseQuantity } from "../store/slices/cartSlice";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./styles.css";

export const PaySection = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const containerRef = useRef();
    const [isPaid, setIsPaid] = useState(false); 

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;

    useEffect(() => {
        if (items.length > 0 && !isPaid) {
            const ctx = gsap.context(() => {
                gsap.from(".payItem", { x: -30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
                gsap.from(".orderSummary", { opacity: 0, y: 20, duration: 1, delay: 0.5, ease: "power2.out" });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [items.length, isPaid]);

 
    const createConfetti = () => {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);

            const color = ['#1a1a1a', '#d4af37', '#888', '#000'][Math.floor(Math.random() * 4)];
            gsap.set(confetti, {
                backgroundColor: color,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: Math.random() * 0.8 + 0.5
            });

            gsap.to(confetti, {
                duration: Math.random() * 2 + 1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight - 100,
                rotation: Math.random() * 360,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => confetti.remove()
            });
        }
    };

    const handleFinalizePayment = () => {
        
        gsap.to(containerRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                setIsPaid(true);
                dispatch(clearCart()); 
                createConfetti(); 
            }
        });
    };

   
    if (isPaid) {
        return (
            <div className="successPayment">
                <div className="successContent">
                    <div className="successIcon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h2>PAGO RECIBIDO</h2>
                    <p>Tu pedido ha sido procesado con éxito. Recibirás un correo de confirmación pronto.</p>
                    <button className="exploreBtn" onClick={() => navigate("/")}>
                        VOLVER A LA TIENDA
                    </button>
                </div>
            </div>
        );
    }

 
    if (items.length === 0) {
        return (
            <div className="emptyPay">
                <h2>EMPTY CART</h2>
                <p>Parece que aún no has añadido piezas a tu colección.</p>
                <button className="exploreBtn" onClick={() => navigate("/")}>EXPLORE</button>
            </div>
        );
    }

    return (
        <section className="payPage" ref={containerRef}>
            <div className="payTitle">
                <h1>Tu Cesta</h1>
                <button className="clearAllBtn" onClick={() => dispatch(clearCart())}>CLEAR CART</button>
            </div>

            <div className="payContent">
                <div className="payList">
                    {items.map((item) => (
                        <article key={item.id} className="payItem">
                            <div className="payItemImg">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="payItemInfo">
                                <div className="infoTop">
                                    <h3>{item.name}</h3>
                                    <button className="removeBtn" onClick={() => dispatch(removeItem(item.id))}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="itemPayRef">SKU: {item.id.toString().toUpperCase()}</p>
                                <div className="infoBottom">
                                    <div className="quantitySelector">
                                        <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(addItem(item))}>+</button>
                                    </div>
                                    <p className="itemPayPrice">${(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="orderSummary">
                    <div className="summaryCard">
                        <h3>Resumen Compra</h3>
                        <div className="summaryRow">
                            <span>Subtotal</span>
                            <span>${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summaryRow">
                            <span>Gastos de Envío</span>
                            <span>{shipping === 0 ? "Bonificado" : `$${shipping}`}</span>
                        </div>
                        <div className="summaryTotal">
                            <span>Total</span>
                            <span>${(subtotal + shipping).toLocaleString()}</span>
                        </div>
                        <button className="checkoutBtn" onClick={handleFinalizePayment}>
                            Finalizar Pedido
                        </button>
                        
                        <div className="paymentSecurity">
                            <p>PAGO SEGURO GARANTIZADO</p>
                            <div className="secureIcons">
                                <img alt="Paypal" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/Paypal_100px.png" />
                                <img alt="Mastercard" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/Mastercard.png" />
                                <img alt="Visa" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/Visa.png" />
                                <img alt="Apple pay" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/MicrosoftTeams-image_8.png" />
                                <img fetchpriority="auto" alt="Google pay" height="20" loading="lazy" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/MicrosoftTeams-image_7.png" decoding="auto" srcset=""></img>
                                                                <img fetchpriority="auto" alt="Amex" height="20" loading="lazy" src="https://d.media.kavehome.com/image/fetch/w_120,f_auto/https://media.kavehome.com/media/images/payments/AExpress.png" decoding="auto" srcset=""></img>

                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};