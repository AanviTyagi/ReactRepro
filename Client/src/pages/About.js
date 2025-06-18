import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-green-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Main About Section */}
        <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden mb-8">
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
              <h1 className="text-2xl font-bold text-green-800 mb-4">About ReproCare</h1>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                At ReproCare, we are dedicated to providing comprehensive reproductive health solutions 
                and education to empower individuals in their reproductive health journey. Our mission 
                is to make reproductive health information accessible, reliable, and easy to understand 
                for everyone.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                We believe that everyone deserves access to quality reproductive healthcare information 
                and resources. Through our platform, we strive to create a supportive community where 
                users can learn, track, and make informed decisions about their reproductive health.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission & Values Section */}
        <section className="max-w-5xl mx-auto my-8">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 text-green-700">Our Mission</h3>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                Our mission is to revolutionize how people approach and understand reproductive health. 
                We aim to break down barriers, eliminate stigma, and provide everyone with the tools 
                and knowledge they need to take control of their reproductive wellness journey.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm list-disc pl-5">
                <li>Making reproductive health information accessible to all</li>
                <li>Providing evidence-based education and resources</li>
                <li>Creating a supportive and inclusive community</li>
                <li>Empowering informed health decisions</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 text-green-700">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-green-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Privacy and Confidentiality</h4>
                    <p className="text-gray-600 text-sm">We prioritize your privacy and ensure your data is secure and confidential.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Evidence-Based Information</h4>
                    <p className="text-gray-600 text-sm">All our content is backed by scientific research and expert knowledge.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Accessibility and Inclusivity</h4>
                    <p className="text-gray-600 text-sm">Our platform is designed to be accessible and inclusive for everyone.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="text-green-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Continuous Improvement</h4>
                    <p className="text-gray-600 text-sm">We constantly update and improve our platform based on user feedback and needs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-md p-6 my-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Join Our Community</h2>
          <p className="text-gray-700 text-sm mb-6">
            Be part of a growing community dedicated to reproductive health and wellness. 
            Together, we can create a more informed and empowered future.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Get Started Today
          </Link>
        </section>
      </div>
    </div>
  );
}

export default About; 