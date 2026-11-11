import { Link } from 'react-router-dom';
import '../scss/components/Footer.scss';
import { WHATSAPP, PHONE, FACEBOOK, INSTAGRAM, ADDRESS, OPENING_HOURS } from '../data/contact';

const trust = [
  { icon: 'fa fa-truck', title: 'Nationwide delivery', text: 'Waybill to all 36 states' },
  { icon: 'fa fa-whatsapp', title: 'Order on WhatsApp', text: 'Chat, bargain, then pay' },
  { icon: 'fa fa-check-circle', title: 'Verified seller', text: 'Over four years trading' },
];

const shopLinks = [
  { to: '/shop', text: 'All products' },
  { to: '/shop?category=mens', text: 'Men' },
  { to: '/shop?category=womens', text: 'Women' },
  { to: '/shop?category=kids', text: 'Kids' },
  { to: '/shop?sort=new', text: 'New arrivals' },
];

const helpLinks = [
  { to: '/about', text: 'About us' },
  { to: '/#faqs', text: 'FAQs' },
  { to: '/find-us', text: 'Find us' },
  { to: '/contact', text: 'Contact' },
  { to: '/cart', text: 'Your cart' },
];

const socials = [
  { href: FACEBOOK, icon: 'fa fa-facebook', label: 'Facebook' },
  { href: `https://wa.me/${WHATSAPP}`, icon: 'fa fa-whatsapp', label: 'Chat on WhatsApp' },
  { href: INSTAGRAM, icon: 'fa fa-instagram', label: 'Instagram' },
  { href: `tel:${PHONE}`, icon: 'fa fa-phone', label: 'Call us' },
];

function Footer() {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      <div className="trust">
        <ul>
          {trust.map((t) => (
            <li key={t.title}>
              <i className={t.icon} aria-hidden="true"></i>
              <div>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="main">
        <div className="brand">
          <div className="logo">SamLi Thrift</div>
          <p className="tagline">Honestly graded thrift, delivered nationwide.</p>
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <i className={s.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        <nav className="col" aria-labelledby="footer-shop">
          <h3 id="footer-shop">Shop</h3>
          <ul>
            {shopLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.text}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="col" aria-labelledby="footer-help">
          <h3 id="footer-help">Help</h3>
          <ul>
            {helpLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.text}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="col contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <i className="fa fa-whatsapp" aria-hidden="true"></i>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </li>
            <li>
              <i className="fa fa-phone" aria-hidden="true"></i>
              <a href={`tel:${PHONE}`}>{PHONE}</a>
            </li>
            <li>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>{ADDRESS}</span>
            </li>
            <li>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              <span>{OPENING_HOURS}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">
        <span>© {thisYear} SamLi Thrift. All rights reserved.</span>
        <button
          type="button"
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
      </div>
    </footer>
  );
}

export default Footer;