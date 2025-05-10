import { useContext } from 'react';
import './ActiveServices.css';
import { MyContext } from '../../Context/ContextStore';

const ActiveServices = ({ limit }) => {

  const {activeServices} = useContext(MyContext)

  // const services = [
  //   {
  //     id: 1,
  //     serviceName: "Plumbing Repairs",
  //     providerName: "Rajesh Kumar",
  //     status: "In Progress", 
  //     date: "April 18, 2025",
  //     time: "10:00 AM - 1:00 PM",
  //     address: "123 Park Street, Sector 18, Noida",
  //     price: "₹800",
  //     providerImage: "/api/placeholder/50/50",
  //     providerRating: 4.8,
  //   },
  //   {
  //     id: 2,
  //     serviceName: "House Cleaning",
  //     providerName: "Maya Sharma",
  //     status: "Scheduled", 
  //     date: "April 20, 2025",
  //     time: "9:00 AM - 12:00 PM",
  //     address: "45 Green Avenue, Malviya Nagar, Delhi",
  //     price: "₹1,200",
  //     providerImage: "/api/placeholder/50/50",
  //     providerRating: 4.6,
  //   },
  //   {
  //     id: 3,
  //     serviceName: "Electrical Repairs",
  //     providerName: "Sanjay Verma",
  //     status: "Confirmed", 
  //     date: "April 22, 2025",
  //     time: "2:00 PM - 4:00 PM",
  //     address: "123 Park Street, Sector 18, Noida",
  //     price: "₹950",
  //     providerImage: "/api/placeholder/50/50",
  //     providerRating: 4.7,
  //   }
  // ];

  const displayServices = limit ? activeServices.slice(0, limit) : activeServices;

  const getStatusClass = (status) => {
    switch(status) {
      case 'In Progress':
        return 'status-progress';
      case 'Scheduled':
        return 'status-scheduled';
      case 'Confirmed':
        return 'status-confirmed';
      default:
        return '';
    }
  };

  return (
    <div className="active-services">
      {displayServices.length === 0 ? (
        <div className="no-services">
          <p>You don't have any active services.</p>
          <button className="btn-primary">Find Services</button>
        </div>
      ) : (
        displayServices.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-header">
              <div className="service-provider">
                <div>
                  <h4>{service.serviceName}</h4>
                  <p>by {service.providerName} <span className="provider-rating">★ {service.providerRating}</span></p>
                </div>
              </div>
              <div className={`service-status ${getStatusClass(service.status)}`}>
                {service.status}
              </div>
            </div>
            
            <div className="service-details">
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <span>{service.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🕒</span>
                <span>{service.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>{service.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💰</span>
                <span>{service.price}</span>
              </div>
            </div>
            
            <div className="service-actions">
              <button className="btn-outline">Contact Provider</button>
              <button className="btn-primary">View Details</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveServices;