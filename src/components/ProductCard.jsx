

import ProductTemplate from '../assets/images/Kids.jpg';
import "../scss/components/ProductCard.scss";

function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-card-img">
        <img src={ProductTemplate} alt="product cart img" />
      </div>
      <div className="product-card-content">
        <p className="status">new</p>
        <div className="data">
          <h4 className="name">Baggy Boyfriend jeans</h4>
          {/* <p className="available">10 pieces</p> */}
        </div>
        <div className="buy">
          <p className="price">₦50,000</p>
          {/* <button
            className="more-details-btn"
            onClick={(e) => {
              e.preventDefault()
              // Do some navigation to /product-details?id:id
            }}
          >
            See more details...
          </button> */}
        </div>
        <div className="more">
          <button className="add-btn"><i className="fa fa-shopping-cart"></i>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard