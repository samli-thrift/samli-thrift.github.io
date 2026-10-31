

import HeroImg from '../assets/images/kids.jpg';

import { useState } from "react";
import "../scss/pages/Contact.scss";
import { MessageCircle, Users, Truck } from "lucide-react";

// TODO: replace with real details (number in international format, no + or spaces)
const WHATSAPP = "2348038849000";
const FACEBOOK = "https://facebook.com/your-page";


const channels = [
  { icon: <MessageCircle size={22} />, title: "WhatsApp", text: "The fastest way to reach us. Discuss the item, bargain, then pay.", cta: "Chat now", href: `https://wa.me/${WHATSAPP}` },
  { icon: <Users size={22} />, title: "Facebook", text: "Find us in our verified Facebook groups and see our past sales.", cta: "Visit page", href: FACEBOOK },
  { icon: <Truck size={22} />, title: "Delivery", text: "We ship by waybill to all 36 states in Nigeria. Ask us about your location.", cta: "Ask about delivery", href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi SamLi Thrift, I'd like to ask about delivery to my state.")}` },
];

const steps = [
  { title: "Message us", text: "Tell us the item you like or what you're looking for." },
  { title: "Discuss & bargain", text: "We confirm condition, size and agree a fair price." },
  { title: "Pay", text: "Once we agree, you pay and we pack your order." },
  { title: "Waybill delivery", text: "Your order is sent to any of the 36 states." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", topic: "Item enquiry", message: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const text = `Hi SamLi Thrift, I'm ${form.name}.\n\nTopic: ${form.topic}\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <div className="Contact">
      <section className="contact_hero">
        <div className="container">
          <div className="hero_img">
            <img src={HeroImg} alt="SamLi Thrift clothes rack" />
          </div>
          <div className="hero_content">
            <span className="eyebrow">Contact</span>
            <h1 className="slogan">Let's talk thrift.</h1>
            <p>
              Questions about an item, your size, delivery or price? Send us a
              message and we'll get back to you on WhatsApp.
            </p>
            <div className="cta">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_channels">
        <div className="container">
          <h2>Ways to reach us</h2>
          <ul>
            {channels.map((c) => (
              <li key={c.title}>
                <span className="icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer">{c.cta}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact_form">
        <div className="container">
          <form onSubmit={submit}>
            <h2>Send a message</h2>

            <div className="field">
              <input id="name" name="name" value={form.name} onChange={change} required />
              <label htmlFor="name">Your name</label>
            </div>

            <div className="field">
              <select id="topic" name="topic" value={form.topic} onChange={change}>
                <option>Item enquiry</option>
                <option>Price / bargain</option>
              </select>
            </div>

            <div className="field">
              <textarea id="message" name="message" rows="5" value={form.message} onChange={change} required />
              <label htmlFor="message">Message</label>
            </div>

            <button type="submit"><i className="fa fa-whatsapp"></i> Continue on WhatsApp</button>
          </form>

          <div className="how">
            <h2>How ordering works</h2>
            <ol>
              {steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="contact_cta">
        <div className="container">
          <h2>Prefer to browse first?</h2>
          <p>Have a look at our latest thrift finds, then message us about what you like.</p>
          <div className="btns">
            <a href="/shop">Shop now</a>
            <a href="/about">About SamLi Thrift</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
