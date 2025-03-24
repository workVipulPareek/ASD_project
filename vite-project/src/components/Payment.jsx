import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Select,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const carId = queryParams.get("id");
  const carName = queryParams.get("name");
  const price = queryParams.get("price");

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [paymentDetails, setPaymentDetails] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (!carId || !carName || !price) {
      alert("Invalid payment details. Redirecting...");
      navigate("/Buy");
    }
  }, [carId, carName, price, navigate]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Error",
        description: "Please log in first.",
        status: "error",
      });
      navigate("/LoginForm");
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/payments/process",
        { carName, price, paymentMethod, details: paymentDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Payment Successful",
        description: "Your payment was processed!",
        status: "success",
      });
      navigate(`/OrderSuccess?name=${encodeURIComponent(carName)}&price=${price}&transactionId=${generateTransactionId()}`);
    } catch (error) {
      console.error(
        "❌ Payment failed:",
        error.response?.data || error.message
      );
      toast({
        title: "Payment Failed",
        description: "Error processing payment",
        status: "error",
      });
    }
  };

  const generateTransactionId = () => {
    return `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === "credit_card") {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.expiry ||
        !paymentDetails.cvv
      ) {
        toast({
          title: "Error",
          description: "Please fill in all card details.",
          status: "error",
        });
        return false;
      }
    } else if (paymentMethod === "upi" && !paymentDetails.upiId) {
      toast({
        title: "Error",
        description: "Please enter a valid UPI ID.",
        status: "error",
      });
      return false;
    } else if (paymentMethod === "net_banking" && !paymentDetails.bankName) {
      toast({
        title: "Error",
        description: "Please select a bank.",
        status: "error",
      });
      return false;
    }
    return true;
  };

  return (
    <ChakraProvider>
      <div className="main-body">
        <Box
          p={6}
          maxW="500px"
          mx="auto"
          mt={10}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading size="lg" mb={4}>
            Payment for {carName}
          </Heading>
          <Text fontSize="lg" mb={4}>
            Amount: <strong>${price}</strong>
          </Text>

          {/* Payment Method Selection */}
          <FormControl mb={4}>
            <FormLabel>Select Payment Method</FormLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit_card">Credit Card</option>
              <option value="upi">UPI</option>
              <option value="net_banking">Net Banking</option>
            </Select>
          </FormControl>

          {/* Dynamic Input Fields Based on Payment Method */}
          {paymentMethod === "credit_card" && (
            <VStack spacing={3} align="stretch">
              <FormControl>
                <FormLabel>Card Number</FormLabel>
                <Input
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiry: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>CVV</FormLabel>
                <Input
                  type="password"
                  placeholder="123"
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          )}

          {paymentMethod === "upi" && (
            <FormControl>
              <FormLabel>UPI ID</FormLabel>
              <Input
                type="text"
                placeholder="yourname@upi"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    upiId: e.target.value,
                  })
                }
              />
            </FormControl>
          )}

          {paymentMethod === "net_banking" && (
            <FormControl>
              <FormLabel>Select Bank</FormLabel>
              <Select
                placeholder="Select your bank"
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    bankName: e.target.value,
                  })
                }
              >
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </Select>
            </FormControl>
          )}

          {/* Payment Button */}
          <Button
            mt={4}
            colorScheme="blue"
            onClick={handlePayment}
            width="full"
          >
            Make Payment
          </Button>
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default Payment;
