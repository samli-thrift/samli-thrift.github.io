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

  const handleAddToCart = () => {
    // TODO: hook into your cart (context / redux)
    console.log("Add to cart:", id);
  };

  return (
    <article className={`product-card ${soldOut ? "is-sold-out" : ""}`}>
      <a href={`/product-details?id=${id}`} className="product-card-img">
        <img src={image} alt={name} loading="lazy" />
        {soldOut ? (
          <span className="status sold">Sold out</span>
        ) : (
          status && <span className="status">{status}</span>
        )}
      </a>

      <div className="product-card-content">
        <h4 className="name">
          <a href={`/product-details?id=${id}`}>{name}</a>
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

        <button
          type="button"
          className="add-btn"
          disabled={soldOut}
          onClick={handleAddToCart}
        >
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          {soldOut ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;