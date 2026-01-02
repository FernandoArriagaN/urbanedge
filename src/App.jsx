import { Route, Routes } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { NewsProducts } from "./Components/NewsProducts/NewsProducts";
import { ProductDetailsPage } from "./Components/ProductDetailsPage/ProductsDetailsPage";
import { Cart } from "./Components/Cart/Cart";
import { WishList } from "./Components/WishList/WishList";
import './styles.css'
import { useSelector } from "react-redux";
import { DiscountSection } from "./Components/DiscountSection/DiscountSection";
import { CategoryCarousel } from "./Components/CarrouselSection/CategoryCarousel";
import { Footer } from "./Components/Footer/Footer";
import { PaySection } from "./Components/PaySection/PaySection";






const App = () =>  {
  
const isCartOpen = useSelector(state => state.cart.cartOpen);
const iswishListOpen = useSelector(state => state.wish.wishListOpen)

  return (
    <div className="App">
      <Header />
      {isCartOpen && <Cart />}
      {iswishListOpen && <WishList/>}
      
      <Routes>
        <Route path="/" element={
          <>
            <CategoryCarousel/>
            <DiscountSection />
            <NewsProducts />
          </>
        } />
        
        <Route path="product/:id" element={

          <ProductDetailsPage />
        } />
        <Route path="/PaySection" element= {
          <PaySection/>} />

      </Routes>
      <Footer/>
    </div>
  );
}


export default App;


