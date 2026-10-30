
import { NavLink } from "react-router-dom";
import '../scss/components/Footer.scss';

const socialLinks = [
  {
    href: '#',
    icon: "fa fa-facebook",
  },
  {
    href: '#',
    icon: "fa fa-whatsapp",
  },
  {
    href: '#',
    icon: "fa fa-phone",
  },
  {
    href: '#',
    icon: "fa fa-instagram",
  },
];

function Footer() {
  let thisYear = new Date();
  thisYear = thisYear.getFullYear();

  return <footer className="Footer">
    <div className="container">
      <div className="logo">SamLi Thrift</div>
      <div className="links">
        {socialLinks && socialLinks.map((each, i)=> <NavLink to={each.href} key={i}><i className={each.icon}></i></NavLink>)}
      </div>
      <div className="more-links">
        <NavLink to="/find-us"><i className="fa fa-map-marker"></i>Visit Us</NavLink>
        <NavLink to="/shop"><i className="fa fa-shopping-cart"></i>Shop now</NavLink>
      </div>
    </div>
    <div className="copyright">
      © {thisYear} Samli Thrift Collections. All rights reserved.
    </div>
  </footer>;
}

export default Footer;