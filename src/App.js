// Package setup for transport-management system
// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [view, setView] = useState('login'); // 'login', 'register', 'dashboard', 'bookings'
  const [user, setUser] = useState(null);
  const [priceListings, setPriceListings] = useState([]);
  const [formData, setFormData] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // User Login
  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', formData);
      setUser(res.data);
      setView('dashboard');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  // User Registration
  const handleRegister = async () => {
    try {
      await axios.post('/api/register', formData);
      alert('Registration successful!');
      setView('login');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  // Fetch Price Listings
  const fetchPriceListings = async () => {
    try {
      const res = await axios.get('/api/price-listings');
      setPriceListings(res.data);
    } catch (err) {
      alert('Error fetching price listings: ' + err.message);
    }
  };

  // Book Shipment
  const handleBooking = async (listing) => {
    try {
      const bookingData = {
        traderId: user.id,
        transporterId: listing.transporterId,
        route: listing.route,
        price: listing.price,
      };
      await axios.post('/api/book-shipment', bookingData);
      alert('Shipment booked successfully!');
    } catch (err) {
      alert('Error booking shipment: ' + err.message);
    }
  };

  // Render Views
  const renderLogin = () => (
    <div>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setView('register')}>Register</button>
    </div>
  );

  const renderRegister = () => (
    <div>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="gstNumber" placeholder="GST Number" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <select name="userType" onChange={handleChange}>
        <option value="Trader">Trader</option>
        <option value="Transporter">Transporter</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setView('login')}>Back to Login</button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>Dashboard</h2>
      <button onClick={fetchPriceListings}>View Transporters</button>
      <button onClick={() => setView('bookings')}>My Bookings</button>
      <div>
        {priceListings.map((listing, index) => (
          <div key={index} className="listing">
            <p>Route: {listing.route}</p>
            <p>Price: {listing.price}</p>
            <button onClick={() => handleBooking(listing)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h2>My Bookings</h2>
      <p>Feature Under Development</p>
      <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
    </div>
  );

  // Main Render
  return (
    <div className="App">
      {view === 'login' && renderLogin()}
      {view === 'register' && renderRegister()}
      {view === 'dashboard' && renderDashboard()}
      {view === 'bookings' && renderBookings()}
    </div>
  );
}

export default App;

// To Package:
// Steps:
// 1. Backend: Setup API and Database(Dummy) Route tested on localhost.
// 2. Frontend :  REACT environment and package.json setup required for NPM.
