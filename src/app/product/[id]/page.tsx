"use client";

import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/CartProvider";

const products = [
  {
    id: "1",
    name: "Organic Jaggery",
    category: "Sweeteners",
    price: 180,
    mrp: 220,
    rating: 4.7,
    reviewCount: 128,
    image: "/products/jaggery.jpg",
    description:
      "Natural organic jaggery made from traditionally processed sugarcane. No artificial colours or preservatives.",
  },
  {
    id: "2",
    name: "Cold Pressed Groundnut Oil",
    category: "Cooking Oils",
    price: 320,
    mrp: 380,
    rating: 4.8,
    reviewCount: 96,
    image: "/products/groundnut-oil.jpg",
    description:
      "Pure cold pressed groundnut oil made from carefully selected groundnuts.",
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const {
    addToCart,
      setBuyNowItem,
  } = useCart();

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return (
      <main className="product-details-page">
        <h1>Product not found</h1>
      </main>
    );
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  // ADD TO CART
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
  };

  // BUY NOW
 const handleBuyNow = () => {
  setBuyNowItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
  });

  router.push("/checkout");
};
  return (
    <main className="product-details-page">
       <div className="product-back-wrapper">
    <button
      type="button"
      className="product-back-button"
      onClick={() => router.back()}
    >
      ← Back
    </button>
  </div>

      <div className="product-details-container">

        {/* IMAGE */}

        <div className="product-details-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>

        {/* INFORMATION */}

        <div className="product-details-info">

          <span className="product-details-category">
            {product.category}
          </span>

          <h1>
            {product.name}
          </h1>

          <div className="product-details-rating">
            ★ {product.rating} ({product.reviewCount} reviews)
          </div>

          <div className="product-details-price">

            <strong>
              ₹{product.price}
            </strong>

            <del>
              ₹{product.mrp}
            </del>

            <span>
              {discount}% OFF
            </span>

          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          {/* QUANTITY */}

          <div className="quantity-section">

            <span>
              Quantity
            </span>

            <div className="quantity-controls">

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    current + 1
                  )
                }
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

          {/* ADD TO CART */}

          <button
            type="button"
            className="product-details-cart"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>

          {/* BUY NOW */}

          <button
            type="button"
            className="product-details-buy"
            onClick={handleBuyNow}
          >
            BUY NOW
          </button>

        </div>
      </div>

      {/* DESCRIPTION */}

      <section className="product-description-section">

        <h2>
          About this product
        </h2>

        <p>
          {product.description}
        </p>

        <h2>
          Customer Reviews
        </h2>

        <p>
          ★★★★★ Customers love the quality
          and natural taste of this product.
        </p>

      </section>

    </main>
  );
}