const express = require('express');
const router = express.Router();
const { createEscrowPayment, confirmDelivery, raiseDispute } = require('../controllers/escrowController');

router.post('/escrow/pay', createEscrowPayment); // Hold payment
router.post('/escrow/confirm', confirmDelivery); // Release payment
router.post('/escrow/dispute', raiseDispute); // Handle dispute

export default router; // ✅ Ensure default export