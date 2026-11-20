import HeroImg from '../assets/images/kids.jpg';
import OwnerImg from '../assets/images/owner.jpg';

import { NavLink } from 'react-router-dom';
import FaqDropdown from '../components/FaqDropdown';

import '../scss/pages/Home.scss';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useContext, useEffect, useMemo, useState } from 'react';
import { PageContext } from '../context/PageContext.jsx';

// Same Supabase-backed context the Shop page uses, so Home and Shop never disagree.
import { useProducts } from '../context/ProductsContext';
import { buildFacets, prettify } from '../lib/facets';

import {
  ShieldCheck, Tag, Search, BadgeCheck, Truck,
  ArrowRight, ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Honest grading", text: "Every item is checked for stains, wear and flaws. We grade it plainly and photograph any defects." },
  { icon: Tag, title: "Affordable prices", text: "Quality pieces at a fraction of retail, with no hidden fees at checkout." },
  { icon: Search, title: "Carefully selected stock", text: "We hand-pick every piece. If we wouldn't wear it ourselves, it doesn't get listed." },
  { icon: BadgeCheck, title: "Trusted vendor", text: "Over four years trading and 250+ happy online sales, many to returning customers." },
  { icon: Truck, title: "Nationwide delivery", text: "Waybill delivery to all 36 states, usually in under 4 days." },
];

const heroStats = [
  { value: '4+', label: 'Years trading' },
  { value: '250+', label: 'Happy sales' },
  { value: '36', label: 'States delivered' },
];

const FEATURED_COUNT = 6;

const reviews = [
  { name: 'Blessing C.', review: 'Really nice clothes. I really appreciate your honesty.' },
  { name: 'Juliet M.', review: 'Thank you for the quick delivery and quality stock.' },
  { name: 'Olatunde O.', review: 'I got something even better than I ordered.' },
];

