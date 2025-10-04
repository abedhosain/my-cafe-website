import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, Calendar, ShoppingBag, BookOpen, Image, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ChevronRight, Clock, Award, Heart, CreditCard, CheckCircle, AlertCircle, User, Lock, ShieldCheck, Star, Droplet, Zap } from 'lucide-react';

const DolceCafeWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    eventType: 'table'
  });
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: 'card'
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const cookieConsent = window.localStorage.getItem('dolceCookieConsent');
    if (cookieConsent === 'accepted') {
      setShowCookieConsent(false);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem('dolceCookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const menuItems = [
    { id: 1, name: 'Espresso', price: 3.50, category: 'Coffee', description: 'Rich and bold Italian espresso', icon: Coffee },
    { id: 2, name: 'Cappuccino', price: 4.50, category: 'Coffee', description: 'Creamy espresso with steamed milk', icon: Coffee },
    { id: 3, name: 'Latte', price: 4.75, category: 'Coffee', description: 'Smooth espresso with velvety milk', icon: Coffee },
    { id: 4, name: 'Cold Brew', price: 5.00, category: 'Coffee', description: 'Smooth refreshing cold-steeped coffee', icon: Droplet },
    { id: 5, name: 'Croissant', price: 3.50, category: 'Pastries', description: 'Buttery flaky French pastry', icon: Star },
    { id: 6, name: 'Chocolate Cake', price: 5.50, category: 'Pastries', description: 'Decadent dark chocolate cake', icon: Star },
    { id: 7, name: 'Avocado Toast', price: 8.50, category: 'Food', description: 'Fresh avocado on artisan bread', icon: Zap },
    { id: 8, name: 'Bagel Cream Cheese', price: 4.50, category: 'Food', description: 'Toasted bagel with herb cream cheese', icon: Zap }
  ];

  const products = [
    { id: 9, name: 'Premium Coffee Beans', price: 18.99, category: 'Merchandise', description: 'Ethiopian single-origin beans 250g', icon: Coffee },
    { id: 10, name: 'DOLCE Mug', price: 12.99, category: 'Merchandise', description: 'Premium ceramic mug with logo', icon: Coffee },
    { id: 11, name: 'Gift Card $25', price: 25.00, category: 'Merchandise', description: 'Perfect gift for coffee lovers', icon: Award },
    { id: 12, name: 'Coffee Grinder', price: 45.99, category: 'Merchandise', description: 'Manual ceramic burr grinder', icon: Award }
  ];

  const galleryItems = [
    { title: 'Artisan Brewing', icon: Coffee, color: 'from-amber-900 to-amber-700' },
    { title: 'Fresh Pastries', icon: Star, color: 'from-orange-900 to-orange-700' },
    { title: 'Cozy Atmosphere', icon: Heart, color: 'from-red-900 to-red-700' },
    { title: 'Expert Baristas', icon: Award, color: 'from-yellow-900 to-yellow-700' },
    { title: 'Premium Beans', icon: Coffee, color: 'from-brown-900 to-brown-700' },
    { title: 'Community Space', icon: Heart, color: 'from-pink-900 to-pink-700' }
  ];

  const blogPosts = [
    {
      title: 'The Art of Perfect Espresso',
      date: 'Oct 1, 2025',
      excerpt: 'Discover the secrets behind pulling the perfect shot of espresso and creating amazing coffee experiences.',
      icon: Coffee,
      gradient: 'from-amber-900 to-amber-700'
    },
    {
      title: 'Sustainable Coffee Sourcing',
      date: 'Sep 28, 2025',
      excerpt: 'Learn about our commitment to ethically sourced coffee beans and sustainable farming practices.',
      icon: Heart,
      gradient: 'from-green-900 to-green-700'
    },
    {
      title: 'Latte Art Masterclass',
      date: 'Sep 25, 2025',
      excerpt: 'Join us for our monthly workshop on creating beautiful latte art designs and techniques.',
      icon: Star,
      gradient: 'from-purple-900 to-purple-700'
    }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${bookingData.name} on ${bookingData.date} at ${bookingData.time}`);
    setShowBookingModal(false);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      eventType: 'table'
    });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert(`Order confirmed! Total: $${getTotalPrice()}. Confirmation sent to ${checkoutData.email}`);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setCheckoutData({
      name: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      paymentMethod: 'card'
    });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-300">
                We use cookies to enhance your browsing experience serve personalized content and analyze our traffic. 
                By clicking Accept All you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCookieConsent(false)}
                className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-white text-black hover:bg-gray-200 transition-colors font-semibold"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowCart(false)}>
          <div className="bg-white max-w-2xl w-full max-h-screen overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Shopping Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.id} className="flex gap-4 border-b pb-4 items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                          <ItemIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-gray-600">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 bg-black text-white hover:bg-gray-800"
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 bg-black text-white hover:bg-gray-800"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="ml-4 text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="font-bold text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-black text-white py-4 text-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full my-8 p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Secure Checkout</h2>
              <button onClick={() => setShowCheckout(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={checkoutData.name}
                    onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={checkoutData.email}
                    onChange={e => setCheckoutData({...checkoutData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    required
                    value={checkoutData.address}
                    onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={checkoutData.city}
                      onChange={e => setCheckoutData({...checkoutData, city: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      required
                      value={checkoutData.zipCode}
                      onChange={e => setCheckoutData({...checkoutData, zipCode: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h3>
                <div className="flex gap-4 mb-4 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={checkoutData.paymentMethod === 'card'}
                      onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={checkoutData.paymentMethod === 'paypal'}
                      onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    />
                    <span>PayPal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={checkoutData.paymentMethod === 'stripe'}
                      onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    />
                    <span>Stripe</span>
                  </label>
                </div>

                {checkoutData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      required
                      value={checkoutData.cardNumber}
                      onChange={e => setCheckoutData({...checkoutData, cardNumber: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={checkoutData.expiry}
                        onChange={e => setCheckoutData({...checkoutData, expiry: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        required
                        value={checkoutData.cvv}
                        onChange={e => setCheckoutData({...checkoutData, cvv: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-100 p-6 rounded">
                <h3 className="font-bold mb-4 text-lg">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-gray-300 mt-4 pt-4 flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded">
                <Lock className="w-5 h-5" />
                <span>Your payment information is encrypted and secure with SSL protection</span>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 text-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Complete Secure Purchase ${getTotalPrice()}
              </button>
            </form>
          </div>
        </div>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white max-w-2xl w-full p-6 rounded-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="w-8 h-8" />
                Make a Reservation
              </h2>
              <button onClick={() => setShowBookingModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={bookingData.name}
                  onChange={e => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={bookingData.email}
                  onChange={e => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
                />
              </div>
              
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={bookingData.phone}
                onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
              />
              
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="date"
                  required
                  value={bookingData.date}
                  onChange={e => setBookingData({...bookingData, date: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
                />
                <input
                  type="time"
                  required
                  value={bookingData.time}
                  onChange={e => setBookingData({...bookingData, time: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
                />
                <select
                  value={bookingData.guests}
                  onChange={e => setBookingData({...bookingData, guests: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>
              
              <select
                value={bookingData.eventType}
                onChange={e => setBookingData({...bookingData, eventType: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black rounded"
              >
                <option value="table">Table Reservation</option>
                <option value="workshop">Workshop Event</option>
                <option value="private">Private Event</option>
              </select>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-4 text-lg font-bold hover:bg-gray-800 transition-colors rounded"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black shadow-2xl py-4' : 'bg-black bg-opacity-90 py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Coffee className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">DOLCE Cafeee</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'Menu', 'Shop', 'About', 'Blog', 'Gallery', 'Events', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setShowCart(true)}
                className="relative text-white hover:text-gray-300 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black text-white py-4 px-4 space-y-3">
            {['Home', 'Menu', 'Shop', 'About', 'Blog', 'Gallery', 'Events', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 hover:text-gray-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                setShowCart(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 hover:text-gray-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Cart ({cart.length})
            </button>
          </div>
        )}
      </nav>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="coffee-bean bean-1"></div>
            <div className="coffee-bean bean-2"></div>
            <div className="coffee-bean bean-3"></div>
            <div className="coffee-bean bean-4"></div>
            <div className="coffee-bean bean-5"></div>
            <div className="coffee-bean bean-6"></div>
          </div>
          
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 gap-4 h-full p-8">
              {[...Array(60)].map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl animate-fadeIn">
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <Coffee className="w-24 h-24 mx-auto text-white animate-float" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter relative">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              DOLCE
            </span>
            <br />
            <span className="text-6xl md:text-8xl font-light tracking-wider">
              Cafeee
            </span>
          </h1>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <Coffee className="w-6 h-6 mx-4" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>

          <p className="text-3xl md:text-4xl mb-4 font-light tracking-widest text-gray-200">
            Sip. Savor. Smile.
          </p>
          
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light text-gray-300 leading-relaxed">
            Where every sip tells a story of passion quality and craftsmanship
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#menu" 
              className="group relative px-12 py-5 text-lg font-bold overflow-hidden bg-white text-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Menu</span>
            </a>
            
            <a 
              href="#contact" 
              className="group relative px-12 py-5 text-lg font-bold border-2 border-white text-white transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black"
            >
              <span className="relative z-10">Visit Us</span>
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2 tracking-widest">SCROLL</span>
              <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center transform hover:scale-105 transition-transform duration-300 p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">Ethically sourced expertly roasted coffee beans from around the world</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300 p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Community First</h3>
              <p className="text-gray-600">A warm space designed for connection creativity and comfort</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300 p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Always Fresh</h3>
              <p className="text-gray-600">Handcrafted daily with attention to every detail</p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Menu</h2>
            <p className="text-xl text-gray-600">Crafted with passion served with love</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={item.id}
                  className="bg-white border-2 border-black hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                    <ItemIcon className="w-20 h-20 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="shop" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Coffee Shop</h2>
            <p className="text-xl text-gray-300">Premium beans merchandise and gift cards</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={item.id}
                  className="bg-white text-black hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
                    <ItemIcon className="w-20 h-20 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Secure SSL Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>PayPal Stripe Cards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                DOLCE Cafeee was born from a simple passion to create exceptional coffee experiences that bring people together. Every cup we serve is a testament to our commitment to quality sustainability and community.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                We source our beans from ethical farms around the world roast them to perfection and serve them in a space designed to feel like your second home. Whether you are here to work connect or simply enjoy a moment of peace we are here for you.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 border-l-4 border-black">
                  <Coffee className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Premium Sourcing</h4>
                    <p className="text-gray-600">Ethically sourced from sustainable farms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 border-l-4 border-black">
                  <Heart className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Community Focused</h4>
                    <p className="text-gray-600">Building connections one cup at a time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 border-l-4 border-black">
                  <Award className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Expert Craftsmanship</h4>
                    <p className="text-gray-600">Every drink is a work of art</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 md:h-full">
              <div className="w-full h-full bg-gradient-to-br from-amber-900 via-amber-700 to-amber-900 flex items-center justify-center p-12">
                <Coffee className="w-full h-full text-white opacity-20" strokeWidth={0.5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Coffee className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-3xl font-bold">Passion in</p>
                    <p className="text-3xl font-bold">Every Cup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-white">
            <h2 className="text-5xl font-bold mb-4">Gallery</h2>
            <p className="text-xl text-gray-300">Moments captured at DOLCE Cafeee</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={index}
                  className={`relative overflow-hidden group h-72 bg-gradient-to-br ${item.color} flex items-center justify-center cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative z-10 text-center text-white transform group-hover:scale-110 transition-transform">
                    <ItemIcon className="w-16 h-16 mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Latest Stories</h2>
            <p className="text-xl text-gray-600">Insights from the world of coffee</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const PostIcon = post.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border-2 border-black overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                    <PostIcon className="w-20 h-20 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <a href="#blog" className="inline-flex items-center text-black font-semibold hover:underline">
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join us for special experiences</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-black p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Latte Art Workshop</h3>
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                October 15 2025 | 2:00 PM - 4:00 PM
              </p>
              <p className="text-gray-600 mb-6">Learn the art of creating beautiful latte designs from our expert baristas.</p>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                Reserve Your Spot
              </button>
            </div>
            
            <div className="bg-white border-2 border-black p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Coffee Tasting Night</h3>
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                October 22 2025 | 6:00 PM - 8:00 PM
              </p>
              <p className="text-gray-600 mb-6">Explore different coffee origins and roasting profiles in this guided tasting.</p>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                Reserve Your Spot
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Visit Us</h2>
            <p className="text-xl text-gray-600">We would love to see you</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border-l-4 border-black">
                <MapPin className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Location</h3>
                  <p className="text-gray-700">123 Coffee Street<br />Downtown District<br />Your City ST 12345</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border-l-4 border-black">
                <Clock className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 7:00 AM - 8:00 PM<br />Saturday - Sunday: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gray-50 border-l-4 border-black">
                <Phone className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Contact</h3>
                  <p className="text-gray-700">Phone: (555) 123-4567<br />Email: info@dolcecafeee.com</p>
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://facebook.com" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-black text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
                <input 
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-white text-black border-2 border-gray-300 focus:outline-none focus:border-gray-500 transition-colors duration-300"
                />
                <input 
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-white text-black border-2 border-gray-300 focus:outline-none focus:border-gray-500 transition-colors duration-300"
                />
                <textarea 
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white text-black border-2 border-gray-300 focus:outline-none focus:border-gray-500 transition-colors duration-300"
                ></textarea>
                <button type="submit" className="w-full bg-white text-black px-6 py-4 text-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-300 mb-8">Subscribe to our newsletter for updates promotions and coffee tips</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
            <input 
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-white text-black text-lg focus:outline-none"
            />
            <button type="submit" className="bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coffee className="w-8 h-8" />
                <span className="text-xl font-bold">DOLCE Cafeee</span>
              </div>
              <p className="text-gray-400 mb-4">Where every sip tells a story.</p>
              <p className="text-sm text-gray-500">Domain: www.dolcecafeee.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#menu" className="block text-gray-400 hover:text-white transition-colors">Menu</a>
                <a href="#shop" className="block text-gray-400 hover:text-white transition-colors">Shop</a>
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#events" className="block text-gray-400 hover:text-white transition-colors">Events</a>
                <a href="#blog" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>info@dolcecafeee.com</p>
                <p>orders@dolcecafeee.com</p>
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Use</a>
                <a href="#cookie" className="block text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                <a href="#accessibility" className="block text-gray-400 hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p className="mb-2">&copy; 2025 DOLCE Cafeee. All rights reserved.</p>
            <p className="flex items-center justify-center gap-2 text-xs mb-2">
              <ShieldCheck className="w-4 h-4" />
              Secured with SSL | GDPR Compliant | WCAG 2.1 Accessible
            </p>
            <p className="text-xs">SEO: coffee shop near me best cafe artisan coffee DOLCE Cafeee specialty coffee cozy cafe sustainable coffee</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatBean {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(100px, -100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .coffee-bean {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(139, 69, 19, 0.4));
          border-radius: 50% 50% 50% 0;
          animation: floatBean linear infinite;
          opacity: 0;
        }

        .bean-1 {
          left: 10%;
          animation-duration: 15s;
          animation-delay: 0s;
          width: 30px;
          height: 30px;
        }

        .bean-2 {
          left: 25%;
          animation-duration: 18s;
          animation-delay: 2s;
          width: 45px;
          height: 45px;
        }

        .bean-3 {
          left: 50%;
          animation-duration: 20s;
          animation-delay: 4s;
          width: 35px;
          height: 35px;
        }

        .bean-4 {
          left: 70%;
          animation-duration: 16s;
          animation-delay: 1s;
          width: 40px;
          height: 40px;
        }

        .bean-5 {
          left: 85%;
          animation-duration: 22s;
          animation-delay: 3s;
          width: 38px;
          height: 38px;
        }

        .bean-6 {
          left: 40%;
          animation-duration: 19s;
          animation-delay: 5s;
          width: 32px;
          height: 32px;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%);
        }
        
        html {
          scroll-behavior: smooth;
        }

        *:focus-visible {
          outline: 3px solid #000;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DolceCafeWebsite;
