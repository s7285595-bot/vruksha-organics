"use client"

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: "1",
    name: "Organic Turmeric Powder",
    category: "Spices",
    price: 199,
    mrp: 249,
    rating: 4.6,
    reviewCount: 128,
    image: "/products/turmeric.jpg",
  },
  {
    id: "2",
    name: "Organic Honey",
    category: "Natural Sweeteners",
    price: 349,
    mrp: 449,
    rating: 4.8,
    reviewCount: 96,
    image: "/products/honey.jpg",
  },
  {
    id: "3",
    name: "Organic Cold Pressed Coconut Oil",
    category: "Oils",
    price: 299,
    mrp: 399,
    rating: 4.7,
    reviewCount: 84,
    image: "/products/coconut-oil.jpg",
  },
  {
    id: "4",
    name: "Organic Green Tea",
    category: "Tea",
    price: 249,
    mrp: 299,
    rating: 4.5,
    reviewCount: 73,
    image: "/products/green-tea.jpg",
  },
  {
    id: "5",
    name: "Organic Amla Powder",
    category: "Herbal",
    price: 179,
    mrp: 229,
    rating: 4.6,
    reviewCount: 61,
    image: "/products/amla.jpg",
  },
  {
    id: "6",
    name: "Organic Neem Powder",
    category: "Herbal",
    price: 159,
    mrp: 199,
    rating: 4.4,
    reviewCount: 48,
    image: "/products/neem.jpg",
  },
  {
    id: "7",
    name: "Organic Jaggery",
    category: "Natural Sweeteners",
    price: 189,
    mrp: 229,
    rating: 4.7,
    reviewCount: 102,
    image: "/products/jaggery.jpg",
  },
  {
    id: "8",
    name: "Organic Groundnut Oil",
    category: "Oils",
    price: 329,
    mrp: 399,
    rating: 4.8,
    reviewCount: 88,
    image: "/products/groundnut-oil.jpg",
  },
];

export default function ProductsPage() {
  return (
    <main className="products-page">
      <section className="products-section">

        <div className="products-header">
          <div>
            <span>VRUKSHA ORGANICS</span>
            <h1>Organic Products</h1>
          </div>

          <select defaultValue="featured">
            <option value="featured">
              Featured
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Customer Rating
            </option>
          </select>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>
    </main>
  );
}