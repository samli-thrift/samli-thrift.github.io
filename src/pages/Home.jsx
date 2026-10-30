
import { NavLink, useNavigate } from 'react-router-dom';
import HeroImg from '../assets/images/kids.jpg';
import FaqDropdown from '../components/FaqDropdown';

import '../scss/pages/Home.scss';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { PageContext } from '../context/PageContext.jsx';

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
    question: <>When are you available?</>,
    answer: <>Anytime and Everytime. Don't hesitate to contact us.</>,
  },
  {
    question: <>Why should I trust you?</>,
    answer: <>I am verified on various facebook groups and have been patronised for over four years now. We have made over 250 happy online sales with returning customers. You can trust us.</>,
  },
  {
    question: <>Is this website secure?</>,
    answer: <>Very much so. It is! You don't make payments here, <b>we get to discuss, bargain and conclude first on whatsapp</b> before you pay and I make arrangements for delivery. Then, the store gets updated removing your bought items.</>,
  },
  {
    question: <>How is delivery made?</>,
    answer: <>By <b>waybill</b> to any of the 36 states of Nigeria.</>,
  },
];


function Home() {
  const { navigate } = useNavigate();
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
          {feauturedProducts && feauturedProducts.map((each, i) => <ProductCard data={each} key={i}/>)}
        </div>
      </div>
    </section>

    <section className="whychoose">
      <div className="container">
        <h2><span className="special">Why Shop with</span> SamLi Thrift</h2>
        <div className="whychoose-content">
          <ul>
            <li>Honest grading</li>
            <li>Affordable Prices</li>
            <li>Carefully Selected Stock</li>
            <li>Trusted Vendor</li>
            <li>Nationwide delivery</li>
          </ul>
        </div>
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
            <p className="name"><b> - {each.name}</b></p>
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