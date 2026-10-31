import "../scss/pages/ProductDetails.scss";

import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import {products} from "../data/products"; // adjust to your products file

// Same number as Cart.jsx
const WHATSAPP_NUMBER = "2348038849000";

const naira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;
const label = (c) => c.replace(/-/g, " ");

const GRADES = {
  new: "Brand new, with or without tags.",
  "like new": "Worn once or twice. No visible wear.",
  good: "Gently used. Minor signs of wear only.",
  fair: "Visible wear. Flaws are shown in the photos.",
};

export default function ProductDetails() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const product = products.find((p) => String(p.id) === String(id));

  const { carts, addToCart } = useContext(CartContext);
  const [active, setActive] = useState(0);

  // New product: back to the top, first photo
  useEffect(() => {
    setActive(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  // Page title
  useEffect(() => {
    document.title = product
      ? `${product.name} | SamLi Thrift`
      : "Product not found | SamLi Thrift";
  }, [product]);

  if (!product) {
    return (
      <main className="ProductDetails">
        <section className="pd_main">
          <div className="container">
            <div className="pd_missing">
              <i className="fa-solid fa-circle-question" aria-hidden="true" />
              <h1>We couldn't find that piece</h1>
              <p>It may have sold or the link may be wrong.</p>
              <Link to="/shop" className="btn_link">
                Back to shop
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const {
    name,
    price,
    size,
    condition = "Good",
    status,
    soldOut = false,
    description,
    category,
  } = product;

  const gallery = product.images?.length ? product.images : [product.image];
  const inCart = carts.some((i) => String(i.id) === String(product.id));
  const gradeNote = GRADES[condition.toLowerCase()];

  const handleAdd = () =>
    addToCart({
      id: product.id,
      name,
      price,
      image: product.image,
      status,
      size,
      condition,
    });

  const askUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello SamLi Thrift, I'm interested in "${name}" (${naira(price)}). Is it still available?`
  )}`;

  const available = products.filter(
    (p) => String(p.id) !== String(product.id) && !p.soldOut
  );

  const related = [
    ...available.filter((p) => p.category === category),
    ...available.filter((p) => p.category !== category && p.style === product.style),
    ...available.filter((p) => p.category !== category && p.style !== product.style),
  ].slice(0, 4);

  return (
    <main className="ProductDetails">
      <nav className="pd_crumbs" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <strong>{name}</strong>
        </div>
      </nav>

      <section className="pd_main">
        <div className="container">
          <div className="pd_gallery">
            <div className="pd_photo">
              <img src={gallery[active]} alt={name} />
              {soldOut ? (
                <span className="badge sold">Sold out</span>
              ) : (
                status && <span className="badge">{status}</span>
              )}
            </div>

            {gallery.length > 1 && (
              <ul className="pd_thumbs">
                {gallery.map((src, i) => (
                  <li key={src + i}>
                    <button
                      type="button"
                      className={i === active ? "on" : ""}
                      onClick={() => setActive(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-current={i === active}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pd_info">
            {category && <span className="eyebrow">{label(category)}</span>}
            <h1>{name}</h1>
            <p className="price">{naira(price)}</p>

            <ul className="pd_meta">
              {size && (
                <li>
                  <span>Size</span>
                  <strong>{size}</strong>
                </li>
              )}
              <li>
                <span>Condition</span>
                <strong
                  className={`grade grade-${condition
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {condition}
                </strong>
              </li>
            </ul>

            {gradeNote && <p className="grade_note">{gradeNote}</p>}
            {description && <p className="desc">{description}</p>}

            <div className="pd_actions">
              {soldOut ? (
                <button type="button" className="btn_link" disabled>
                  Sold out
                </button>
              ) : inCart ? (
                <Link to="/cart" className="btn_link in-cart">
                  <i className="fa fa-check" aria-hidden="true" />
                  In cart · View cart
                </Link>
              ) : (
                <button type="button" className="btn_link" onClick={handleAdd}>
                  <i className="fa fa-shopping-cart" aria-hidden="true" />
                  Add to Cart
                </button>
              )}

              <a
                href={askUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn_link ghost"
              >
                <i className="fa fa-whatsapp" aria-hidden="true" />
                Ask about this piece
              </a>
            </div>

            <ul className="pd_assure">
              <li>
                <i className="fa fa-truck" aria-hidden="true" />
                Delivery by waybill to all 36 states
              </li>
              <li>
                <i className="fa fa-comments" aria-hidden="true" />
                Confirm, bargain and pay on WhatsApp
              </li>
              <li>
                <i className="fa fa-search" aria-hidden="true" />
                Honest grading, flaws shown in photos
              </li>
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pd_related">
          <div className="container">
            <h2>You may also like</h2>
            <div className="grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}