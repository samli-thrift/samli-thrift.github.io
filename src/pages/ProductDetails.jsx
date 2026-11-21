import "../scss/pages/ProductDetails.scss";

import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { WHATSAPP } from "../data/contact.js";
import { useProducts } from "../context/ProductsContext";
import Loader from "../components/Loader";

const SITE_URL = "https://samlistores.com.ng";
const SITE_NAME = "SamLi Thrift";

const naira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;
const label = (c) => c.replace(/-/g, " ");

// Make any image path an absolute URL (needed for og:image)
const absUrl = (src) =>
  !src
    ? `${SITE_URL}/og-default.jpg`
    : /^https?:\/\//.test(src)
    ? src
    : new URL(src, SITE_URL).href;

const clip = (text, max = 155) =>
  text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;

const GRADES = {
  new: "Brand new, with or without tags.",
  "like new": "Worn once or twice. No visible wear.",
  good: "Gently used. Minor signs of wear only.",
  fair: "Visible wear. Flaws are shown in the photos.",
};

export default function ProductDetails() {
  const { products, loading } = useProducts();
  const [params] = useSearchParams();
  const id = params.get("id");
  const product = products.find((p) => String(p.id) === String(id));

  const { carts, addToCart } = useContext(CartContext);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  // New product: back to the top, first photo
  useEffect(() => {
    setActive(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) {
    return (
      <main className="ProductDetails">
        <Helmet>
          <title>Loading… | {SITE_NAME}</title>
        </Helmet>
        <section className="pd_main">
          <div className="container">
            <Loader label="Loading piece" />
          </div>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="ProductDetails">
        <Helmet>
          <title>Product not found | {SITE_NAME}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="pd_main">
          <div className="container">
            <div className="pd_missing">
              <i className="fa fa-question" aria-hidden="true" />
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
    name, price, size, condition = "Good", status,
    soldOut = false, description,
    category = [],
  } = product;
  const mainCategory = category[0];

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

  const askUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hello SamLi Thrift, I'm interested in "${name}" (${naira(price)}). Is it still available?`
  )}`;

  // ---------- Share ----------
  const shareUrl = `${SITE_URL}/product-details?id=${encodeURIComponent(product.id)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", shareUrl);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} | ${SITE_NAME}`,
          text: `${name} · ${naira(price)}`,
          url: shareUrl,
        });
      } catch (e) {
        if (e.name !== "AbortError") copyLink();
      }
      return;
    }
    copyLink();
  };

  // ---------- SEO ----------
  const seoTitle = `${name} | ${SITE_NAME}`;
  const seoDescription = clip(
    description?.trim() ||
      `${name}${size ? `, size ${size}` : ""}, ${condition.toLowerCase()} condition thrift ${
        mainCategory ? label(mainCategory) : "find"
      } for ${naira(price)}. Delivery to all 36 states in Nigeria.`
  );
  const seoImage = absUrl(gallery[0]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: gallery.map(absUrl),
    description: seoDescription,
    ...(mainCategory && { category: label(mainCategory) }),
    itemCondition:
      condition.toLowerCase() === "new"
        ? "https://schema.org/NewCondition"
        : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url: shareUrl,
      priceCurrency: "NGN",
      price: Number(price) || 0,
      availability: soldOut
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
    },
  };

  // ---------- Related ----------
  const available = products.filter(
    (p) => String(p.id) !== String(product.id) && !p.soldOut
  );

  const shares = (a = [], b = []) => a.some((x) => b.includes(x));

  const related = [
    ...available.filter((p) => shares(p.category, product.category)),
    ...available.filter(
      (p) => !shares(p.category, product.category) && shares(p.style, product.style)
    ),
    ...available.filter(
      (p) => !shares(p.category, product.category) && !shares(p.style, product.style)
    ),
  ].slice(0, 4);

  return (
    <main className="ProductDetails">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={shareUrl} />

        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:image:alt" content={name} />
        <meta property="product:price:amount" content={String(Number(price) || 0)} />
        <meta property="product:price:currency" content="NGN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
            {mainCategory && <span className="eyebrow">{label(mainCategory)}</span>}
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

              <button
                type="button"
                className="btn_link ghost"
                onClick={handleShare}
                aria-live="polite"
              >
                <i
                  className={`fa ${copied ? "fa-check" : "fa-share-alt"}`}
                  aria-hidden="true"
                />
                {copied ? "Link copied" : "Share"}
              </button>
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