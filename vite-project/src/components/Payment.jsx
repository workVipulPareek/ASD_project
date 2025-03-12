import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, Select } from "@chakra-ui/react";
import axios from "axios";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const carName = searchParams.get("name");
  const price = searchParams.get("price");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    axios.post("http://localhost:4000/payments/process", 
      { carName, price, paymentMethod },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then(response => {
      alert(response.data.message);
      navigate("/OrderSuccess");
    })
    .catch(error => {
      alert(error.response?.data?.error || "Payment failed, try again.");
    });
  };

  return (
    <Box textAlign="center" p={6}>
      <Heading>Complete Your Payment</Heading>
      <Text fontSize="xl" mt={4}>Car: {carName}</Text>
      <Text fontSize="lg" mt={2}>Amount: ${price}</Text>

      <Select placeholder="Select Payment Method" mt={4} mb={4} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="UPI">UPI</option>
      </Select>

      <Button colorScheme="green" onClick={handlePayment}>Confirm Payment</Button>
    </Box>
  );
};

export default Payment;
