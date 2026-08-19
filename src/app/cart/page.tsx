"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/CartProvider";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // IDs of items currently selected for checkout
 const [selectedIds, setSelectedIds] =
  useState<string[]>([]);

  // When cart loads, select all items by default
  useEffect(() => {
    setSelectedIds((currentSelected) => {
      if (currentSelected.length > 0) {
        return currentSelected.filter((id) =>
          cartItems.some((item) => item.id === id)
        );
      }

      return cartItems.map((item) => item.id);
    });
  }, [cartItems]);

  // -----------------------------------------
  // TOGGLE ONE ITEM
  // -----------------------------------------

  const toggleItem = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  // -----------------------------------------
  // SELECT ALL
  // -----------------------------------------

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) =>
      selectedIds.includes(item.id)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        cartItems.map((item) => item.id)
      );
    }
  };

  // -----------------------------------------
  // SELECTED ITEMS
  // -----------------------------------------

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  const selectedCount = selectedItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // -----------------------------------------
  // SUBTOTAL
  // -----------------------------------------

  const subtotal = selectedItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 0;

  const grandTotal =
    subtotal + deliveryCharge;

  // -----------------------------------------
  // PROCEED TO BUY
  // -----------------------------------------

  const handleProceedToBuy = () => {
    if (selectedItems.length === 0) {
      return;
    }

    sessionStorage.setItem(
      "vruksha-checkout-items",
      JSON.stringify(selectedItems)
    );

    router.push("/checkout");
  };

  // -----------------------------------------
  // EMPTY CART
  // -----------------------------------------

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>
            Your Cart Is Empty
          </h1>

          <p>
            Add some organic products to your
            cart and come back here.
          </p>

          <Link
            href="/"
            className="cart-continue-button"
          >
            CONTINUE SHOPPING
          </Link>

        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-container">

        {/* HEADER */}

        <div className="cart-header">

          <div>
           
            <p>
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}{" "}
              items in your cart
            </p>
          </div>

          {/* SELECT ALL */}

          <label className="cart-select-all">

            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />

            <span>
              Select all
            </span>

          </label>

        </div>

        {/* MAIN */}

        <div className="cart-layout">

          {/* ITEMS */}

          <section className="cart-items">

            {cartItems.map((item) => {

              const isSelected =
                selectedIds.includes(item.id);

              return (
                <article
                  className={`cart-item ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  key={item.id}
                >

                  {/* CHECKBOX */}

                  <div className="cart-item-checkbox">

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        toggleItem(item.id)
                      }
                    />

                  </div>

                  {/* IMAGE */}

                  <div className="cart-item-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div>
                        Product
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="cart-item-details">

                    <span className="cart-item-category">
                      Organic Product
                    </span>

                    <h2>
                      {item.name}
                    </h2>

                    <div className="cart-item-price">
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </div>

                    {/* QUANTITY */}

                    <div className="cart-item-quantity-row">

                      <span>
                        Quantity
                      </span>

                      <div className="cart-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => {
                        removeFromCart(item.id);

                        setSelectedIds(
                          (current) =>
                            current.filter(
                              (id) =>
                                id !== item.id
                            )
                        );
                      }}
                    >
                      Remove
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <div className="cart-item-total">

                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>

                </article>
              );
            })}

          </section>

          {/* SUMMARY */}

          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="cart-summary-row">

              <span>
                Cart items
              </span>

              <strong>
                {cartItems.reduce(
                  (total, item) =>
                    total +
                    item.quantity,
                  0
                )}
              </strong>

            </div>

            <div className="cart-summary-row">

              <span>
                Selected items
              </span>

              <strong>
                {selectedCount}
              </strong>

            </div>

            <div className="cart-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="cart-summary-row">

              <span>
                Delivery
              </span>

              <strong>
                FREE
              </strong>

            </div>

            <div className="cart-summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {grandTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <button
              type="button"
              className="cart-proceed-button"
              disabled={
                selectedItems.length === 0
              }
              onClick={
                handleProceedToBuy
              }
            >
              PROCEED TO BUY
            </button>

            {selectedItems.length === 0 && (
              <p className="cart-selection-warning">
                Select at least one item to
                continue.
              </p>
            )}

          </aside>

        </div>

      </div>

    </main>
  );
}