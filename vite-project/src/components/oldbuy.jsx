import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BuyPage = () => {
  const [allCars, setAllCars] = useState([]); // Store all cars (original data)
  const [cars, setCars] = useState([]); // Displayed cars (filtered list)
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    mainBody: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'teal',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    searchContainer: {
      display: 'flex',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto 2rem auto',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    searchInput: {
      width: '80%',
      padding: '1rem 1.5rem',
      fontSize: '1.1rem',
      border: 'none',
      outline: 'none',
      backgroundColor: 'white'
    },
    searchButton: {
      width: '20%',
      padding: '1rem',
      border: 'none',
      backgroundColor: '#319795',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    searchButtonHover: {
      backgroundColor: '#2C7A7B'
    },
    carGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      padding: '1rem 0'
    },
    noCarMessage: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#718096',
      padding: '3rem'
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
    imageContainer: {
      position: 'relative',
      height: '100px',
      overflow: 'hidden',
      borderRadius: '4px'
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease'
    },
    cardImageHover: {
      transform: 'scale(1.05)'
    },
    cardTitle: {
      marginTop: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2d3748'
    },
    cardDescription: {
      marginTop: '8px',
      color: '#4A5568',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      height: '40px'
    },
    cardPrice: {
      marginTop: '8px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#319795'
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
    soldButton: {
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

  // Fetch available cars
  useEffect(() => {
    axios.get("http://localhost:4000/user-sell")
      .then(response => {
        const availableCars = response.data.filter(car => car.status === "Added");
        setAllCars(availableCars); // Store all cars
        setCars(availableCars); // Set displayed cars
      })
      .catch(error => console.error("Error fetching cars:", error));

    axios.get("http://localhost:4000/api/auth/check-auth", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setIsLoggedIn(res.data.loggedIn))
    .catch(() => setIsLoggedIn(false));
  }, []);

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // Reset to all cars when search is empty
      setCars(allCars);
    } else {
      // Filter only matching cars
      const filtered = allCars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCars(filtered);
    }
  };

  // Handle "Enter" key for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle Buy
  const handleBuy = (car) => {
    if (!isLoggedIn) {
      alert("Please log in first to make a purchase.");
      navigate("/LoginForm");
      return;
    }

    axios.put(`http://localhost:4000/buy_old/${car._id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => {
      setCars(prevCars => prevCars.map(c => (c._id === car._id ? { ...c, status: "sold" } : c)));
      navigate(`/Payment?id=${car._id}&name=${encodeURIComponent(car.name)}&price=${car.price}`);
      alert("Car purchased successfully!");
    })
    .catch(error => {
      console.error("Purchase failed:", error.response?.data || error.message);
      alert("Error purchasing car");
    });
  };

  return (
    <div style={styles.mainBody}>
      <h1 style={styles.heading}>Buy Old Car</h1>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.searchInput}
        />
        <button 
          onClick={handleSearch} 
          style={styles.searchButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = styles.searchButtonHover.backgroundColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = styles.searchButton.backgroundColor;
          }}
        >
          Search
        </button>
      </div>

      {/* Car Grid */}
      <div style={styles.carGrid}>
        {cars.length === 0 ? (
          <div style={styles.noCarMessage}>No cars available</div>
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
              <div style={styles.imageContainer}>
                <img
                  src={car.image_url}
                  alt={car.name}
                  style={{
                    ...styles.cardImage,
                    ...(hoveredCard === car._id ? styles.cardImageHover : {})
                  }}
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
              <p style={styles.cardPrice}>Price: ₹{car.price}</p>
              
              {car.status === "sold" ? (
                <button
                  style={styles.soldButton}
                  disabled
                >
                  Sold
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
      
      {/* Add keyframe animations */}
      <style>{`
        @keyframes shineEffect {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
};

export default BuyPage;