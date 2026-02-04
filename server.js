const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/pay", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.swiftwallet.co.ke/v1/payments",
      {
        phone: phone,
        amount: amount,
        channel_id: process.env.SWIFTWALLET_CHANNEL_ID
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SWIFTWALLET_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      error: "SwiftWallet server error",
      details: error.response?.data
    });
  }
});

app.get("/", (req, res) => {
  res.send("SwiftWallet Server Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
