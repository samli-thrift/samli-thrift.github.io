
import { NavLink, useNavigate } from 'react-router-dom';
import HeroImg from '../assets/images/kids.jpg';
import FaqDropdown from '../components/FaqDropdown';

import '../scss/pages/Home.scss';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { PageContext } from '../context/PageContext.jsx';

import { products } from "../data/products";

import { ShieldCheck, Tag, Search, BadgeCheck, Truck } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Honest grading",
    text: "Every item is checked for stains, wear and flaws. We grade it plainly and photograph any defects.",
  },
  {
    icon: Tag,
    title: "Affordable prices",
    text: "Quality pieces at a fraction of retail, with no hidden fees at checkout.",
  },
  {
    icon: Search,
    title: "Carefully selected stock",
    text: "We hand-pick every piece. If we wouldn't wear it ourselves, it doesn't get listed.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted vendor",
    text: "Real customer reviews and clear returns. [Add: years trading / orders shipped]",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    text: "Tracked delivery across the country, with dispatch within [X] working days.",
  },
];

const categories = [
  {
    name: "Men's clothing",
    link: "/shop?category=men",
    linkText: "Men's Clothes",
  },
  {
    name: "Women's clothing",
    link: "/shop?category=women",
    linkText: "Women Clothes",
  },
  {
    name: "Children's clothing",
    link: "/shop?category=children",
    linkText: "Children's Clothes",
  },
  {
    name: "Children's clothing",
    link: "/shop?category=children",
    linkText: "Boys",
  },
  {
    name: "Children's clothing",
    link: "/shop?category=children",
    linkText: "Girls",
  },
  {
    name: "Children's clothing",
    link: "/shop?category=children",
    linkText: "Hot Girl",
  },
  {
    name: "Children's clothing",
    link: "/shop?category=children",
    linkText: "PUNK",
  },
];

const feauturedProducts = [1, 2, 2, 3, 3];

const reviews = [
  {
    name: 'ifesinachi',
    review: 'Use genuine customer reviews or screenshots that your mum has permission to share.'
  },
  {
    name: 'ifesinachi',
    review: 'Use genuine customer reviews or screenshots that your mum has permission to share.'
  },
  {
    name: 'ifesinachi',
    review: 'Use genuine customer reviews or screenshots that your mum has permission to share.'
  },
];

const faqs = [
  {
    question: "How do I place an order?",
    answer: (
      <>
        Browse the store, then message us on <b>WhatsApp</b> about the item you
        want. We discuss and agree on the price, you pay, and we arrange
        delivery. The store is then updated to remove your bought items.
      </>
    ),
  },
  {
    question: "Why should I trust you?",
    answer: (
      <>
        We're verified on various Facebook groups and have been patronised for
        over four years. We've made over <b>250 happy online sales</b>, many of
        them to returning customers.
      </>
    ),
  },
  {
    question: "Is this website secure?",
    answer: (
      <>
        Very much so. You don't make any payments on this website. We{" "}
        <b>discuss, bargain and conclude on WhatsApp first</b>, and only then
        do you pay and we arrange delivery.
      </>
    ),
  },
  {
    question: "How is delivery made?",
    answer: (
      <>
        By <b>waybill</b> to any of the 36 states of Nigeria.
      </>
    ),
  },
  {
    question: "How long does delivery take, and what does it cost?",
    answer: <>[Typical delivery time, and how the waybill fee is worked out.]</>,
  },
  {
    question: "Can I return or exchange an item?",
    answer: <>[Your return or exchange policy, e.g. wrong size, item not as described.]</>,
  },
  {
    question: "How is the condition of each item described?",
    answer: (
      <>
        Every item is graded honestly, and any flaws are mentioned before you
        pay. [Add: you can ask for extra photos or measurements on WhatsApp.]
      </>
    ),
  },
  {
    question: "When are you available?",
    answer: <>Anytime and every time. Don't hesitate to contact us.</>,
  },
];


function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(PageContext);

  return <main className="Home home-page">
    <section className="home_hero hero">
      <div className="container">
        <div className="hero_img">
          <img src={HeroImg} alt="hero image" />
        </div>
        <div className="hero_content">
          <span className="eyebrow">Welcome to SamLi Thrift Collections</span>
          <h1 className="slogan">
            Where <span className="special">Quality</span> meets <span className="special">Affordability</span>
          </h1>
          <p>Your go-to destination for quality thrift clothing in Nigeria. Explore our wide range of affordable fashion.</p>
          <div className="cta">
            <NavLink to="/shop">Shop now</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      </div>
    </section>

    <section className="shopby">
      <div className="container">
        <h2><span className="special">Shop</span> By Category</h2>
        <div className="categories">
          {categories && categories.map((each, i) => <button className='category' key={i} onClick={(e)=>{
            e.preventDefault();
            navigate(each.link)
          }}>
            <div className="img">
              <img src={HeroImg} alt="category img" />
            </div>
            <div className="text">
              <NavLink to={each.link}>
                {each.linkText}
                <i className="fa fa-chevron-right"></i>
              </NavLink>
            </div>
          </button>)}
        </div>
      </div>
    </section>

    <section className="featured">
      <div className="container">
        <h2>Featured <span className="special">Products</span></h2>
        <div className="products-grid">
          {products && products.map((each, i) => <ProductCard product={each} key={i}/>)}
        </div>
      </div>
    </section>

    <section className="whychoose">
      <div className="container">
        <h2><span className="special">Why Shop with</span> SamLi Thrift</h2>
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

    <section className="meetowner">
      <div className="container">
        <div className="meetowner-content">
          <div className="img">
            <img src={HeroImg} alt="owner" />
          </div>
          <div className="text">
            <h2>Meet the Owner</h2>
            <h3 className={theme?theme:""}><span className="special">Ogun Lilian</span></h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque adipisci iusto voluptates...Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque adipisci iusto voluptates</p>
            <button className="seemore-btn">Read More</button>
          </div>
        </div>
      </div>
    </section>

    <section className="reviews">
      <div className="container">
        <h2>Genuine <span className="special">Customer Feedback</span></h2>
        <span className="small-talk">Real sales. Real Customers. Real Reviews</span>
        <div className="reviews-grid">
          {reviews && reviews.map((each, i) => <div className="review-card" key={i}>
            <i className="icon-quote"></i>
            <p>{each.review}</p>
            <h4 className="name"><b> - {each.name}</b></h4>
          </div>)}
        </div>
        <span className="small-talk">Over <b>500+</b> successful <b>online</b> sales with happy returning customers.</span>
      </div>
    </section>

    <section className="faqs">
      <div className="container">
        <h2>Frequently Asked <span className="special">Questions</span></h2>
        <div className="faqs-content">
          {faqs && faqs.map((each, i)=> <FaqDropdown key={i} content={each} name="home-faq"/>)}
        </div>
      </div>
    </section>

    <section className="cta">
      <div className="container">
        <h2>Ready to order quality thrift at affordable prices?</h2>
        <div className="btns">
          <NavLink to="/shop">Browse available Products</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
        </div>
      </div>
    </section>
  </main>;
}


export default Home;