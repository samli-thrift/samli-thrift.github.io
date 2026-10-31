

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../scss/components/ProductCard.scss";

const formatPrice = (n) => `₦${n.toLocaleString("en-NG")}`;

function ProductCard({ product }) {
  const {
    id,
    image,
    name,
    price,
    size,
    condition = "Good",
    status,
    soldOut = false,
  } = product;

  const { carts, addToCart } = useContext(CartContext);
  const inCart = carts.some((item) => item.id === id);

  const handleAddToCart = () =>
  addToCart({ id, name, price, image, status, size, condition });

  return (
    <article className={`product-card ${soldOut ? "is-sold-out" : ""}`}>
      <Link to={`/product-details?id=${id}`} className="product-card-img">
        <img src={image} alt={name} loading="lazy" />
        {soldOut ? (
          <span className="status sold">Sold out</span>
        ) : (
          status && <span className="status">{status}</span>
        )}
      </Link>

      <div className="product-card-content">
        <h4 className="name">
          <Link to={`/product-detLinkils?id=${id}`}>{name}</Link>
        </h4>

        <ul className="meta">
          {size && <li>Size {size}</li>}
          <li className={`grade grade-${condition.toLowerCase().replace(/\s+/g, "-")}`}>
            {condition}
          </li>
        </ul>

        <div className="buy">
          <p className="price">{formatPrice(price)}</p>
        </div>

        {inCart && !soldOut ? (
          <Link to="/cart" className="add-btn in-cart">
            <i className="fa fa-check" aria-hidden="true"></i>
            In cart · View cart
          </Link>
        ) : (
          <button
            type="button"
            className="add-btn"
            disabled={soldOut}
            onClick={handleAddToCart}
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            {soldOut ? "Unavailable" : "Add to Cart"}
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;


