
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import CartContextProvider from './context/CartContext.jsx';
import PageContextProvider from './context/PageContext.jsx';

import './assets/fontawesome/css/font-awesome.min.css';
import './assets/icomoon/style.css';

function App() {

  return <HashRouter>
    <ScrollToTop/>

    <PageContextProvider>
      <CartContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product-details' element={<ProductDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>

        <Footer />
      </CartContextProvider>
    </PageContextProvider>
  </HashRouter>;
}

export default App;
