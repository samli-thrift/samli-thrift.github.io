import { useId, useMemo, useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import HeroImg from "../assets/images/kids.jpg";

import "../scss/pages/Shop.scss";
import "../scss/components/Searchbar.scss"; // SearchBar.jsx used to import this for us
import { DropdownField } from "../components/InputField.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useProducts } from "../context/ProductsContext";

const options = {
  category: [
    { value: "all", label: "All" },
    { value: "men", label: "Men's" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kid's" },
    { value: "unisex", label: "Unisex" },
    { value: "babies", label: "Babies'" },
    { value: "girl", label: "Girl's" },
    { value: "underwear", label: "Underwear" },
    { value: "swimwear", label: "Swimwear" },
    { value: "night-wear", label: "Nightwear" },
  ],
  style: [
    { value: "all", label: "All" },
    { value: "hot", label: "Hot" },
    { value: "sexy", label: "Sexy" },
    { value: "punk", label: "Punk" },
    { value: "trending", label: "Trending" },
  ],
  environment: [
    { value: "all", label: "All" },
    { value: "everywhere", label: "Everywhere" },
    { value: "work", label: "Work" },
    { value: "school", label: "School" },
    { value: "casual", label: "Casual" },
  ],
};

// "environment" -> "Environment"
const toLabel = (key) => key.charAt(0).toUpperCase() + key.slice(1);

function Shop() {
  const [params, setParams] = useSearchParams();
  const searchId = useId();
  const searchRef = useRef(null);
  
  const { products, loading, error } = useProducts();

  // { category: "all", style: "all", environment: "all" } built from the options keys
  const values = Object.fromEntries(
    Object.keys(options).map((key) => [key, params.get(key) ?? "all"])
  );
  const query = params.get("q") ?? "";

  function updateParam(key, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  }

  const handleReset = () => setParams({}, { replace: true });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchRef.current?.blur(); // closes the mobile keyboard
  };

  const results = useMemo(() => {
    const q = (params.get("q") ?? "").trim().toLowerCase();
    const get = (key) => params.get(key) ?? "all";
    return products
      .filter(
        (p) =>
          (get("category") === "all" || p.category.includes(get("category"))) &&
          (get("style") === "all" || p.style.includes(get("style"))) &&
          (get("environment") === "all" ||
            p.environment === get("environment") ||
            p.environment === "everywhere") &&
          (!q || p.name.toLowerCase().includes(q))
      )
      // available items first, sold-out last
      .sort((a, b) => Number(!!a.soldOut) - Number(!!b.soldOut));
  }, [params, products]);

  return (
    <main className="Shop shop-page">
      <section className="shop_hero hero">
        <div className="container">
          <div className="hero_img">
            <img src={HeroImg} alt="Thrift clothes on display" />
          </div>
          <div className="hero_content">
            <h1 className="slogan">
              <span className="special">Explore</span> our <span className="special">Store</span>
            </h1>
            <p>Discover incredible pieces that match your style and fit your budget</p>
            <div className="cta">
              <a href="#products">Browse the store</a>
              <NavLink to="/contact">Contact Us</NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="filter-header" aria-labelledby="filter-title">
        <div className="container">
          <form role="search" className="filter-form" onSubmit={handleSearchSubmit}>
            <h2 id="filter-title" className="filter-title">
              Find your next favourite piece
            </h2>

            <div className="Searchbar filtervariation">
              <input
                ref={searchRef}
                id={searchId}
                type="search"
                name="q"
                value={query}
                placeholder="Search SamLi..."
                aria-label="Search products"
                autoComplete="off"
                enterKeyHint="search"
                onChange={(e) => updateParam("q", e.target.value)}
              />

              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => updateParam("q", "")}
                >
                  <i className="icon-close" aria-hidden="true"></i>
                </button>
              )}

              <button type="submit" className="search-btn" aria-label="Search">
                <i className="icon-search1" aria-hidden="true"></i>
              </button>
            </div>

            <div className="filters">
              {Object.entries(options).map(([name, opts]) => (
                <DropdownField
                  key={name}
                  label={toLabel(name)}
                  name={name}
                  value={values[name]}
                  options={opts}
                  onChange={updateParam}
                  classNames={["filter"]}
                />
              ))}
              <button type="button" className="clear-btn" onClick={handleReset}>
                Clear filters
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="products" id="products" aria-label="Products">
        <div className="container">
          {loading ? (
            <p className="results-count">Loading pieces…</p>
          ) : error ? (
            <div className="empty">
              <p>Couldn't load the store right now.</p>
              <p>Please refresh, or reach us on WhatsApp.</p>
            </div>
          ) : (
            <>
              <p className="results-count" aria-live="polite">
                {results.length} {results.length === 1 ? "piece" : "pieces"} found
              </p>
    
              {results.length ? (
                <ProductGrid products={results} />
              ) : (
                <div className="empty">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <p>No pieces match those filters yet.</p>
                  <p>New stock arrives often, or ask us on WhatsApp.</p>
                  <button type="button" className="clear-btn" onClick={handleReset}>
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Shop;