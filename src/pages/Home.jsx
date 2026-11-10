import { NavLink } from 'react-router-dom';
import HeroImg from '../assets/images/kids.jpg';
import FaqDropdown from '../components/FaqDropdown';

import '../scss/pages/Home.scss';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { PageContext } from '../context/PageContext.jsx';

import { products } from "../data/products";

import { ShieldCheck, Tag, Search, BadgeCheck, Truck } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Honest grading", text: "Every item is checked for stains, wear and flaws. We grade it plainly and photograph any defects." },
  { icon: Tag, title: "Affordable prices", text: "Quality pieces at a fraction of retail, with no hidden fees at checkout." },
  { icon: Search, title: "Carefully selected stock", text: "We hand-pick every piece. If we wouldn't wear it ourselves, it doesn't get listed." },
  { icon: BadgeCheck, title: "Trusted vendor", text: "Over four years trading and 250+ happy online sales, many to returning customers." },
  { icon: Truck, title: "Nationwide delivery", text: "Waybill delivery to all 36 states, usually in under 4 days." },
];

// TODO: give each category its own query (e.g. ?category=boys) so the links don't all land on the same page
const categories = [
  { link: "/shop?category=men", linkText: "Men's clothes" },
  { link: "/shop?category=women", linkText: "Women's clothes" },
  { link: "/shop?category=children", linkText: "Children's clothes" },
  { link: "/shop?category=boys", linkText: "Boys" },
  { link: "/shop?category=girls", linkText: "Girls" },
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

  return <main className="Home home-page">
    <section className="home_hero hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero_img">
          <img src={HeroImg} alt="Children wearing thrifted clothes" />
        </div>
        <div className="hero_content">
          <p className="eyebrow">Welcome to SamLi Thrift Collections</p>
          <h1 className="slogan" id="hero-title">
            Where <span className="special">Quality</span> meets <span className="special">Affordability</span>
          </h1>
          <p>Your go-to destination for quality thrift clothing in Nigeria. Explore our wide range of affordable fashion.</p>
          <div className="cta">
            <NavLink to="/shop">Shop now</NavLink>
            <NavLink to="/contact">Contact us</NavLink>
          </div>
        </div>
      </div>
    </section>

    <section className="shopby" aria-labelledby="shopby-title">
      <div className="container">
        <h2 id="shopby-title"><span className="special">Shop</span> by category</h2>
        <ul className="categories">
          {categories.map(({ link, linkText }) => (
            <li key={linkText}>
              <NavLink to={link} className="category">
                <span className="img"><img src={HeroImg} alt="" loading="lazy" /></span>
                <span className="label">
                  {linkText}
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="featured" aria-labelledby="featured-title">
      <div className="container">
        <h2 id="featured-title">Featured <span className="special">products</span></h2>
        <ul className="products-grid">
          {products.slice(0, FEATURED_COUNT).map((each) => (
            <li key={each.id ?? each.name}><ProductCard product={each} /></li>
          ))}
        </ul>
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
            <img src={HeroImg} alt="Ogun Lilian, owner of SamLi Thrift" loading="lazy" />
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
