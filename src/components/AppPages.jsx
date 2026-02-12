import React, { useState } from 'react';
import { ArrowRight, Check, ChevronRight, CreditCard, Package, ShoppingCart, Star, Trash2, Truck } from 'lucide-react';

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 animate-pulse flex items-center justify-center">
          <Package className="w-12 h-12 text-blue-300" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={className + ' flex-shrink-0'}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23e0f2fe"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%230284c7"%3EOrthopedic Implant%3C/text%3E%3C/svg%3E';
        }}
      />
    </div>
  );
};

const HomePage = ({ setPage, setSelectedProduct, products }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full text-blue-600 font-semibold text-sm mb-4 animate-bounce-subtle">
            ✨ Premium Orthopedic Solutions
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            <span className="block mb-2">Transform Lives with</span>
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent animate-gradient text-6xl md:text-8xl">
              Advanced Implant Technology
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Delivering world-class orthopedic implants across Pakistan with unmatched quality and precision
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => setPage('products')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 focus:outline-none"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => setPage('about')}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-100 focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Why Choose <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">OrthoMed?</span></h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: 'Premium Quality', desc: 'FDA approved implants from leading manufacturers worldwide' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Express shipping across Pakistan within 24-48 hours' },
              { icon: CreditCard, title: 'Secure Payment', desc: 'Multiple payment options including Cash on Delivery' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20 smooth-hover"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="py-24 px-4 bg-gradient-to-b from-transparent to-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular orthopedic implants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {products.slice(0, 3).map((product, idx) => (
              <div
                key={product.id}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer smooth-hover"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div
                  className="relative overflow-hidden h-64 bg-white cursor-pointer"
                  onClick={() => { setSelectedProduct(product); setPage('product-detail'); }}
                >
                  <ProductImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full px-4 py-2 shadow-lg text-white font-bold">
                    Rs {(product.price / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">{product.category}</p>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setPage('products')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 focus:outline-none"
            >
              View All Products
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ setPage }) => {
  return (
    <div id='about' className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 font-semibold text-sm mb-5">
            About OrthoMed
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Trusted Orthopedic Care Partner
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We provide high-performance orthopedic implants with clinical reliability, fast
            logistics, and quality-first service for healthcare teams across Pakistan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Package, title: 'Clinical Quality', desc: 'Strict sourcing and quality checks to support safer patient outcomes.' },
            { icon: Truck, title: 'Operational Reliability', desc: 'Consistent inventory planning and responsive supply for hospitals and clinics.' },
            { icon: CreditCard, title: 'Customer Commitment', desc: 'Professional guidance before and after purchase with clear communication.' }
          ].map((item) => (
            <div key={item.title} className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-10 text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Surgeons. Focused on Patients.</h2>
          <p className="text-blue-50 text-lg max-w-3xl leading-relaxed">
            Our product portfolio is designed to support precision procedures and long-term
            recovery goals, backed by practical support for medical teams at every step.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setPage('products')}
              className="px-7 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              View Products
            </button>
            <button
              onClick={() => setPage('home')}
              className="px-7 py-3 bg-white/20 border border-white/40 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyPage = ({ setPage }) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            This policy explains how OrthoMed collects, uses, and protects your information.
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
              <p>
                We may collect contact details, order details, and communication records for service and support purposes.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2. How We Use Information</h2>
              <p>
                Data is used to process orders, improve service quality, communicate updates, and provide customer support.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Data Protection</h2>
              <p>
                We apply reasonable administrative and technical safeguards to protect your information against unauthorized access.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Contact</h2>
              <p>
                For privacy-related questions, contact us using the details provided in the footer.
              </p>
            </section>
          </div>

          <div className="mt-10">
            <button
              onClick={() => setPage('home')}
              className="px-7 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TermsPage = ({ setPage }) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            These terms govern the use of OrthoMed services and product purchases.
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Product Use</h2>
              <p>
                OrthoMed products are intended for qualified medical professionals and authorized healthcare facilities.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Pricing and Orders</h2>
              <p>
                Product pricing and availability are subject to change without prior notice. Orders are confirmed only after formal acceptance.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Warranty and Liability</h2>
              <p>
                We provide products according to applicable quality standards. Liability is limited to the extent permitted by applicable law.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Contact</h2>
              <p>
                For questions related to these terms, contact us using the details provided in the footer.
              </p>
            </section>
          </div>

          <div className="mt-10">
            <button
              onClick={() => setPage('home')}
              className="px-7 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = ({ products, setSelectedProduct, setPage, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Our Products</h1>
          <p className="text-xl text-gray-600">Premium orthopedic implants for every need</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 animate-fade-in-up smooth-hover"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative overflow-hidden h-72 bg-white cursor-pointer"
                onClick={() => { setSelectedProduct(product); setPage('product-detail'); }}
              >
                <ProductImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full px-4 py-2 shadow-lg text-white font-bold">
                  Rs {(product.price / 1000).toFixed(0)}k
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">{product.category}</p>
                <h3
                  className="text-xl font-bold mb-3 text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => { setSelectedProduct(product); setPage('product-detail'); }}
                >
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 smooth-hover"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center mt-10 text-gray-600 font-semibold">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

const ProductDetail = ({ product, setPage, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen py-10 md:py-16 px-4 page-transition">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setPage('products')}
          className="mb-6 md:mb-8 bg-white text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group button-transition focus:outline-none"
        >
          <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8 animate-fade-in-up smooth-hover">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 h-80 sm:h-96 md:h-[460px] p-4 sm:p-6 flex items-center justify-center group">
            <ProductImage src={product.image} alt={product.name} className="w-full h-full max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
              {product.category}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5 md:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4 md:mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600 font-semibold">({product.rating}.0 Rating)</span>
              </div>
            </div>

            <div className="py-4 md:py-6 border-y border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Rs {product.price.toLocaleString()}</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-gray-900">📋 Product Specifications</h3>
              <p className="text-gray-700 leading-relaxed font-light">{product.specs}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-teal-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                <span className="text-gray-900 font-bold text-lg">Quantity:</span>
                <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 bg-white rounded-lg p-2 sm:p-3 border-2 border-gray-300 shadow-md w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center button-transition text-lg font-bold focus:outline-none"
                  >
                    -
                  </button>
                  <span className="text-2xl sm:text-3xl font-bold w-12 sm:w-16 text-center text-blue-600">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center button-transition text-lg font-bold focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => { addToCart(product, quantity); setPage('cart'); }}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 button-transition focus:outline-none"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, updateQuantity, removeFromCart, cartTotal, setPage }) => {
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <button
            onClick={() => setPage('products')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-gray-900 animate-fade-in-up">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-40 h-40 sm:w-32 sm:h-32 mx-auto sm:mx-0 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden flex-shrink-0 p-2 flex items-center justify-center">
                    <ProductImage src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">Rs {item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="order-2 sm:order-1 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="order-1 sm:order-2 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-lg font-bold text-gray-700"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-lg font-bold text-gray-900 tabular-nums">
                        {Number.isFinite(item.quantity) ? item.quantity : 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-lg font-bold text-gray-700"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl lg:sticky lg:top-24 animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8 text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">Rs {cartTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={() => setPage('checkout')}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cartTotal, setShowSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-gray-900 animate-fade-in-up">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Shipping Information */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                  placeholder="Dr. Ahmed Khan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                  placeholder="doctor@hospital.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-black placeholder-gray-500"
                  placeholder="Hospital/Clinic address with street details"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black"
                >
                  <option value="">Select City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="faisalabad">Faisalabad</option>
                  <option value="multan">Multan</option>
                  <option value="peshawar">Peshawar</option>
                  <option value="quetta">Quetta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Method</h2>

            <div className="space-y-4">
              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'cod'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'cod' ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                      {paymentMethod === 'cod' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-scale-in"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive the product</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                </div>
              </div>

              {/* Debit/Credit Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-scale-in"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-900">Debit / Credit Card</p>
                      <p className="text-sm text-gray-600">Visa, MasterCard, and Pakistani bank cards</p>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-black placeholder-gray-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded text-xs font-bold">VISA</div>
                      <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded text-xs font-bold">MasterCard</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 shadow-xl text-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Order Total</span>
              <span className="text-4xl font-bold">Rs {cartTotal.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Place Order
            </button>

            <p className="text-center text-sm text-blue-100 mt-4">
              By placing this order, you agree to our Terms & Conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessModal = ({ setShowSuccess, setPage, setCart }) => {
  const handleClose = () => {
    setShowSuccess(false);
    setCart([]);
    setPage('home');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl transform animate-scale-in">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <Check className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for your order. We'll contact you shortly to confirm your delivery details.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export {
  HomePage,
  AboutPage,
  PrivacyPolicyPage,
  TermsPage,
  ProductsPage,
  ProductDetail,
  CartPage,
  CheckoutPage,
  SuccessModal,
};
