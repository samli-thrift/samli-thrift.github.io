import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";

import SearchBar from "./SearchBar";
import { CartContext } from "../context/CartContext";
import { PageContext } from "../context/PageContext";

import { WHATSAPP } from "../data/contact";

import "../scss/components/Navbar.scss";

// Placeholder links: swap the query values for your real categories
const SHOP_MENU = [
  {
    title: "Shop by Gender",
    links: [
      { label: "Men", to: "/shop?category=men" },
      { label: "Women", to: "/shop?category=women" },
      { label: "Kids", to: "/shop?category=kids" },
      { label: "Unisex", to: "/shop?category=unisex" },
    ],
  },
  {
    title: "Shop by Category",
    links: [
      { label: "Tops & Shirts", to: "/shop?category=tops" },
      { label: "Jeans & Trousers", to: "/shop?category=bottoms" },
      { label: "Dresses", to: "/shop?category=dresses" },
      { label: "Jackets & Coats", to: "/shop?category=jackets" },
      { label: "Hot and Trending", to: "/shop?style=hot" },
      { label: "Work Wear", to: "/shop?environment=work" },
    ],
  },
  {
    title: "Featured",
    links: [
      { label: "New Arrivals", to: "/shop?sort=new" },
      { label: "Slots", to: "/shop?type=slot" },
      { label: "Under ₦5,000", to: "/shop?max=5000" },
      { label: "Bundles & Bales", to: "/shop?type=bales" },
    ],
  },
];

const WHATSAPP_LINK = "https://wa.me/2348038849000";

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

function Navbar() {
  const { carts } = useContext(CartContext);
  const { updateTheme } = useContext(PageContext);
  const { pathname, search } = useLocation();

  const [navOpen, setNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);

  // Close everything when the route changes
  useEffect(() => {
    setNavOpen(false);
    setShopOpen(false);
  }, [pathname, search]);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  // Escape key, click outside, and auto-close drawer when resizing to desktop
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShopOpen(false);
        setNavOpen(false);
      }
    };
    const onClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target))
        setShopOpen(false);
    };
    const mq = window.matchMedia("(min-width: 900px)");
    const onResize = () => {
      if (mq.matches) setNavOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <header className="Navbar">
      <div className="topbar">
        Delivery to all 36 states · Order easily on WhatsApp
      </div>

      <div className="container">
        <Link to="/" className="logo">
          SamLi Thrift
        </Link>

        <nav id="main-nav" className={navOpen ? "open" : ""} aria-label="Main">
          <div className="search-mobile">
            <SearchBar classNames={["headerVersion"]} />
          </div>

          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li
              ref={shopRef}
              className={`has-dropdown ${shopOpen ? "open" : ""}`}
            >
              <div className="shop-row">
                <NavLink to="/shop">Shop</NavLink>
                <button
                  type="button"
                  className="chevron-btn"
                  aria-expanded={shopOpen}
                  aria-controls="shop-menu"
                  aria-label="Toggle shop menu"
                  onClick={() => setShopOpen((o) => !o)}
                >
                  <Chevron />
                </button>
              </div>

              <div className="dropdown" id="shop-menu">
                <div className="panel">
                  {SHOP_MENU.map((group) => (
                    <div className="group" key={group.title}>
                      <h3>{group.title}</h3>
                      <ul>
                        {group.links.map((l) => (
                          <li key={l.label}>
                            <Link to={l.to}>{l.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/shop" className="view-all">
                    View all products →
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          <a
            className="wa-btn"
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
          >
            CHAT ON WHATSAPP
          </a>
        </nav>

        <div className="search-desktop">
          <SearchBar classNames={["headerVersion"]} />
        </div>

        <div className="others">
          <button
            type="button"
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={updateTheme}
          >
            <span className="icon-sun"></span>
          </button>

          <NavLink
            to="/cart"
            className="icon-btn cart-btn"
            aria-label={`Cart, ${carts.length} items`}
          >
            <CartIcon />
            {carts.length > 0 && <span className="badge">{carts.length}</span>}
          </NavLink>

          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={navOpen}
            aria-controls="main-nav"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className={navOpen ? "icon-close" : "icon-menu"}></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
