import { useId, useMemo, useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import HeroImg from "../assets/images/kids.jpg";

import "../scss/pages/Shop.scss";
import "../scss/components/Searchbar.scss"; // SearchBar.jsx used to import this for us
import { DropdownField } from "../components/InputField.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useProducts } from "../context/ProductsContext";
import Loader from "../components/Loader";
import { buildOptions, hasValue, normType } from "../lib/facets"; // NEW: shared helpers

// NEW: how many items "New Arrivals" (?sort=new) shows
const NEW_ARRIVALS_COUNT = 20;

// FIX: removed the hardcoded `options` object. It drifted from the database
// (e.g. Shop had "girl"/"kids" while Home linked to "girls"/"boys"/"children").
// Options are now built from the real products inside the component, below.

// "environment" -> "Environment"
const toLabel = (key) => key.charAt(0).toUpperCase() + key.slice(1);

function Shop() {
  const [params, setParams] = useSearchParams();
  const searchId = useId();
  const searchRef = useRef(null);

  const { products, loading, error } = useProducts();

  // NEW: dropdown options come from the real values on your products.
  // Pretty names (Men's, Kid's...) live in LABELS inside lib/facets.js.
  const options = useMemo(
    () => ({
      category: buildOptions(products, "category"),
      style: buildOptions(products, "style"),
      environment: buildOptions(products, "environment"),
    }),
    [products]
  );

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
    const env = get("environment").toLowerCase();

    // NEW: extra URL filters used by the Navbar's Featured links
    const type = params.get("type");              // ?type=slot | bale | single
    const max = Number(params.get("max")) || 0;   // ?max=5000 -> price <= 5000

    const list = products
      .filter(
        (p) =>
          // FIX: hasValue() compares case-insensitively, so "?category=men"
          // matches "Men" in the DB. The old `.includes()` was an exact match.
          (get("category") === "all" || hasValue(p.category, get("category"))) &&
          (get("style") === "all" || hasValue(p.style, get("style"))) &&
          // FIX: environment is compared case-insensitively too (and is null-safe)
          (env === "all" ||
            p.environment?.toLowerCase() === env ||
            p.environment?.toLowerCase() === "everywhere") &&
          (!q || p.name.toLowerCase().includes(q)) &&
          // NEW: type filter ("bale" and "bales" both work)
          (!type || normType(p.type) === normType(type)) &&
          // NEW: price ceiling
          (!max || p.price <= max)
      )
      // available items first, sold-out last
      .sort((a, b) => Number(!!a.soldOut) - Number(!!b.soldOut));

    // NEW: ?sort=new -> the newest in-stock items (the API already returns
    // newest first, and the sort above is stable, so slicing is enough)
    return params.get("sort") === "new"
      ? list.filter((p) => !p.soldOut).slice(0, NEW_ARRIVALS_COUNT)
      : list;
  }, [params, products]);

  // NEW: plain-text summary of the extra filters, since they have no dropdown
  const extras = [
    params.get("type") && `${params.get("type").replace(/s?$/, "s")} only`,
    Number(params.get("max")) > 0 && `Under ₦${Number(params.get("max")).toLocaleString("en-NG")}`,
    params.get("sort") === "new" && "New arrivals",
  ].filter(Boolean);

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
            <Loader label="Loading pieces" />
          ) : error ? (
            <div className="empty">
              <p>Couldn't load the store right now.</p>
              <p>Please refresh, or reach us on WhatsApp.</p>
            </div>
          ) : (
            <>
              <p className="results-count" aria-live="polite">
                {results.length} {results.length === 1 ? "piece" : "pieces"} found
                {extras.length > 0 && ` · ${extras.join(" · ")}`}
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