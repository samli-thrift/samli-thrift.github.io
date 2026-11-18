
import { useEffect, useState } from 'react';
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
import Loader from './components/Loader';

import CartContextProvider from './context/CartContext.jsx';
import PageContextProvider from './context/PageContext.jsx';

import './assets/fontawesome/css/font-awesome.min.css';
import './assets/icomoon/style.css';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { useProducts } from './context/ProductsContext.jsx';

function AppContent() {
  const { loading: productsLoading } = useProducts();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setInitialLoadComplete(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!initialLoadComplete || productsLoading) {
    return <Loader fullPage label="SamLi Thrift..." />;
  }

  return (
    <>
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
    </>
  );
}

function App() {
  return <HashRouter>
    <ScrollToTop/>

    <PageContextProvider>
      <ProductsProvider>
        <CartContextProvider>
          <AppContent />
        </CartContextProvider>
      </ProductsProvider>
    </PageContextProvider>
  </HashRouter>;
}

export default App;
