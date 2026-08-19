import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const discountPercentage =
    product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : 0;

  return (
    <article className="product-card">

      <Link
        href={`/product/${product.id}`}
        className="product-card-link"
      >

        {/* IMAGE */}
        <div className="product-image-wrapper">

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
            className="product-image"
          />

          {/* DISCOUNT */}
          {discountPercentage > 0 && (
            <span className="product-discount">
              {discountPercentage}% OFF
            </span>
          )}

          {/* WISHLIST */}
          <button
            type="button"
            className="product-wishlist"
            aria-label={`Add ${product.name} to wishlist`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            ♡
          </button>

        </div>

        {/* PRODUCT INFO */}
        <div className="product-info">

          <span className="product-category">
            {product.category}
          </span>

          <h3 className="product-name">
            {product.name}
          </h3>

          <div className="product-rating">
            <span>★</span>

            {product.rating}

            <small>
              ({product.reviewCount})
            </small>
          </div>

          <div className="product-price">

            <strong>
              ₹{product.price}
            </strong>

            {product.mrp > product.price && (
              <del>
                ₹{product.mrp}
              </del>
            )}

          </div>

        </div>

      </Link>

    </article>
  );
}