import express from "express";
import AuthContext from "./AuthContext.js";

const router = express.Router();

// Check if user is authenticated
router.get("/check-auth", AuthContext, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

export default router;
