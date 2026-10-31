import { NavLink } from "react-router-dom";
import '../scss/components/Footer.scss';

const socialLinks = [
  { href: "https://facebook.com/your-page", icon: "fa fa-facebook", label: "Facebook" },
  { href: "https://wa.me/234XXXXXXXXXX", icon: "fa fa-whatsapp", label: "Chat on WhatsApp" },
  { href: "tel:+234XXXXXXXXXX", icon: "fa fa-phone", label: "Call us" },
  { href: "https://instagram.com/your-handle", icon: "fa fa-instagram", label: "Instagram" },
];

const quickLinks = [
  { to: "/shop", icon: "fa fa-shopping-cart", text: "Shop now" },
  { to: "/find-us", icon: "fa fa-map-marker", text: "Visit us" },
  { to: "/#faqs", icon: "fa fa-question-circle", text: "FAQs" },
];

function Footer() {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      <div className="container">
        <div className="brand">
          <div className="logo">SamLi Thrift</div>
          <p className="tagline">Honestly graded thrift, delivered nationwide.</p>
        </div>

        <nav className="more-links" aria-label="Footer">
          {quickLinks.map((each) => (
            <NavLink to={each.to} key={each.to}>
              <i className={each.icon} aria-hidden="true"></i>
              {each.text}
            </NavLink>
          ))}
        </nav>

        <div className="connect">
          <p className="connect-title">Get in touch</p>
          <div className="links">
            {socialLinks.map((each) => (
              <a
                key={each.label}
                href={each.href}
                aria-label={each.label}
                {...(each.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <i className={each.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="copyright">
        © {thisYear} SamLi Thrift. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;