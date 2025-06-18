import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Shop from './pages/Shop';
import Education from './pages/Education';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Articles from './pages/Articles';
import About from './pages/About';
import Consult from './pages/Consult';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { AppointmentProvider } from './context/AppointmentContext';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <CartProvider>
        <AppointmentProvider>
          <div className="min-h-screen bg-green-50">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              {/* Public routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/education" element={<Education />} />
                <Route path="/profile" element={<Profile />} />

                {/* Protected routes - require authentication */}
                <Route 
                  path="/tracking" 
                  element={
                    <ProtectedRoute>
                      <Tracking />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/consult" 
                  element={
                    <ProtectedRoute>
                      <Consult />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
            <Cart />
          </div>
        </AppointmentProvider>
      </CartProvider>
    </Router>
  );
}

export default App; 