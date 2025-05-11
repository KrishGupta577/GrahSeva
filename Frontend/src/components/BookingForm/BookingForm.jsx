import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import './BookingForm.css';
import { MyContext } from '../../Context/ContextStore'; // Adjust path as needed
import toast from 'react-hot-toast';
import axios from 'axios';

const BookingForm = ({ service, onClose, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { userInfo, url, refreshActiveServices } = useContext(MyContext);

    // React Hook Form setup with validation
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            timeSlot: '',
            date: '',
            address: '',
            city: '',
            pincode: '',
            notes: ''
        }
    });

    const onFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const activeServiceData = {
                serviceTitle: service.serviceName,
                providerName: service.providerName || "Available Provider",
                rating: 0,
                date: data.date,
                timeSlot: data.time,
                address: `${data.address}, ${data.city}, ${data.pincode}`,
                price: service.price,
                status: "Scheduled",
                user: {
                    id: userInfo.id
                }
            };

            const response = await axios.post(url + '/active-services', activeServiceData);
            console.log('Booking submitted successfully. Response:', response.data);
            refreshActiveServices()
            toast.success('Booking successfully')
            onclose
        } catch (error) {
            console.error('Error submitting booking:', error);
            toast.error('Failed to book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get tomorrow's date in YYYY-MM-DD format for min date attribute
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Generate time slots from 8 AM to 8 PM
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 8; hour <= 20; hour++) {
            const formattedHour = hour.toString().padStart(2, '0');
            slots.push(`${formattedHour}:00`);
            if (hour < 20) {
                slots.push(`${formattedHour}:30`);
            }
        }
        return slots;
    };

    return (
        <div className="booking-form-overlay">
            <div className="booking-form-container">
                <div className="booking-form-header">
                    <h2>Book {service.serviceName}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="service-summary">
                    <div className="service-icon">
                        {service.icon || '🛠️'}
                    </div>
                    <div className="service-details">
                        <h3>{service.serviceName}</h3>
                        <p className="service-price">₹{service.price}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="form-section">
                        <h3>Contact Information</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={userInfo.name}
                                disabled
                                className="form-control-disabled"
                            />
                            <p className="field-note">Using your profile information</p>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    value={userInfo.phone || ''}
                                    disabled
                                    className="form-control-disabled"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={userInfo.email || ''}
                                    disabled
                                    className="form-control-disabled"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Service Address</h3>
                        <div className="form-group">
                            <label htmlFor="address">Address *</label>
                            <input
                                type="text"
                                id="address"
                                className={errors.address ? 'error' : ''}
                                {...register('address', {
                                    required: 'Address is required'
                                })}
                            />
                            {errors.address && <span className="error-message">{errors.address.message}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    className={errors.city ? 'error' : ''}
                                    {...register('city', {
                                        required: 'City is required'
                                    })}
                                />
                                {errors.city && <span className="error-message">{errors.city.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="pincode">Pincode *</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    className={errors.pincode ? 'error' : ''}
                                    {...register('pincode', {
                                        required: 'Pincode is required',
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message: 'Please enter a valid 6-digit pincode'
                                        }
                                    })}
                                />
                                {errors.pincode && <span className="error-message">{errors.pincode.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Schedule Service</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="date">Service Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    min={getTomorrowDate()}
                                    className={errors.date ? 'error' : ''}
                                    {...register('date', {
                                        required: 'Date is required'
                                    })}
                                />
                                {errors.date && <span className="error-message">{errors.date.message}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="time">Time Slot *</label>
                                <select
                                    id="time"
                                    className={errors.time ? 'error' : ''}
                                    {...register('time', {
                                        required: 'Time is required'
                                    })}
                                >
                                    <option value="">Select a time</option>
                                    {generateTimeSlots().map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                                {errors.time && <span className="error-message">{errors.time.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Additional Information</h3>
                        <div className="form-group">
                            <label htmlFor="notes">Special Instructions (Optional)</label>
                            <textarea
                                id="notes"
                                rows="3"
                                {...register('notes')}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Payment Details</h3>
                        <div className="payment-summary">
                            <div className="payment-row">
                                <span>Service Fee</span>
                                <span>₹{service.price}</span>
                            </div>
                            <div className="payment-row total">
                                <span>Total Amount</span>
                                <span>₹{service.price}</span>
                            </div>
                            <p className="payment-note">Payment will be collected after service completion</p>
                        </div>
                    </div>

                    <div className="booking-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;