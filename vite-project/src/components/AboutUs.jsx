import React from 'react';
import { Link } from 'react-router-dom';
import '../aboutus.css';

function Aboutus() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      fontFamily: '"Poppins", sans-serif',
      color: '#343a40',
      padding: '40px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '40px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{
            flex: '1 1 500px',
            padding: '40px',
            position: 'relative'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              About Our Dealership
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '80px',
                height: '4px',
                background: '#dc3545',
                borderRadius: '2px'
              }}></span>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '20px',
              color: '#495057'
            }}>Welcome to Our Car Dealership, where we provide the best selection of vehicles and customer service.</p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '20px',
              color: '#495057'
            }}>Located in Kolkata, we strive to offer competitive prices and a wide range of vehicles to suit every need and budget.</p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '0',
              color: '#495057'
            }}>Visit us today to explore our latest models and take advantage of our financing options.</p>
          </div>
          <div style={{
            flex: '1 1 500px',
            padding: '40px',
            background: '#f8f9fa'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Our Services
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '80px',
                height: '4px',
                background: '#dc3545',
                borderRadius: '2px'
              }}></span>
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>
              {['New and Used Car Sales', 'Vehicle Financing', 'Car Service and Maintenance', 'Trade-Ins and Appraisals'].map((service, index) => (
                <li key={index} style={{
                  padding: '15px 20px',
                  marginBottom: '10px',
                  borderRadius: '6px',
                  background: 'white',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  paddingLeft: '50px'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#dc3545'
                  }}></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          marginBottom: '40px',
          background: '#fff',
          padding: '40px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#212529',
            textAlign: 'center',
            position: 'relative',
            paddingBottom: '15px'
          }}>
            Meet Our Team
            <span style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: '#dc3545',
              borderRadius: '2px'
            }}></span>
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 -15px'
          }}>
            {['Sales Manager', 'Finance Specialist', 'Service Manager', 'Customer Relations'].map((role, index) => (
              <div key={index} style={{
                flex: '1 1 250px',
                padding: '0 15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%'
                }}>
                  <div style={{
                    height: '200px',
                    background: '#e9ecef',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={`team-member${index+1}.jpg`} 
                      alt={`Team Member ${index+1}`} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <h5 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '5px',
                      color: '#212529'
                    }}>abc</h5>
                    <p style={{
                      fontSize: '14px',
                      color: '#6c757d',
                      margin: '0'
                    }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{
            flex: '1 1 500px',
            padding: '40px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Contact Us
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '80px',
                height: '4px',
                background: '#dc3545',
                borderRadius: '2px'
              }}></span>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '15px',
              color: '#495057'
            }}>123 Main Street, Kolkata, West Bengal 781015</p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '15px',
              color: '#495057'
            }}>Phone: (123) 456-7890</p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '0',
              color: '#495057'
            }}>Email: <Link to="#" style={{
              color: '#dc3545',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>info@cardealership.com</Link></p>
          </div>
          <div style={{
            flex: '1 1 500px',
            padding: '40px',
            background: '#f8f9fa'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Business Hours
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '80px',
                height: '4px',
                background: '#dc3545',
                borderRadius: '2px'
              }}></span>
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0'
            }}>
              {['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'].map((hours, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  fontSize: '16px',
                  color: '#495057'
                }}>
                  <span style={{
                    display: 'inline-block',
                    marginRight: '10px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#dc3545',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {hours}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;