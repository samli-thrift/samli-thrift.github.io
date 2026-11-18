import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext, useMemo } from "react"; // NEW: useMemo

import SearchBar from "./SearchBar";
import { CartContext } from "../context/CartContext";
import { PageContext } from "../context/PageContext";
import { useProducts } from "../context/ProductsContext"; // NEW: same data Home and Shop use
import { buildFacets, normType } from "../lib/facets";     // NEW: shared helpers

import { WHATSAPP } from "../data/contact";

import "../scss/components/Navbar.scss";

// FIX: removed the hardcoded SHOP_MENU (tops, bottoms, dresses, jackets...).
// Those categories don't exist in your database, so those links led to empty
// pages. The menu is now built from real products inside Navbar() below.

// FIX: removed `WHATSAPP_LINK`. It was never used (the button already builds its
// link from WHATSAPP in ../data/contact) and it hardcoded a second phone number.

const MENU_CATEGORY_LIMIT = 6; // how many categories to list in the dropdown
const MENU_STYLE_LIMIT = 5;    // how many styles to list
const BUDGET_LIMIT = 5000;     // the "Under ₦5,000" link

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

  // NEW: real products (Navbar must sit inside <ProductsProvider>, like Shop and Home do)
  const { products } = useProducts();

  const [navOpen, setNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);

  // NEW: Shop dropdown built from what is actually for sale.
  // Links use lowercase values, which Shop matches case-insensitively.
  const shopMenu = useMemo(() => {
    const inStock = products.filter((p) => !p.soldOut);
    if (inStock.length === 0) return []; // still loading (or empty): show only "View all"

    const toLinks = (key, limit) =>
      buildFacets(inStock, key)
        .slice(0, limit)
        .map(({ value, label }) => ({
          label,
          to: `/shop?${key}=${encodeURIComponent(value)}`,
        }));

    const hasType = (t) => inStock.some((p) => normType(p.type) === t);

    const featured = [
      { label: "New Arrivals", to: "/shop?sort=new" },
      // Only offered when such items exist, so they never lead to an empty page
      hasType("slot") && { label: "Slots", to: "/shop?type=slot" },
      hasType("bale") && { label: "Bales", to: "/shop?type=bale" }, // FIX: was type=bales
      inStock.some((p) => p.price <= BUDGET_LIMIT) && {
        label: `Under ₦${BUDGET_LIMIT.toLocaleString("en-NG")}`,
        to: `/shop?max=${BUDGET_LIMIT}`,
      },
    ].filter(Boolean);

    return [
      { title: "Shop by Category", links: toLinks("category", MENU_CATEGORY_LIMIT) },
      { title: "Shop by Style", links: toLinks("style", MENU_STYLE_LIMIT) },
      { title: "Featured", links: featured },
    ].filter((group) => group.links.length > 0); // hide empty groups
  }, [products]);

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
                  {/* CHANGED: was SHOP_MENU.map(...), now the data-driven shopMenu */}
                  {shopMenu.map((group) => (
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