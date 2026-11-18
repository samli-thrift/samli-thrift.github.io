import { useContext } from "react";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react"; // NEW: icon for the slot badge
import { CartContext } from "../context/CartContext";
import "../scss/components/ProductCard.scss";

const formatPrice = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

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
    type,        // NEW: "slot" | "bale" | "single" (comes through productsApi.toProduct)
    piecesCount, // NEW: FIX: camelCase, because toProduct renames pieces_count -> piecesCount
  } = product;

  // NEW: only slots get a badge. startsWith also tolerates "Slot" / "slots".
  const isSlot = type?.toLowerCase().startsWith("slot");

  const { carts, addToCart } = useContext(CartContext);
  const inCart = carts.some((item) => item.id === id);

  // NEW: type + piecesCount travel with the cart item so the cart page can show them too
  const handleAddToCart = () =>
    addToCart({ id, name, price, image, status, size, condition, type, piecesCount });

  return (
    <article className={`product-card ${soldOut ? "is-sold-out" : ""}`}>
      <Link to={`/product-details?id=${id}`} className="product-card-img">
        <img src={image || "/placeholder.png"} alt={name} loading="lazy" />
        {/* FIX: this {soldOut ? ...} used to sit on the same line as <img>; moved to its own line */}
        {soldOut ? (
          <span className="status sold">Sold out</span>
        ) : (
          status && <span className="status">{status}</span>
        )}

        {/* NEW: slot badge, bottom-left of the image, e.g. "SLOT | 12 PCS" */}
        {isSlot && (
          <span className="slot-tag">
            <Layers size={12} aria-hidden="true" />
            Slot
            {piecesCount ? <b>{piecesCount} pcs</b> : null}
          </span>
        )}
      </Link>

      <div className="product-card-content">
        <h4 className="name">
          <Link to={`/product-details?id=${id}`}>{name}</Link>
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