import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../../server/authUtil';

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/Home');
    } else {
      axios.get('http://localhost:4000/services')
        .then(response => {
          if (Array.isArray(response.data)) {
            setRequests(response.data);
          } else {
            console.error('Fetched data is not an array:', response.data);
          }
        })
        .catch(error => {
          console.log('Error fetching service requests:', error);
        });
    }
  }, [navigate]);

  const updateRequestStatus = (id, status) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:4000/updateServiceRequestStatus/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setRequests(requests.map(request => request._id === id ? { ...request, status: response.data.status } : request));
    })
    .catch(error => {
      console.log('Error updating request status:', error);
    });
  };

  const deleteRequest = (id) => {
    axios.delete(`http://localhost:4000/services/${id}`)
      .then(response => {
        setRequests(requests.filter(request => request._id !== id));
      })
      .catch(error => {
        console.log('Error deleting request:', error);
      });
  };

  const pendingRequests = requests.filter(request => request.status === 'Pending').length;
  const completedRequests = requests.filter(request => request.status === 'Completed').length;

  const data = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'Service Requests',
        data: [pendingRequests, completedRequests],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1,
      }
    ]
  };

  if (!isLoggedIn()) {
    navigate('/LoginForm');
    return null;
  }

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Services Request</Heading>
      <div style={{ height: '150px', width: '100%' }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x', // Bar chart oriented horizontally
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                barThickness: 'flex', // Adjust the bar thickness
                maxBarThickness: 50,  // Maximum bar thickness
                grid: {
                  display: false
                }
              }
            }
          }}
        />
      </div>
      <List spacing={5} mt={5}>
        {requests.map((request) => (
          <ListItem key={request._id}>
            <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize="lg"><strong>Name:</strong> {request.name}</Text>
                  <Text fontSize="lg"><strong>Service:</strong> {request.serviceType}</Text>
                  <Text fontSize="lg"><strong>Status:</strong> {request.status}</Text>
                </Box>
                <Box>
                  <Button colorScheme="green" mr={2} onClick={() => updateRequestStatus(request._id, 'accepted')}>Accept</Button>
                  <Button colorScheme="red" mr={2} onClick={() => updateRequestStatus(request._id, 'rejected')}>Reject</Button>
                  <Button colorScheme="red" onClick={() => deleteRequest(request._id)}>Delete</Button>
                </Box>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceRequest;
