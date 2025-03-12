import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

const TransactionStatus = ({ transactionId }) => {
  const [status, setStatus] = useState("");

  const handleConfirmDelivery = async () => {
    try {
      const response = await axios.post("http://localhost:5000/escrow/confirm", {
        transactionId
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error confirming delivery");
    }
  };

  return (
    <div>
      <Button colorScheme="green" onClick={handleConfirmDelivery}>
        Confirm Delivery
      </Button>
      <p>{status}</p>
    </div>
  );
};

export default TransactionStatus;
