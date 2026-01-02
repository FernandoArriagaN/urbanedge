import { useNavigate } from "react-router-dom";
import { useCategoryProducts } from "../Hooks/useCategoryProducts";
import './styles.css';

export const DiscountSection = () => {
    const navigate = useNavigate();

    const handleClickProduct = (product) => {
    navigate(`/product/${product.sku}`, { 
        state: { 
            hasDiscount: true, 
            finalPrice: product.discount_price,
            originalPrice: product.price 
        } 
    });
}

    const { products } = useCategoryProducts('desk');

    return (
        <section className="discountContainer">
            <h3 className="discountTitle">Discount</h3>
            {products && products.map((product) => {
                const discountPercentage = Math.round(((product.price - product.discount_price) / product.price) * 100);

                return (
                    <article className="articleContainer" key={product.id}>
                        <div className="imageWrapper">
                            <img loading="lazy"
                                onClick={() => handleClickProduct(product)}
                                className="productImgDiscount" 
                                alt={product.name} 
                                src={product.image_path} 
                            />
                            <span className="discountPercentageTag">-{discountPercentage}%</span>
                        </div>
                        <div className="productInfo">
                            <h4 className="articleName">{product.name}</h4>
                            <div className="priceContainer">
                                <span className="priceDiscount">${product.discount_price}</span>
                                <span className="priceAfter">${product.price}</span>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
