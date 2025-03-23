import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../../../server/authUtil';

const ServiceRequest = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/LoginForm');
    } else if (!isAdmin()) {
      navigate('/Home');
    } else {
      fetchRequests();
    }
  }, [navigate]);

  // Fetch service requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found! Redirecting...');
        navigate('/LoginForm');
        return;
      }

      const response = await axios.get('http://localhost:4000/services', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        navigate('/LoginForm'); // Redirect if unauthorized
      }
    }
  };

  // Update service request status
  const updateRequestStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found! Redirecting...');
        navigate('/LoginForm');
        return;
      }

      const response = await axios.put(
        `http://localhost:4000/updateServiceRequestStatus/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests(requests.map(request => 
        request._id === id ? { ...request, status: response.data.status } : request
      ));
    } catch (error) {
      console.error('Error updating request status:', error.response?.data || error.message);
    }
  };

  // Delete service request
  const deleteRequest = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found! Redirecting...');
        navigate('/LoginForm');
        return;
      }

      await axios.delete(`http://localhost:4000/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error deleting request:', error.response?.data || error.message);
    }
  };

  // Count requests by status
  const pendingRequests = requests.filter(req => req.status === 'Pending').length;
  const acceptedRequests = requests.filter(req => req.status === 'Accepted').length;
  const completedRequests = requests.filter(req => req.status === 'Completed').length;

  const data = {
    labels: ['Pending', 'Accepted', 'Completed'],
    datasets: [
      {
        label: 'Service Requests',
        data: [pendingRequests, acceptedRequests, completedRequests],
        backgroundColor: ['#FFA500', '#36A2EB', '#32CD32'],
        borderColor: ['#FFA500', '#36A2EB', '#32CD32'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Service Requests</Heading>

      {/* Bar Graph */}
      <div style={{ height: '200px', width: '100%' }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true },
              x: { grid: { display: false } }
            }
          }}
        />
      </div>

      {/* Service Requests List */}
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
                  {request.status === 'Pending' && (
                    <>
                      <Button colorScheme="green" mr={2} onClick={() => updateRequestStatus(request._id, 'Accepted')}>
                        Accept
                      </Button>
                      <Button colorScheme="red" mr={2} onClick={() => updateRequestStatus(request._id, 'Rejected')}>
                        Reject
                      </Button>
                    </>
                  )}
                  {request.status === 'Accepted' && (
                    <Button colorScheme="blue" mr={2} onClick={() => updateRequestStatus(request._id, 'Completed')}>
                      Mark as Completed
                    </Button>
                  )}
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
