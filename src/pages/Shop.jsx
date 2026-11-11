import { useMemo } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import HeroImg from "../assets/images/kids.jpg";

import "../scss/pages/Shop.scss";
import { DropdownField } from "../components/InputField.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { products } from "../data/products";

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

function Shop() {
  const [params, setParams] = useSearchParams();

  const values = {
    category: params.get("category") ?? "all",
    style: params.get("style") ?? "all",
    environment: params.get("environment") ?? "all",
  };
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

  const handleValues = (property, value) => updateParam(property, value);
  const handleReset = () => setParams({}, { replace: true });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter(
        (p) =>
          (values.category === "all" || p.category === values.category) &&
          (values.style === "all" || p.style === values.style) &&
          (values.environment === "all" ||
            p.environment === values.environment ||
            p.environment === "everywhere") &&
          (!q || p.name.toLowerCase().includes(q))
      )
      // available items first, sold-out last
      .sort((a, b) => Number(!!a.soldOut) - Number(!!b.soldOut));
  }, [values.category, values.style, values.environment, query]);

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

      <aside className="filter-header" aria-label="Search and filter products">
        <div className="container">
          <form role="search" className="filter-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Find your next favourite piece</h3>

            <SearchBar
              className="filtervariation"
              value={query}
              onChange={(v) => updateParam("q", v)}
            />

            <div className="filters">
              <DropdownField label="Category" name="category" value={values.category}
                options={options.category} onChange={handleValues} classNames={["filter"]} />
              <DropdownField label="Style" name="style" value={values.style}
                options={options.style} onChange={handleValues} classNames={["filter"]} />
              <DropdownField label="Environment" name="environment" value={values.environment}
                options={options.environment} onChange={handleValues} classNames={["filter"]} />
              <button type="button" className="clear-btn" onClick={handleReset}>
                Clear filters
              </button>
            </div>
          </form>
        </div>
      </aside>

      <section className="products" id="products">
        <div className="container">
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
        </div>
      </section>
    </main>
  );
}

export default Shop;