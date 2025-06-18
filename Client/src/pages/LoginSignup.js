import React from 'react';
import { Link } from 'react-router-dom';

function LoginSignup() {
  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login / Sign Up</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Login
          </button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account? <button className="text-green-600 hover:text-green-700">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup; 