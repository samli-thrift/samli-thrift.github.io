
import "../scss/pages/Cart.scss";


import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// Replace with the shop's WhatsApp number: country code, no "+" or spaces
const WHATSAPP_NUMBER = '234XXXXXXXXXX';

const naira = n => `₦${Number(n).toLocaleString('en-NG')}`;

export default function Cart() {
  const { carts, setQty, removeFromCart, clearCart, count, subtotal } =
    useContext(CartContext);

  const buildMessage = () => {
    const lines = carts.map(
      i => `• ${i.name} x${(i.qty || 1)} (${naira(i.price * (i.qty || 1))})`
    );
    return [
      'Hello SamLi Thrift, I would like to order:',
      '',
      ...lines,
      '',
      `Subtotal: ${naira(subtotal)}`,
      '',
      'Please confirm availability and delivery cost to my state.',
    ].join('\n');
  };

  const checkoutUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildMessage()
  )}`;

  return (
    <main className="Cart">
      <section className="cart_head">
        <div className="container">
          <h1>Your cart</h1>
          <p>
            {count > 0
              ? `${count} ${count === 1 ? 'item' : 'items'} ready to order`
              : 'Nothing here yet'}
          </p>
        </div>
      </section>

      <section className="cart_body">
        <div className="container">
          {carts.length === 0 ? (
            <div className="cart_empty">
              <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
              <h2>Your cart is empty</h2>
              <p>Browse the shop and add the pieces you like.</p>
              <Link to="/shop" className="btn_link">
                Go to shop
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart_list">
                {carts.map(item => (
                  <li key={item.id} className="cart_item">
                    <img src={item.image} alt={item.name} loading="lazy" />

                    <div className="info">
                      <h3>{item.name}</h3>
                      {item.status && <span className="status">{item.status}</span>}
                      <strong className="unit">{naira(item.price)}</strong>
                    </div>

                    <div className="controls">
                      <div className="qty" role="group" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, (item.qty || 1) - 1)}
                          disabled={(item.qty || 1) <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span aria-live="polite">{(item.qty || 1)}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, (item.qty || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <strong className="line">{naira(item.price * (item.qty || 1))}</strong>
                      <button
                        type="button"
                        className="remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="cart_summary">
                <h2>Order summary</h2>

                <dl>
                  <div>
                    <dt>Items</dt>
                    <dd>{count}</dd>
                  </div>
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{naira(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>Agreed on WhatsApp</dd>
                  </div>
                </dl>

                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn_link checkout"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                  Order on WhatsApp
                </a>

                <p className="how">
                  We confirm availability, agree the price and delivery cost with you,
                  then you pay. Orders ship by waybill to all 36 states.
                </p>

                <div className="secondary">
                  <Link to="/shop">Continue shopping</Link>
                  <button type="button" onClick={clearCart}>
                    Clear cart
                  </button>
                </div>
              </aside>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
