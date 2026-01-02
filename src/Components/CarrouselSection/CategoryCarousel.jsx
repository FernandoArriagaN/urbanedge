import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCategoryProducts } from "../Hooks/useCategoryProducts";
import "./CategoryCarousel.css";
import { CategorySlide } from "./CategorySlide";

const CATEGORIES = [
  { key: "chair", label: "Chair" },
  { key: "sofa", label: "Sofa" },
  { key: "lamp", label: "Lamp" },
  { key: "table", label: "Table" }
];

export const CategoryCarousel = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef();
  const autoplayRef = useRef();


  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, 4000);

    return () => clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    gsap.to(sliderRef.current, {
      x: `-${index * 100}%`,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [index]);

  

  return (
    <section className="carousel">
      <h4>Best Sellers</h4>
      <div className="viewport">
        <div className="slider" ref={sliderRef}>
          {CATEGORIES.map((cat) => (
            <CategorySlide key={cat.key} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
