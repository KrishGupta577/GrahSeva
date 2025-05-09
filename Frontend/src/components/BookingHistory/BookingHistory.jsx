// BookingHistory.jsx
import React, { useState } from 'react';
import './BookingHistory.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: 'Plumbing',
      provider: 'Raj Kumar',
      date: '2025-04-10',
      status: 'Completed',
      rating: 4.5,
    },
    {
      id: 2,
      service: 'House Cleaning',
      provider: 'Meera Singh',
      date: '2025-04-05',
      status: 'Completed',
      rating: 5,
    },
    {
      id: 3,
      service: 'Electrician',
      provider: 'Vikram Patel',
      date: '2025-04-15',
      status: 'Scheduled',
      rating: null,
    },
    {
      id: 4,
      service: 'Gardening',
      provider: 'Anita Sharma',
      date: '2025-03-28',
      status: 'Completed',
      rating: 4,
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Scheduled': return 'status-scheduled';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="booking-history">
      <div className="page-header">
        <h1>Booking History</h1>
        <p>Track all your past and upcoming service appointments</p>
      </div>

      <div className="booking-filters">
        <select defaultValue="all">
          <option value="all">All Bookings</option>
          <option value="completed">Completed</option>
          <option value="scheduled">Scheduled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input type="month" placeholder="Filter by month" />
        <button className="btn-primary">Apply Filters</button>
      </div>

      <div className="bookings-container">
        {bookings.map(booking => (
          <div className="booking-card" key={booking.id}>
            <div className="booking-header">
              <h3>{booking.service}</h3>
              <span className={`booking-status ${getStatusClass(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="booking-details">
              <p><strong>Service Provider:</strong> {booking.provider}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-IN', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</p>
              {booking.rating && (
                <div className="booking-rating">
                  <strong>Your Rating:</strong>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= booking.rating ? 'star filled' : 'star'}>★</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="booking-actions">
              {booking.status === 'Completed' && !booking.rating && (
                <button className="btn-secondary">Leave Review</button>
              )}
              {booking.status === 'Scheduled' && (
                <>
                  <button className="btn-outline">Reschedule</button>
                  <button className="btn-outline cancel">Cancel</button>
                </>
              )}
              <button className="btn-outline">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;