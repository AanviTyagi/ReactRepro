import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  
  // Slider images array with natural wellness themed images
  const sliderImages = [
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1200', // Calming green leaves and nature
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200', // Herbal tea and natural ingredients
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200'  // Peaceful garden herbs and flowers
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Malt',
      category: 'wellness',
      price: 799,
      image: '/assets/images/Malt',
      description: 'This is an Ayurvedic herbal blend designed to support women health, particularly during and after menopause.'
    },
    {
      id: 2,
      name: 'Organic Cotton Pads',
      category: 'essentials',
      price: 599,
      image: '/assets/images/organic pad.png',
      description: 'Eco-friendly and gentle organic cotton pads. Pack of 20.'
    },
    {
      id: 3,
      name: 'Menstrual Cup',
      category: 'essentials',
      price: 1499,
      image: '/assets/images/Menstrual Cup.jpg',
      description: 'Reusable silicone menstrual cup. Eco-friendly alternative.'
    },
    {
      id: 4,
      name: 'Pregnancy & Ovulation Kit 🧪',
      category: 'digital',
      price: 399,
      image: '/assets/images/Pregnancy kit',
      description: 'Accurate testing for pregnancy and ovulation.'
    },
    {
      id: 5,
      name: 'Herbal Tea for Cramps',
      category: 'wellness',
      price: 799,
      image: '/assets/images/Herbal _Tea',
      description: 'Natural herbal tea blend to help with menstrual cramps.'
    },
    {
      id: 6,
      name: 'Heating Pad',
      category: 'digital',
      price: 1299,
      image: '/assets/images/heating-pad.png',
      description: 'Electric heating pad for relief from menstrual cramps and pain.'
    },
    {
      id: 7,
      name: 'Tampons',
      category: 'wellness',
      price: 399,
      image: '/assets/images/Tampons.jpeg',
      description: 'High-quality, comfortable tampons for reliable protection. Pack of 20.'
    },
    {
      id: 8,
      name: 'Panty Liners',
      category: 'wellness',
      price: 199,
      image: '/assets/images/Panty Liners.webp',
      description: 'Ultra-thin, breathable panty liners for daily freshness. Pack of 30.'
    },
    {
      id: 9,
      name: 'Multivitamins Tablets',
      category: 'essential',
      price: 799,
      image: '/assets/images/Multivitamins',
      description: 'Complete daily multivitamin supplement for women\'s health. 60 tablets.'
    },
    {
      id: 10,
      name: 'Vitamin C',
      category: 'essential',
      price: 499,
      image: '/assets/images/Vitamin-C tablets',
      description: 'High-strength Vitamin C tablets for immunity support. 90 tablets.'
    },
    {
      id: 11,
      name: 'Fish Oil Capsules',
      category: 'essential',
      price: 899,
      image: '/assets/images/Fish-oil',
      description: 'Omega-3 rich fish oil capsules for heart and brain health. 60 capsules.'
    },
    {
      id: 12,
      name: 'Probiotics',
      category: 'essential',
      price: 699,
      image: '/assets/images/Probiotics',
      description: 'Daily probiotic supplement for gut health and immunity. 30 capsules.'
    },
    {
      id: 13,
      name: 'Iron Tablets',
      category: 'wellness',
      price: 599,
      image: '/assets/images/Iron Tablets',
      description: 'Iron supplements for maintaining healthy iron levels. 60 tablets.'
    },
    {
      id: 14,
      name: 'Cup Sterilizer',
      category: 'digital',
      price: 1299,
      image: '/assets/images/Cup sterilizer',
      description: 'Electric sterilizer for cleaning and sanitizing menstrual cups.'
    }
  ];
  
  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Slider */}
        <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-xl">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Slide Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-green-600' : 'bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-900 sm:text-5xl">
            Reproductive Health Products
          </h1>
          <p className="mt-3 text-xl text-green-700">
            Curated products for your reproductive health and wellness.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 hover:bg-green-100'
              } border border-green-300`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveCategory('essentials')}
              className={`px-4 py-2 text-sm font-medium ${
                activeCategory === 'essentials'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 hover:bg-green-100'
              } border-t border-b border-green-300`}
            >
              Essentials
            </button>
            <button
              onClick={() => setActiveCategory('wellness')}
              className={`px-4 py-2 text-sm font-medium ${
                activeCategory === 'wellness'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 hover:bg-green-100'
              } border-t border-b border-green-300`}
            >
              Wellness
            </button>
            <button
              onClick={() => setActiveCategory('digital')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeCategory === 'digital'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 hover:bg-green-100'
              } border border-green-300`}
            >
              Digital
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div className="relative pt-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-green-900">{product.name}</h3>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    {product.category}
                  </span>
                </div>
                <p className="mt-2 text-green-700 text-sm">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-900 font-bold">₹{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors transform hover:scale-105 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop; 