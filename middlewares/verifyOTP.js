const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const otpStore = new Map(); // Store OTPs temporarily (use a database for production)

async function sentOTP(req, res) {
  const mobile_number = req.headers.mobile_number;
  console.log(mobile_number);
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  console.log(otp);

  otpStore.set(mobile_number, otp); // Store OTP (in memory for demo purposes)

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile_number,
    });
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send OTP", details: error.message });
  }
}

function verifyOTP(req, res, next) {
  const otp = req.headers.otp;
  console.log(otp);
  const mobile_number = req.headers.mobile_number;
  const storedOtp = otpStore.get(mobile_number);
  console.log(mobile_number);

  console.log(storedOtp);

  if (storedOtp && storedOtp === otp) {
    otpStore.delete(mobile_number); // Remove OTP after verification
    // res.status(200).json({ message: "OTP verified successfully!" });

    next();
  } else {
    res.status(400).json({ message: "Invalid or expired OTP" });
  }
}

module.exports = { verifyOTP, sentOTP };
