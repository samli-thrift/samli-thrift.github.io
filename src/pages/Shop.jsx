
import { useState, useContext } from 'react';
import { PageContext } from '../context/PageContext.jsx';

import { NavLink, useNavigate } from 'react-router-dom';
import HeroImg from '../assets/images/kids.jpg';

import '../scss/pages/Shop.scss';
import ProductCard from '../components/ProductCard';
import { DropdownField } from '../components/InputField.jsx'
import SearchBar from '../components/SearchBar.jsx';

const options = {
  category: [
    { value: "all", label: "All" },
    { value: "men", label: "Men's" },
    { value: "women", label: "Women" },
    { value: "children", label: "Children's" },
    { value: "babies", label: "Babies'" },
    { value: "girl", label: "Girl's" },
    { value: "underwear", label: "Underwear" },
    { value: "swimwear", label: "Swimwear" },
    { value: "night-wear", label: "Nightwear" },
  ],
  style: [
    { value: "all", label: "All" },
    { value: "hot", label: "Hot" },
    { value: "s**y", label: "s**y" },
    { value: "punk", label: "Punk" },
    { value: "trending", label: "Trending" },
  ],
  enviroment: [
    { value: "all", label: "All" },
    { value: "everywhere", label: "Everywhere" },
    { value: "work", label: "Work" },
    { value: "school", label: "School" },
    { value: "casual", label: "Casual" },
  ],
};

function Shop() {

  const [values, setValues] = useState({
    category: "all",
    style: "all",
    enviroment: "all",
  });

  function handleValues(property, value) {
    setValues((prev) => ({ ...prev, [property]: value }));
  }


  return <main className="Shop shop-page">
    <section className="shop_hero hero">
      <div className="container">
        <div className="hero_img">
          <img src={HeroImg} alt="hero image" />
        </div>
        <div className="hero_content">
          {/* <span className="eyebrow">Welcome to SamLi Thrift Collections</span> */}
          <h1 className="slogan">
            <span className="special">Explore</span> our <span className="special">Store</span>
          </h1>
          <p>
            Discover incredible pieces that match your style and fit your budget
          </p>
          <div className="cta">
            <NavLink to="/shop">Shop now</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      </div>
    </section>

    <aside className="filter-header">
      <div className="container">
        <h3>Search SamLi:</h3>
        <SearchBar className="filtervarsion"/>
        <h3>and Filter by:</h3>
        <div className="filters">
          <DropdownField
            label="Category"
            name="category"
            value={values.category}
            options={options.category}
            onChange={handleValues}
            classNames={["filter"]}
            />
          <DropdownField
            label="Style"
            name="style"
            value={values.style}
            options={options.style}
            onChange={handleValues}
            classNames={["filter"]}
            />
          <DropdownField
            label="Enviroment"
            name="enviroment"
            value={values.enviroment}
            options={options.enviroment}
            onChange={handleValues}
            classNames={["filter"]}
          />
        </div>
      </div>
    </aside>

    <section className="products">
      <div className="container">
        {([1,2,3,4,5,6,7,8,9]).map((each,i)=><ProductCard key={i}/>)}
      </div>
    </section>
  </main>
}

export default Shop