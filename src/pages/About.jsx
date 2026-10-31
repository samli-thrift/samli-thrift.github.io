import { NavLink } from "react-router-dom";
import { Shirt, ShieldCheck, MessageCircle, Truck } from "lucide-react";
import OwnerImg from "../assets/images/kids.jpg";
import "../scss/pages/About.scss";

const stats = [
  { value: "4+", label: "Years trading" },
  { value: "250+", label: "Online sales" },
  { value: "12", label: "States delivered to" },
  { value: "Many", label: "Returning customers" },
];

const steps = [
  { icon: Shirt, title: "We select", text: "Every piece is hand-picked before it is listed." },
  { icon: ShieldCheck, title: "We grade", text: "Items are checked, graded honestly and flaws are photographed." },
  { icon: MessageCircle, title: "We chat", text: "You message us on WhatsApp. We discuss, bargain and agree before you pay." },
  { icon: Truck, title: "We deliver", text: "Your order goes out by waybill to any of the 36 states." },
];

function About() {
  return (
    <main className="About">
      <section className="about_hero">
        <div className="container">
          <div className="hero_content">
            <span className="eyebrow">About SamLi Thrift</span>
            <h1>
              Thrift you can <span className="special">trust</span>
            </h1>
            <p>
              SamLi Thrift Collections is a Nigerian thrift store built on honest
              grading and fair prices.<br/>Are you a student managing your funds, a worker upgrading your wardrobe or a retailer looking for stick to resell? Don't worry - we got you!
            </p>
          </div>
        </div>
      </section>

      <section className="about_story">
        <div className="container">
          <div className="img">
            <img src={OwnerImg} alt="Ogun Lilian, owner of SamLi Thrift" />
          </div>
          <div className="text">
            <h2>Our <span className="special">Story</span></h2>
            <p>
              I started this business to provide quality okirika at affordable prices. I personally inspect every bale and tell customers the true condition. What you see is what you get.
            </p>
            <p>
              Here at Samli, we believe that everyone deserves to look good, feel good and still have some change in their pocket. Are you a student managing your funds, a worker upgrading your wardrobe or a retailer looking for stick to resell? Don't worry - we got you!
            </p>
            <p>
              Today, I supply quality thrift clothing to resellers and individuals across Nigeria. My goal is simple: sell good clothes, earn trust, and build long-term relationships.
            </p>
            <p className="signature">- Ogun Lilian, Owner</p>
          </div>
        </div>
      </section>

      <section className="about_stats" aria-label="SamLi Thrift in numbers">
        <div className="container">
          <ul>
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about_process">
        <div className="container">
          <h2>How an order <span className="special">works</span></h2>
          <ol>
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="icon"><Icon size={26} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about_cta">
        <div className="container">
          <h2>Have a question before you buy?</h2>
          <div className="btns">
            <NavLink to="/contact">Contact us</NavLink>
            <NavLink to="/shop">Browse the shop</NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;