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
      padding: '40px 0',
      overflowX: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          position: 'relative',
          padding: '30px 0'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#212529',
            marginBottom: '15px',
            position: 'relative',
            display: 'inline-block'
          }}>
            About Our Project
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: '#dc3545',
              borderRadius: '4px'
            }}></span>
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6c757d',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            A collaborative car dealership web application built as our college project
          </p>
        </div>

        {/* About & Features Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '50px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff',
          transition: 'transform 0.3s ease',
        }}>
          <div style={{
            flex: '1 1 500px',
            padding: '50px',
            position: 'relative'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '25px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Project Overview
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
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '25px',
              color: '#495057'
            }}>Welcome to our Car Dealership Project, a comprehensive web application developed as part of our academic curriculum. This project demonstrates our skills in web development, database management, and user interface design.</p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '25px',
              color: '#495057'
            }}>We've created a virtual car dealership platform that allows users to browse vehicle inventory, compare models, and schedule test drives through an intuitive interface. Our application incorporates responsive design principles to ensure seamless functionality across all devices.</p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '25px',
              color: '#495057'
            }}>This project showcases our collaborative efforts in building a practical, industry-relevant application while applying concepts learned throughout our coursework.</p>
            <div style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: '#dc3545',
              color: '#fff',
              borderRadius: '30px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
            }}>
              View Project Details
            </div>
          </div>
          <div style={{
            flex: '1 1 500px',
            padding: '50px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '25px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Key Features
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
              {['Vehicle Inventory Management', 'User Authentication System', 'Advanced Search & Filtering', 'Responsive Frontend Design'].map((feature, index) => (
                <li key={index} style={{
                  padding: '18px 25px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  background: 'white',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  paddingLeft: '60px',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(220, 53, 69, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#dc3545'
                    }}></span>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          marginBottom: '50px',
          background: '#fff',
          padding: '50px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(220,53,69,0.1) 0%, rgba(220,53,69,0) 70%)',
            borderRadius: '0 0 0 100%',
            zIndex: '1'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(220,53,69,0.1) 0%, rgba(220,53,69,0) 70%)',
            borderRadius: '0 100% 0 0',
            zIndex: '1'
          }}></div>
          
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#212529',
            textAlign: 'center',
            position: 'relative',
            paddingBottom: '15px',
            zIndex: '2'
          }}>
            Meet Our Team
            <span style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              background: '#dc3545',
              borderRadius: '2px'
            }}></span>
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 -20px',
            justifyContent: 'center',
            zIndex: '2',
            position: 'relative'
          }}>
            {[
              { name: 'Vijay Singh', role: 'Frontend Developer', photo: 'team-member1.jpg', contribution: 'UI/UX Design & React Components' },
              { name: 'Vipul Sharma', role: 'Backend Developer', photo: 'team-member2.jpg', contribution: 'Database & API Integration' },
              { name: 'Siddhant Patel', role: 'Project Manager', photo: 'team-member3.jpg', contribution: 'Documentation & Testing' }
            ].map((member, index) => (
              <div key={index} style={{
                flex: '0 0 calc(33.333% - 40px)',
                margin: '0 20px 20px',
                minWidth: '280px'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}>
                  <div style={{
                    height: '280px',
                    background: '#e9ecef',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px'
                    }}>
                      <div>
                        <h3 style={{
                          color: 'white',
                          fontSize: '22px',
                          fontWeight: '600',
                          margin: '0',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>{member.name}</h3>
                        <p style={{
                          color: 'rgba(255,255,255,0.9)',
                          margin: '5px 0 0',
                          fontSize: '16px',
                          fontWeight: '400',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: '25px',
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '10px',
                      color: '#212529'
                    }}>Key Contributions:</h4>
                    <p style={{
                      fontSize: '15px',
                      color: '#6c757d',
                      lineHeight: '1.7',
                      margin: '0'
                    }}>{member.contribution}</p>
                    <div style={{
                      display: 'flex',
                      marginTop: '20px',
                      justifyContent: 'center',
                      gap: '15px'
                    }}>
                      {['GitHub', 'LinkedIn', 'Email'].map((platform, i) => (
                        <a key={i} href="#" style={{
                          display: 'inline-block',
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: i === 0 ? '#24292e' : i === 1 ? '#0077b5' : '#dc3545',
                          borderRadius: '6px',
                          background: 'rgba(0,0,0,0.05)',
                          textDecoration: 'none',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                        }}>
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff'
        }}>
          <div style={{
            flex: '1 1 500px',
            padding: '50px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '25px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Project Details
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
              fontSize: '17px',
              lineHeight: '1.8',
              marginBottom: '15px',
              color: '#495057'
            }}>Course: Software Lab</p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              marginBottom: '15px',
              color: '#495057'
            }}>Submission Date: May 15, 2025</p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              marginBottom: '15px',
              color: '#495057'
            }}>Technologies Used: React, Node.js, MongoDB, Express</p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              marginBottom: '0',
              color: '#495057'
            }}>Project Repository: <Link to="#" style={{
              color: '#dc3545',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontWeight: '500'
            }}>github.com/car-dealership-project</Link></p>
          </div>
          <div style={{
            flex: '1 1 500px',
            padding: '50px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '25px',
              color: '#212529',
              position: 'relative',
              paddingBottom: '15px'
            }}>
              Project Timeline
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
              {[
                'Planning & Requirements: ', 
                'Design & Development: ', 
                'Testing & Refinement: ', 
                'Final Presentation: '
              ].map((milestone, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  fontSize: '16px',
                  color: '#495057',
                  padding: '15px 20px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}>
                  <span style={{
                    display: 'inline-block',
                    marginRight: '15px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#dc3545',
                    position: 'relative',
                    flexShrink: '0'
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
                  {milestone}
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