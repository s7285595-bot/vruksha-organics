"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Address = {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};

type PaymentMethod =
  | "UPI"
  | "CARD"
  | "NETBANKING"
  | "COD";

const demoAddress: Address = {
  id: "1",
  name: "Your Name",
  phone: "9999999999",
  addressLine: "Your delivery address",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500001",
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [address, setAddress] =
    useState<Address>(demoAddress);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("UPI");

  const [giftVoucher, setGiftVoucher] =
    useState("");

  const [voucherApplied, setVoucherApplied] =
    useState(false);

  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem(
          "vruksha-checkout-items"
        );

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Could not load checkout items:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  // Temporary demo values.
  // These will later come from Spring Boot.
  const savings = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + Math.round(item.price * 0.1) * item.quantity,
      0
    );
  }, [items]);

  const tax = Math.round(
    (subtotal - savings) * 0.05
  );

  const deliveryCharge =
    subtotal >= 499 ? 0 : 40;

  const voucherDiscount =
    voucherApplied ? 100 : 0;

  const total =
    subtotal -
    savings -
    voucherDiscount +
    tax +
    deliveryCharge;

  const estimatedDate = new Date();

  estimatedDate.setDate(
    estimatedDate.getDate() + 3
  );

  const formattedDate =
    estimatedDate.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
    );

  const applyVoucher = () => {
    if (
      giftVoucher.trim().toUpperCase() ===
      "VRUKSHA100"
    ) {
      setVoucherApplied(true);
    } else {
      setVoucherApplied(false);
    }
  };

  const handleChangeAddress = () => {
    const name = window.prompt(
      "Enter your name",
      address.name
    );

    const phone = window.prompt(
      "Enter phone number",
      address.phone
    );

    const addressLine = window.prompt(
      "Enter address",
      address.addressLine
    );

    const city = window.prompt(
      "Enter city",
      address.city
    );

    const state = window.prompt(
      "Enter state",
      address.state
    );

    const pincode = window.prompt(
      "Enter PIN code",
      address.pincode
    );

    if (
      name &&
      phone &&
      addressLine &&
      city &&
      state &&
      pincode
    ) {
      setAddress({
        ...address,
        name,
        phone,
        addressLine,
        city,
        state,
        pincode,
      });
    }
  };

  const handleAddAddress = () => {
    handleChangeAddress();
  };

  const handlePayment = () => {
    /*
      Temporary frontend behavior.

      Later this button will call your
      Spring Boot payment API and create
      the order only after verified payment.
    */
    alert(
      `Payment flow starting for ₹${total.toLocaleString(
        "en-IN"
      )} using ${paymentMethod}.`
    );
  };

  if (!loaded) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <h1>Checkout</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <h1>Checkout</h1>

          <p>
            No items selected for checkout.
          </p>

          <Link href="/cart">
            ← Back to Cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-title">
          <span>
            VRUKSHA ORGANICS
          </span>

          <h1>
            Checkout
          </h1>
        </div>

        <div className="checkout-layout">

          {/* LEFT SIDE */}

          <div className="checkout-main">

            {/* ADDRESS */}

            <section className="checkout-card">

              <div className="checkout-card-header">
                <div>
                  <span>1</span>
                  <h2>
                    Delivery Address
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    handleChangeAddress
                  }
                >
                  CHANGE
                </button>
              </div>

              <div className="checkout-address">

                <strong>
                  {address.name}
                </strong>

                <p>
                  {address.addressLine}
                </p>

                <p>
                  {address.city},{" "}
                  {address.state}{" "}
                  {address.pincode}
                </p>

                <p>
                  Phone: {address.phone}
                </p>

              </div>

              <button
                type="button"
                className="add-address-button"
                onClick={
                  handleAddAddress
                }
              >
                + ADD NEW ADDRESS
              </button>

            </section>


            {/* DELIVERY DATE */}

            <section className="checkout-card">

              <div className="checkout-card-header">
                <div>
                  <span>2</span>
                  <h2>
                    Delivery
                  </h2>
                </div>
              </div>

              <div className="delivery-date-box">

                <strong>
                  Arriving by{" "}
                  {formattedDate}
                </strong>

                <p>
                  Estimated delivery date
                </p>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="checkout-card">

              <div className="checkout-card-header">
                <div>
                  <span>3</span>
                  <h2>
                    Payment Method
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(
                        "payment-methods"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  CHANGE
                </button>
              </div>

              <div className="selected-payment">

                <strong>
                  {paymentMethod}
                </strong>

                <p>
                  Selected payment method
                </p>

              </div>

              <div
                id="payment-methods"
                className="payment-methods"
              >

                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={
                      paymentMethod === "UPI"
                    }
                    onChange={() =>
                      setPaymentMethod("UPI")
                    }
                  />

                  <span>
                    UPI
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={
                      paymentMethod === "CARD"
                    }
                    onChange={() =>
                      setPaymentMethod("CARD")
                    }
                  />

                  <span>
                    Credit / Debit Card
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={
                      paymentMethod ===
                      "NETBANKING"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "NETBANKING"
                      )
                    }
                  />

                  <span>
                    Net Banking
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={
                      paymentMethod === "COD"
                    }
                    onChange={() =>
                      setPaymentMethod("COD")
                    }
                  />

                  <span>
                    Cash on Delivery
                  </span>
                </label>

              </div>

            </section>


            {/* GIFT VOUCHER */}

            <section className="checkout-card">

              <div className="checkout-card-header">
                <div>
                  <span>4</span>
                  <h2>
                    Gift Voucher
                  </h2>
                </div>
              </div>

              <div className="voucher-row">

                <input
                  value={giftVoucher}
                  onChange={(event) =>
                    setGiftVoucher(
                      event.target.value
                    )
                  }
                  placeholder="Enter gift voucher"
                />

                <button
                  type="button"
                  onClick={
                    applyVoucher
                  }
                >
                  APPLY
                </button>

              </div>

              {voucherApplied && (
                <p className="voucher-success">
                  Voucher applied. ₹100 saved.
                </p>
              )}

            </section>


            {/* ITEMS */}

            <section className="checkout-card">

              <div className="checkout-card-header">
                <div>
                  <span>5</span>
                  <h2>
                    Your Items
                  </h2>
                </div>
              </div>

              <div className="checkout-product-list">

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="checkout-product"
                  >

                    <div className="checkout-product-image">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      ) : null}
                    </div>

                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <p>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        × {item.quantity}
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>
                ))}

              </div>

            </section>

          </div>


          {/* RIGHT SIDE SUMMARY */}

          <aside className="checkout-summary-card">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-summary-row">

              <span>
                Items
              </span>

              <strong>
                {items.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </strong>

            </div>

            <div className="checkout-summary-row">

              <span>
                Item subtotal
              </span>

              <strong>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="checkout-summary-row savings">

              <span>
                You save
              </span>

              <strong>
                -₹
                {savings.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            {voucherApplied && (
              <div className="checkout-summary-row savings">

                <span>
                  Gift voucher
                </span>

                <strong>
                  -₹100
                </strong>

              </div>
            )}

            <div className="checkout-summary-row">

              <span>
                Tax
              </span>

              <strong>
                ₹
                {tax.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <div className="checkout-summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </strong>

            </div>

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <button
              type="button"
              className="checkout-pay-button"
              onClick={
                handlePayment
              }
            >
              {paymentMethod === "COD"
                ? "PLACE ORDER"
                : `PAY ₹${total.toLocaleString(
                    "en-IN"
                  )}`}
            </button>

            <p className="checkout-security">
              🔒 Secure checkout
            </p>

          </aside>

        </div>

      </div>
    </main>
  );
}