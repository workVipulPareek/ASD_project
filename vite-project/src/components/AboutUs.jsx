import React from 'react';
import { Link } from 'react-router-dom';
import '../aboutus.css'

function Aboutus() {
  return (
    <div className="main-body">
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <h2>About Our Dealership</h2>
          <p>Welcome to Our Car Dealership, where we provide the best selection of vehicles and customer service.</p>
          <p>Located in Kolkata, we strive to offer competitive prices and a wide range of vehicles to suit every need and budget.</p>
          <p>Visit us today to explore our latest models and take advantage of our financing options.</p>
        </div>
        <div className="col-md-6">
          <h2>Our Services</h2>
          <ul className="list-group">
            <li className="list-group-item">New and Used Car Sales</li>
            <li className="list-group-item">Vehicle Financing</li>
            <li className="list-group-item">Car Service and Maintenance</li>
            <li className="list-group-item">Trade-Ins and Appraisals</li>
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Meet Our Team</h2>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img src="team-member1.jpg" className="card-img-top" alt="Team Member 1" />
            <div className="card-body">
              <h5 className="card-title">abc</h5>
              <p className="card-text">Sales Manager</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img src="team-member2.jpg" className="card-img-top" alt="Team Member 2" />
            <div className="card-body">
              <h5 className="card-title">abc</h5>
              <p className="card-text">Finance Specialist</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img src="team-member3.jpg" className="card-img-top" alt="Team Member 3" />
            <div className="card-body">
              <h5 className="card-title">abc</h5>
              <p className="card-text">Service Manager</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img src="team-member4.jpg" className="card-img-top" alt="Team Member 4" />
            <div className="card-body">
              <h5 className="card-title">abc</h5>
              <p className="card-text">Customer Relations</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <p>123 Main Street, Kolkata, West Bengal 781015</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: <Link>info@cardealership.com</Link></p>
        </div>
        <div className="col-md-6">
          <h2>Business Hours</h2>
          <ul className="list-unstyled">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 9:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Aboutus;
