import { useNavigate } from "react-router-dom";
import { useCategoryProducts } from "../Hooks/useCategoryProducts";

export const CategorySlide = ({ category }) => {
  const { products, loading } = useCategoryProducts(category.key);
  const navigate = useNavigate()
const handleClickProduct = (productSku) => {
    navigate(`/product/${productSku}`)
}  
  

  return (
    <div className="slide">
      <h2>{category.label}</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="products">
          {products.slice(0, 4).map((item) => (
            <article key={item.id}>
              <img loading="lazy" 
                onClick={() => handleClickProduct(item.sku)} 
                src={item.image_path} 
                alt={item.name} />
              <p>{item.name}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
