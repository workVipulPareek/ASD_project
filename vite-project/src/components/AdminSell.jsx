import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../../server/authUtil';  // Ensure you have this function implemented

const SellInfo = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/Home');
    } else {
      axios.get('http://localhost:5000/sales')
        .then(response => {
          if (Array.isArray(response.data)) {
            setSales(response.data);
          } else {
            console.error('Fetched data is not an array:', response.data);
          }
        })
        .catch(error => {
          console.log('Error fetching sales:', error);
        });
    }
  }, [navigate]);

  const soldItems = sales.filter(sale => sale.status === 'Sold').length;
  const pendingItems = sales.filter(sale => sale.status === 'Pending').length;

  const data = {
    labels: ['Sold', 'Pending'],
    datasets: [
      {
        label: 'Sales Status',
        data: [soldItems, pendingItems],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Sales Status',
        font: {
          size: 20
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  if (!isLoggedIn()) {
    navigate('/LoginForm');
    return null;
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>Sell Info</Heading>
      <Box height="150px" width="100%">
        <Bar data={data} options={options} />
      </Box>
      <Box mt={4}>
        <List spacing={5}>
          {sales.map((sale) => (
            <ListItem key={sale._id}>
              <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
                <Text fontSize="lg"><strong>Name:</strong> {sale.name}</Text>
                <Text fontSize="lg"><strong>Item:</strong> {sale.vehicleModel}</Text>
                <Text fontSize="lg"><strong>Status:</strong> {sale.status}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SellInfo;
