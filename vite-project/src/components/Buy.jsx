import React, { useEffect, useState } from "react";
import { VStack, Grid, Box, Button, Heading, Text, Image, ChakraProvider, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import images for cars
import rollsroyce from "../images/rollsroyce.webp";
import bentley from "../images/bentley.webp";
import mercedes from "../images/mercedes.webp";
import bmw from "../images/bmw7.jpeg";
import audi from "../images/audia8.avif";
import defender from "../images/defender.webp";
import lexus from "../images/lexus.webp";
import volvo from "../images/volvo.webp";
import maserati from "../images/maserati.jpeg";

const Buy = () => {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    mainBody: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      minHeight: '100vh'
    },
    cardContainer: {
      padding: '1rem',
      borderWidth: '1px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHovered: {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
      borderColor: '#319795'
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '4px'
    },
    cardTitle: {
      marginTop: '16px',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    cardDescription: {
      marginTop: '8px',
      color: '#4A5568'
    },
    cardPrice: {
      marginTop: '8px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2C7A7B'
    },
    cardQuantity: {
      marginTop: '4px',
      fontSize: '14px',
      color: '#718096'
    },
    buyButton: {
      marginTop: '12px',
      width: '100%',
      backgroundColor: '#319795',
      color: 'white',
      padding: '10px 0',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s ease'
    },
    buyButtonHover: {
      backgroundColor: '#2C7A7B',
      transform: 'scale(1.02)'
    },
    outOfStockButton: {
      marginTop: '12px',
      width: '100%',
      backgroundColor: '#CBD5E0',
      color: '#4A5568',
      padding: '10px 0',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'not-allowed',
      border: 'none'
    },
    shine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '50%',
      height: '100%',
      background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
      transform: 'skewX(-25deg)',
      transition: 'all 0.75s ease'
    },
    shineActive: {
      left: '150%'
    }
  };

  // Fetch cars and check authentication
  useEffect(() => {
    fetchCars();
    checkAuth();
  }, []);

  // Fetch cars function
  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/buy_cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    axios.get("http://localhost:4000/api/auth/check-auth", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setIsLoggedIn(res.data.loggedIn))
    .catch(() => setIsLoggedIn(false));
  };

  // Handle buying a car
  const handleBuy = (car) => {
    if (!isLoggedIn) {
      alert("Please log in first to make a purchase.");
      navigate("/LoginForm");
      return;
    }
  
    if (!car || !car._id) {
      console.error("Car is undefined or missing _id:", car);
      alert("Car details are missing. Please try again.");
      return;
    }
  
    if (car.quantity <= 0) {
      alert("This car is out of stock.");
      return;
    }
  
    axios.put(`http://localhost:4000/buy/${car._id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
      console.log("✅ Purchase Successful:", response.data);
  
  
      navigate(`/Payment?id=${car._id}&name=${encodeURIComponent(car.name)}&price=${car.price}`);
      alert(response.data.message);
    })
    .catch(error => {
      console.error("❌ Purchase failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error purchasing car");
    });
  };
  
  

  // Get car image function
  const getCarImage = (imageName) => {
    switch (imageName) {
      case 'rollsroyce': return rollsroyce;
      case 'bentley': return bentley;
      case 'mercedes': return mercedes;
      case 'bmw': return bmw;
      case 'audi': return audi;
      case 'defender': return defender;
      case 'lexus': return lexus;
      case 'volvo': return volvo;
      case 'maserati': return maserati;
      default: return '';
    }
  };

  const LoadingMessage = React.memo(() => (
    <Text textAlign="center" fontSize="xl" color="gray.500">Loading cars...</Text>
  ));

  const ErrorMessage = React.memo(({ error }) => (
    <Text textAlign="center" fontSize="xl" color="red.500">{error}</Text>
  ));

  return (
    <ChakraProvider>
      <div className="main-body" style={styles.mainBody}>
        <VStack spacing={6} align="stretch">

          {/* Buy Car Title */}
          <Heading as="h2" size="3xl" colorScheme="teal" textAlign="center">
            Buy Car
          </Heading>

          {/* Two navigation buttons in the same row */}
          <HStack justifyContent="center" spacing={8}>
            <Button 
              colorScheme="blue"
              size="lg"
              onClick={() => navigate("/OldBuy")}
            >
              Want to buy an old car? Click here
            </Button>

            <Button 
              colorScheme="green"
              size="lg"
              onClick={() => navigate("/SearchPage")}
            >
              Search with filtering, Click here
            </Button>
          </HStack>

          {/* Car Listing Grid */}
          {isLoading ? (
            <LoadingMessage />
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {cars.length === 0 ? (
                <Text textAlign="center" fontSize="xl" color="gray.500" style={{ gridColumn: 'span 3' }}>
                  No cars available
                </Text>
              ) : (
                cars.map((car) => (
                  <div
                    key={car._id}
                    style={{
                      ...styles.cardContainer,
                      ...(hoveredCard === car._id ? styles.cardHovered : {})
                    }}
                    onMouseEnter={() => setHoveredCard(car._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={car.image}
                        alt={car.name}
                        style={styles.cardImage}
                      />
                      <div 
                        style={{
                          ...styles.shine,
                          ...(hoveredCard === car._id ? styles.shineActive : {})
                        }}
                      />
                    </div>

                    <h3 style={styles.cardTitle}>{car.name}</h3>
                    <p style={styles.cardDescription}>{car.description}</p>
                    <p style={styles.cardPrice}>
                      ${car.price ? car.price.toLocaleString() : 'Price unavailable'}
                    </p>
                    <p style={styles.cardQuantity}>
                      {car.quantity > 0 ? `${car.quantity} available` : 'Out of stock'}
                    </p>
                    
                    {car.quantity === 0 ? (
                      <button
                        style={styles.outOfStockButton}
                        disabled
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        style={{
                          ...styles.buyButton,
                          ...(hoveredCard === car._id ? styles.buyButtonHover : {})
                        }}
                        onClick={() => handleBuy(car)}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </VStack>
      </div>
    </ChakraProvider>
  );
};

export default Buy;