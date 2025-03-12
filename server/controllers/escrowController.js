const Escrow = require('../models/Escrow');

// Simulate Payment Hold
exports.createEscrowPayment = async (req, res) => {
  const { buyerId, sellerId, carId } = req.body;

  try {
    const escrowTransaction = new Escrow({
      transactionId: `TXN-${Date.now()}`, // Fake transaction ID
      buyerId,
      sellerId,
      carId,
      amount: 0, // No real money involved
      status: "Pending"
    });

    await escrowTransaction.save();
    res.status(200).json({ message: "Payment held in escrow", transactionId: escrowTransaction.transactionId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Escrow payment failed" });
  }
};

// Simulate Payment Release
exports.confirmDelivery = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Escrow.findOne({ transactionId });

    if (transaction.status !== "Pending") {
      return res.status(400).json({ error: "Transaction already completed" });
    }

    transaction.status = "Released";
    await transaction.save();

    res.status(200).json({ message: "Funds released (simulated)" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error releasing escrow funds" });
  }
};

// Simulate Dispute Handling
exports.raiseDispute = async (req, res) => {
  const { transactionId } = req.body;

  try {
    const transaction = await Escrow.findOne({ transactionId });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    transaction.status = "Disputed";
    await transaction.save();

    res.status(200).json({ message: "Dispute raised (simulated)" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing dispute" });
  }
};
