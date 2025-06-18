import React from 'react';
import { Link } from 'react-router-dom';
import MoodCalendar from '../components/MoodCalendar';

const Home = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Welcome Section */}
      <section className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm my-6">
        <div className="flex items-center gap-6">
          <div className="w-2/5">
            <img src="/assets/images/ReproLOGO.jpg" alt="ReproCare Logo" className="rounded-lg w-full" />
          </div>
          <div className="w-3/5">
            <h1 className="text-4xl font-bold mb-3">Welcome to ReproCare</h1>
            <p className="text-base mb-4">Your go-to resource for all things reproductive health. Track, learn, and discover solutions tailored to your needs.</p>
          </div>
        </div>
      </section>

      {/* Mood Tracker Calendar Section */}
      <section className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm my-6">
        <h2 className="text-2xl font-bold mb-4">Mood Tracker Calendar</h2>
        <MoodCalendar />
      </section>

      {/* Why Choose ReproCare Section */}
      <section className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm my-8">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose ReproCare?</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-green-100 bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 mb-3">
              <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Personalized Tracking</h3>
            <p className="text-gray-600 text-sm">Track your mood, cycle, and symptoms with our personalized tools designed to help you understand your body better.</p>
          </div>
          
          <div className="border border-green-100 bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 mb-3">
              <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Educational Resources</h3>
            <p className="text-gray-600 text-sm">Access comprehensive articles, videos, and blogs about reproductive health, written by experts in the field.</p>
          </div>
          
          <div className="border border-green-100 bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 mb-3">
              <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Product Recommendations</h3>
            <p className="text-gray-600 text-sm">Discover vetted, high-quality products for your reproductive health needs, with honest reviews and guidance.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm my-8">
        <h2 className="text-2xl font-bold text-center mb-6">What Our Users Say</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-lg font-bold mr-3">P</div>
              <div>
                <h4 className="font-bold text-sm">Priya M.</h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="italic text-gray-600 text-sm">"ReproCare has completely changed how I understand my body. The tracking tools have helped me identify patterns I never noticed before."</p>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-lg font-bold mr-3">A</div>
              <div>
                <h4 className="font-bold text-sm">Ananya S.</h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="italic text-gray-600 text-sm">"The educational resources on ReproCare are amazing! I've learned so much about reproductive health that I was never taught in school."</p>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-lg font-bold mr-3">S</div>
              <div>
                <h4 className="font-bold text-sm">Sarah K.</h4>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="italic text-gray-600 text-sm">"The product recommendations are spot-on! I love how personalized the suggestions are based on my health data."</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-600 italic bg-green-50 p-6 rounded-lg max-w-2xl mx-auto">
            At ReproCare, we believe in empowering you with knowledge and tools to take charge of your reproductive health. Join thousands of users who trust us to support their wellness journey!
          </p>
        </div>
      </section>

      {/* About ReproCare Section */}
      <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm my-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left side with image */}
          <div className="relative h-64 md:h-full">
            <img 
              src="/assets/images/ReproLOGO.jpg" 
              alt="ReproCare Logo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-600 bg-opacity-20"></div>
          </div>
          
          {/* Right side with content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">About ReproCare</h2>
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              ReproCare is your ultimate companion for navigating the journey of reproductive health with confidence and clarity. We are a web-based platform designed to empower individuals by providing comprehensive resources, tools, and products tailored to reproductive wellness.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our mission is to break the stigma around reproductive health and make it accessible for everyone. Whether you're tracking your menstrual cycles, seeking educational content on fertility and menopause, or looking for premium reproductive health products, ReproCare has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm my-8">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
            <div className="text-green-600 mb-4 flex justify-center">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Education</h3>
            <p className="text-gray-600 text-sm text-center">Access expert articles, videos, and blogs on topics like menstrual health, prenatal care, and more.</p>
          </div>

          {/* Tracking Tools Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
            <div className="text-green-600 mb-4 flex justify-center">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Tracking Tools</h3>
            <p className="text-gray-600 text-sm text-center">Use our intuitive Mood Tracker Calendar to monitor your mood, health, and cycles effortlessly.</p>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:scale-105">
            <div className="text-green-600 mb-4 flex justify-center">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">Products</h3>
            <p className="text-gray-600 text-sm text-center">Shop a curated range of reproductive health products, from menstrual cups to fertility trackers.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-600 italic bg-green-50 p-6 rounded-lg max-w-2xl mx-auto">
            At ReproCare, we believe in empowering you with knowledge and tools to take charge of your reproductive health. Join thousands of users who trust us to support their wellness journey!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 