const faqs = [
  {
    question: "How do I place an order?",
    answer: (<>Browse the store, then message us on <b>WhatsApp</b> about the item you want. We discuss and agree on the price, you pay, and we arrange delivery. The store is then updated to remove your bought items.</>),
  },
  {
    question: "Why should I trust you?",
    answer: (<>We're verified on various Facebook groups and have been patronised for over four years. We've made over <b>250 happy online sales</b>, many of them to returning customers.</>),
  },
  {
    question: "Is this website secure?",
    answer: (<>Very much so. You don't make any payments on this website. We <b>discuss, bargain and conclude on WhatsApp first</b>, and only then do you pay and we arrange delivery.</>),
  },
  {
    question: "How is delivery made?",
    answer: <>By <b>waybill</b> to any of the 36 states of Nigeria.</>,
  },
  {
    question: "How long does delivery take, and what does it cost?",
    answer: <>Less than 4 days for all deliveries no matter the state or traffic. The cost depends on how the waybill fee is worked out.</>,
  },
  {
    question: "Can I return or exchange an item?",
    answer: <>No returns once waybilled. Detailed descriptions and real-size images of each piece are available in the product detail.</>,
  },
  {
    question: "How is the condition of each item described?",
    answer: (<>Every item is graded honestly, and any flaws are mentioned before you pay. You can ask for extra photos or measurements on WhatsApp.</>),
  },
  {
    question: "When are you available?",
    answer: <>Anytime and every time. Don't hesitate to contact us.</>,
  },
];

function Home() {
  const { theme } = useContext(PageContext);

  const { products, loading, error } = useProducts();
  const [shopBy, setShopBy] = useState('category'); // 'category' | 'style'

  // Only show items that can still be bought
  const inStock = useMemo(() => products.filter((p) => !p.soldOut), [products]);

  // Context sorts newest-first, so Featured = 6 newest in-stock items
  const featured = useMemo(() => inStock.slice(0, FEATURED_COUNT), [inStock]);

  // Real categories and styles from the database, with counts + cover image
  const facets = useMemo(
    () => ({
      category: buildFacets(inStock, 'category'),
      style: buildFacets(inStock, 'style'),
    }),
    [inStock]
  );
  const shopByItems = facets[shopBy];

  // Hero slider: your own photo first, then real category covers from the database
  const heroSlides = useMemo(() => [
    { src: HeroImg, label: 'Kids thrift', to: '/shop' },
    ...facets.category
      .filter((f) => f.image)
      .slice(0, 3)
      .map((f) => ({
        src: f.image,
        label: f.label,
        to: `/shop?category=${encodeURIComponent(f.value)}`,
      })),
  ], [facets.category]);

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;
  const current = heroSlides[slide % total];

  const go = (dir) => setSlide((i) => (i + dir + total) % total);

  // Autoplay every 5s; stops on hover/focus, with one slide, or if the user prefers reduced motion
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  return <main className="Home home-page">
    <section className="home_hero hero" aria-labelledby="hero-title">
      <div className="container">
        <div
          className="hero_img"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="hero-slide" aria-roledescription="carousel" aria-label="Featured collections">
            <img
              key={current.src}
              src={current.src}
              alt={`${current.label} at SamLi Thrift`}
              onError={(e) => { e.currentTarget.src = HeroImg; }}
            />
          </div>

          <NavLink to={current.to} className="hero-image-note">
            {current.label} <ArrowRight size={14} aria-hidden="true" />
          </NavLink>

          <div className="hero-badge" aria-hidden="true">
            <strong>250+</strong>
            <span>happy online sales</span>
          </div>

          {total > 1 && (
            <div className="hero-slider-controls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous slide"><ChevronLeft size={18} /></button>
              <span className="hero-slide-count" aria-live="polite">
                {String((slide % total) + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next slide"><ChevronRight size={18} /></button>
            </div>
          )}
        </div>

        <div className="hero_content">
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            <span className="hide-sm">Welcome to </span>SamLi Thrift Collections
          </span>
          <h1 className="slogan" id="hero-title">
            Where <span className="special">Quality</span> meets <span className="special">Affordability</span>
          </h1>
          <p>Your go-to destination for quality thrift clothing in Nigeria. Hand-picked, honestly graded pieces delivered to all 36 states.</p>
          <div className="cta">
            <NavLink to="/shop" className="primary">Shop now <ArrowRight size={16} aria-hidden="true" /></NavLink>
            <NavLink to="/contact" className="ghost">Contact us</NavLink>
          </div>
          <ul className="hero-stats">
            {heroStats.map(({ value, label }) => (
              <li key={label}><strong>{value}</strong><span>{label}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="shopby" aria-labelledby="shopby-title">
      <div className="container">
        <h2 id="shopby-title"><span className="special">Shop</span> by {prettify(shopBy)}</h2>
        <p>Explore our store for what fits your style.</p>

        {/* Toggle between browsing by category and by style */}
        <div className="shopby-tabs" role="group" aria-label="Browse by">
          {['category', 'style'].map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={shopBy === key}
              onClick={() => setShopBy(key)}
            >
              {prettify(key)}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader label="Loading categories" />
        ) : error ? (
          <p className="section-note">Couldn't load this right now. Please refresh.</p>
        ) : shopByItems.length === 0 ? (
          <p className="section-note">New stock is on the way.</p>
        ) : (
          // key={shopBy} resets the carousel scroll position when switching tabs
          <ul className="categories" key={shopBy}>
            {shopByItems.map(({ value, label, count, image }) => (
              <li key={value}>
                <NavLink to={`/shop?${shopBy}=${encodeURIComponent(value)}`} className="category">
                  <span className="img"><img src={image || HeroImg} alt="" loading="lazy" /></span>
                  <span className="label">
                    <span>
                      {label}
                      <small>{count} {count === 1 ? 'item' : 'items'}</small>
                    </span>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>

    <section className="featured" aria-labelledby="featured-title">
      <div className="container">
        <h2 id="featured-title">Featured <span className="special">products</span></h2>

        {loading ? (
          <Loader label="Loading products" />
        ) : error ? (
          <p className="section-note">Couldn't load products right now. Please refresh.</p>
        ) : featured.length === 0 ? (
          <p className="section-note">New stock is on the way. Check back soon.</p>
        ) : (
          <ul className="products-grid">
            {featured.map((each) => (
              <li key={each.id}><ProductCard product={each} /></li>
            ))}
          </ul>
        )}
      </div>
    </section>

    <section className="whychoose" aria-labelledby="why-title">
      <div className="container">
        <h2 id="why-title"><span className="special">Why shop with</span> SamLi Thrift</h2>
        <ul className="whychoose-grid">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="icon"><Icon size={28} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="meetowner" aria-labelledby="owner-title">
      <div className="container">
        <div className="meetowner-content">
          <div className="img">
            <img src={OwnerImg} alt="Ogun Lilian, owner of SamLi Thrift" loading="lazy" />
          </div>
          <div className="text">
            <h2 id="owner-title">Meet the owner</h2>
            <h3 className={theme ? theme : ""}><span className="special">Ogun Lilian</span></h3>
            <p>Hi! I'm Lilian! Here at Samli, we believe that everyone deserves to look good, feel good and still have some change in their pocket. Are you...</p>
            <NavLink to="/about" className="seemore-btn">Read more</NavLink>
          </div>
        </div>
      </div>
    </section>

    <section className="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <h2 id="reviews-title">Genuine <span className="special">customer feedback</span></h2>
        <p className="small-talk">Real sales. Real customers. Real reviews.</p>
        <ul className="reviews-grid">
          {reviews.map(({ name, review }) => (
            <li key={name}>
              <figure className="review-card">
                <i className="icon-quote" aria-hidden="true"></i>
                <blockquote><p>{review}</p></blockquote>
                <figcaption className="name">{name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="small-talk">Over <b>250+</b> successful <b>online</b> sales with happy returning customers.</p>
      </div>
    </section>

    <section className="faqs" aria-labelledby="faq-title">
      <div className="container">
        <h2 id="faq-title">Frequently asked <span className="special">questions</span></h2>
        <div className="faqs-content">
          {faqs.map((each) => <FaqDropdown key={each.question} content={each} name="home-faq" />)}
        </div>
      </div>
    </section>

    <section className="home_cta" aria-labelledby="cta-title">
      <div className="container">
        <h2 id="cta-title">Ready to order quality thrift at affordable prices?</h2>
        <div className="btns">
          <NavLink to="/shop">Browse available products</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
        </div>
      </div>
    </section>
  </main>;
}

export default Home;