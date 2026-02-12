import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Check, Package, Trash2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { HomePage, AboutPage, PrivacyPolicyPage, TermsPage, ProductsPage, ProductDetail, CartPage, CheckoutPage, SuccessModal } from './components/AppPages';
import ajLogo from './assets/aj-removebg-preview.png';

// Dummy Products Data
const PRODUCTS = [
  { id: 1, name: 'Titanium Hip Implant Pro', category: 'Hip Implants', price: 285000, image: 'https://s.alicdn.com/@sc04/kf/Ha5066a97661a4f31a4d33e7076dc48a6r/Titanium-Hip-Prosthesis-Artificial-Hip-Joint-Replacement-Orthopedic-Implant-Artificial-Hip-Joint-Implant.png_300x300.jpg', rating: 5, specs: 'Premium grade titanium alloy, anatomically designed for optimal fit and long-term stability.' },
  { id: 2, name: 'Knee Replacement System Elite', category: 'Knee Implants', price: 325000, image: 'https://ramedicos.com/wp-content/uploads/2023/01/BIORAD-GENIUS-Assembled-1.png', rating: 5, specs: 'Advanced polyethylene bearing surface with enhanced wear resistance and mobility.' },
  { id: 3, name: 'Spinal Fusion Cage Advanced', category: 'Spinal Implants', price: 195000, image: 'https://spineway.com/upload/tlif-3d-678517dc4cfa9622969665.png', rating: 4, specs: 'PEEK material with optimized porosity for rapid bone integration and fusion.' },
  { id: 4, name: 'Shoulder Implant Premium', category: 'Shoulder Implants', price: 265000, image: 'https://arthrosurface.com/wp-content/uploads/2025/05/image-8.png', rating: 5, specs: 'Reverse shoulder prosthesis with modular design for customized patient outcomes.' },
  { id: 5, name: 'Trauma Plate System Pro', category: 'Trauma', price: 145000, image: 'https://stahlmannpro.ae/wp-content/uploads/2025/09/trauma-implants-right.png', rating: 4, specs: 'Locking compression plate technology for superior fracture stabilization.' },
  { id: 6, name: 'Bone Screw Set Deluxe', category: 'Accessories', price: 85000, image: 'https://static.vecteezy.com/system/resources/previews/073/932/598/non_2x/orthopedic-bone-screws-set-png.png', rating: 5, specs: 'Complete set of cortical and cancellous screws in various sizes.' },
  { id: 7, name: 'Cervical Disc Replacement', category: 'Spinal Implants', price: 310000, image: 'https://www.spinesurgerycleveland.com/uploads/5/3/9/5/53958589/1459202194.png', rating: 5, specs: 'Articulating disc prosthesis maintaining natural cervical spine motion.' },
  { id: 8, name: 'Intramedullary Nail System', category: 'Trauma', price: 175000, image: 'https://www.zimed.com.tr/admin/uploads/image/lag-screw-3(1).png', rating: 4, specs: 'Titanium nail for femoral and tibial fracture fixation with interlocking screws.' },
  { id: 9, name: 'Ankle Replacement Implant', category: 'Ankle Implants', price: 245000, image: 'https://www.panoramaortho.com/wp-content/uploads/2025/07/Examples-of-total-ankle-implants-1-1024x644-1-768x483.png', rating: 5, specs: 'Three-component mobile bearing design for superior ankle mobility.' },
];

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number.isFinite(quantity) ? Math.floor(quantity) : 1);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
    setToast({ type: 'success', message: `${product.name} added to cart!` });
    setTimeout(() => setToast(null), 3000);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id) => {
    const product = cart.find(item => item.id === id);
    const shouldDelete = window.confirm(`Remove "${product?.name || 'this item'}" from cart?`);
    if (!shouldDelete) return;
    setCart(cart.filter(item => item.id !== id));
    setToast({ type: 'info', message: `${product.name} removed from cart!` });
    setTimeout(() => setToast(null), 3000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md bg-white/10 border-b border-white/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setPage('home')}>
              <img
                src={ajLogo}
                alt="AJ International logo"
                className="h-12 md:h-14 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {['home', 'about', 'products', 'cart'].map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`capitalize font-medium nav-link text-blue-300`}
                >
                  {item === 'about' ? 'About Us' : item}
                </button>
              ))}
              <button
                onClick={() => setPage('cart')}
                className="relative p-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
          aria-hidden={!menuOpen}
        >
          <div className="px-4 py-4 space-y-3">
            {['home', 'about', 'products', 'cart'].map((item) => (
              <button
                key={item}
                onClick={() => { setPage(item); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 capitalize font-medium nav-link text-blue-300 flex items-center justify-between`}
              >
                <span>{item === 'about' ? 'About Us' : item}</span>
                {item === 'cart' && cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 px-2 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 page-transition">
        {page === 'home' && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} products={PRODUCTS} />}
        {page === 'about' && <AboutPage setPage={setPage} />}
        {page === 'privacy' && <PrivacyPolicyPage setPage={setPage} />}
        {page === 'terms' && <TermsPage setPage={setPage} />}
        {page === 'products' && <ProductsPage products={PRODUCTS} setSelectedProduct={setSelectedProduct} setPage={setPage} addToCart={addToCart} />}
        {page === 'product-detail' && selectedProduct && <ProductDetail product={selectedProduct} setPage={setPage} addToCart={addToCart} />}
        {page === 'cart' && <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} cartTotal={cartTotal} setPage={setPage} />}
        {page === 'checkout' && <CheckoutPage cartTotal={cartTotal} setShowSuccess={setShowSuccess} />}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl font-semibold text-white shadow-lg toast-enter transition-all duration-300 ${toast.type === 'success'
          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
          : 'bg-gradient-to-r from-red-500 to-rose-500'
          }`}>
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && <SuccessModal setShowSuccess={setShowSuccess} setPage={setPage} setCart={setCart} />}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-teal-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={ajLogo}
                  alt="AJ International logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-blue-100">Premium orthopedic implants delivering excellence across Pakistan.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-blue-100">
                <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Home</button></li>
                <li><button onClick={() => setPage('products')} className="hover:text-white transition-colors bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Products</button></li>
                <li><button onClick={() => setPage('cart')} className="hover:text-white transition-colors bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Cart</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-white">
                <li><button onClick={() => setPage('about')} className="hover:text-white text-white transition-colors bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">About Us</button></li>
                <li><a href="#contact" className="hover:text-white text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Contact</a></li>
                <li><button onClick={() => setPage('privacy')} className="hover:text-white text-white transition-colors bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Privacy Policy</button></li>
                <li><button onClick={() => setPage('terms')} className="hover:text-white text-white transition-colors bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">Terms of Service</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div id='contact'>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-blue-100">
                <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="2" className="inline-block align-middle mr-2"><path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2H13.5C17.2712 2 19.1569 2 20.3284 3.17157C21.5 4.34315 21.5 6.22876 21.5 10V14C21.5 17.7712 21.5 19.6569 20.3284 20.8284C19.1569 22 17.2712 22 13.5 22H12C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z" /><path d="M9.79993 11.9741C9.37332 11.2302 9.16733 10.6228 9.04313 10.007C8.85943 9.09641 9.27981 8.20686 9.97622 7.63926C10.2706 7.39937 10.608 7.48133 10.782 7.79358L11.1749 8.49851C11.4864 9.05725 11.6421 9.33663 11.6112 9.63282C11.5803 9.929 11.3703 10.1702 10.9503 10.6527L9.79993 11.9741ZM9.79993 11.9741C10.6634 13.4797 12.0185 14.8356 13.5259 15.7001M13.5259 15.7001C14.2698 16.1267 14.8772 16.3327 15.493 16.4569C16.4036 16.6406 17.2931 16.2202 17.8607 15.5238C18.1006 15.2294 18.0187 14.892 17.7064 14.718L17.0015 14.3251C16.4427 14.0136 16.1634 13.8579 15.8672 13.8888C15.571 13.9197 15.3298 14.1297 14.8473 14.5497L13.5259 15.7001Z" /><path d="M5 6L2.5 6M5 12L2.5 12M5 18H2.5" /></svg>
                  +92 (21) 1234-5678
                </p>
                <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" className="inline-block align-middle mr-2"><path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" /><path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" /></svg>
                  info@AJ International.com
                </p>
                <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" className="inline-block align-middle mr-2"><path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" /><path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" /></svg>
                  Karachi, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200">© 2026 AJ International. | All rights reserved.</p>
              <div className="flex gap-10 mt-4 md:mt-0">
                <a  target='_blank' href="https://www.facebook.com/PKAJIC/" aria-label="Facebook" className="text-blue-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
                  <Facebook className="w-5 h-5" />
                </a>
                <a target='_blank' href="www.twitter.com" aria-label="Twitter" className="text-blue-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
                  <Twitter className="w-5 h-5" />
                </a>
                <a  target='_blank' href="https://www.linkedin.com/company/a-j-international-company/" aria-label="LinkedIn" className="text-blue-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default App;
