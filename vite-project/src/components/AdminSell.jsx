import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../../../server/authUtil";

const SellInfo = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/LoginForm");
      return;
    }
    if (!isAdmin()) {
      navigate("/Home");
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/sales", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSales(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching sales:", error.response?.data || error.message);
      });
  }, [navigate]);

  const updateSaleStatus = async (id, status, sale) => {
    try {
      let updatedSale = { ...sale, status };

  
      // ✅ Update status in the database
      await axios.put(`http://localhost:4000/updateSaleStatus/${id}`, { status });
  
      // ✅ Update UI only after successful database update
      setSales((prevSales) =>
        prevSales.map((s) => (s._id === id ? updatedSale : s))
      );
      if (status === "Added") {
        // ✅ Ensure all required fields are sent to UserSell
        const { name, email, phone, vehicleNumber, vehicleModel, vehicleCompany, description, image_url } = sale;
        axios.post("http://localhost:4000/usedcarsell", {
          name,
          email,
          phone,
          vehicleNumber,
          vehicleModel,
          vehicleCompany,
          status: "Added",
          description,
          image_url: image_url || "",
        });
      }
      toast({
        title: `Status Updated to ${status}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error(`❌ Error updating status:`, error.response?.data || error.message);
      toast({
        title: "Error updating status",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    if (status === "Added") {
      // ✅ Ensure all required fields are sent to UserSell
      const { name, email, phone, vehicleNumber, vehicleModel, vehicleCompany, description, image_url } = sale;
      axios.post("http://localhost:4000/usedcarsell", {
        name,
        email,
        phone,
        vehicleNumber,
        vehicleModel,
        vehicleCompany,
        status: "Added",
        description,
        image_url: image_url || "",
      });
    }
  };
  
  const deleteSale = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteSale/${id}`);
      setSales((prevSales) => prevSales.filter((sale) => sale._id !== id));

      toast({
        title: "Sale Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("❌ Error deleting sale:", error.response?.data || error.message);
      toast({
        title: "Error deleting sale",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // ✅ Count sales by status for chart
  const statusCounts = sales.reduce(
    (acc, sale) => {
      acc[sale.status] = (acc[sale.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Accepted: 0, Added: 0 }
  );

  const chartData = {
    labels: ["Pending", "Accepted", "Added"],
    datasets: [
      {
        label: "Sales Status",
        data: [statusCounts.Pending, statusCounts.Accepted, statusCounts.Added],
        backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Sales Status", font: { size: 20 } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>
        Sell Info
      </Heading>
      <Box height="150px" width="100%">
        <Bar data={chartData} options={chartOptions} />
      </Box>
      <Box mt={4}>
        <List spacing={5}>
          {sales.map((sale) => (
            <ListItem key={sale._id}>
              <Box p={4} boxShadow="lg" borderRadius="md" bg="white">
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text fontSize="lg">
                      <strong>Name:</strong> {sale.name}
                    </Text>
                    <Text fontSize="lg">
                      <strong>Item:</strong> {sale.vehicleModel}
                    </Text>
                    <Text fontSize="lg">
                      <strong>Status:</strong> {sale.status}
                    </Text>
                  </Box>
                  <Box>
                    {sale.status === "Pending" && (
                      <>
                        <Button
                          colorScheme="green"
                          mr={2}
                          onClick={() => updateSaleStatus(sale._id, "Accepted", sale)}
                        >
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          mr={2}
                          onClick={() => updateSaleStatus(sale._id, "Rejected", sale)}
                        >
                          Reject
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteSale(sale._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                    {sale.status === "Accepted" && (
                      <>
                        <Button
                          colorScheme="blue"
                          mr={2}
                          onClick={() => updateSaleStatus(sale._id, "Added", sale)}
                        >
                          Add
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteSale(sale._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                    {sale.status === "Added" && (
                      <Button colorScheme="red" onClick={() => deleteSale(sale._id)}>
                        Delete
                      </Button>
                    )}
                  </Box>
                </Flex>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SellInfo;
