require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const verifyOTP = require("./middlewares/verifyOTP");
const loginController = require("./controller/loginController");
const connection = require("./config/dbconfig");
const BrandRegisterController = require("./controller/brandRegisterController");
const BrandProfile = require("./controller/brandProfile");
const CampaignCreate = require("./controller/campaignCreate");
const VerifyJWT = require("./middlewares/verifyJWT");
const CampaignList = require("./controller/campaignList");
const CampaignUpdate = require("./controller/campaignUpdate");
const DeleteCampaign = require("./controller/deleteCampaign");
const InfluencerRegister = require("./controller/influencerRegistration");
const InfluencerDetails = require("./controller/influencerDetails");
const InfluencersList = require("./controller/influencersList");
const EngagementCreate = require("./controller/engagementCreate");
const ListCampaignOfInfluencer = require("./controller/listCampaignOfInfluencers");
const ListEngagements = require("./controller/engagementsList");
const ListEngagementsOfCampaign = require("./controller/listEnagementsOfCampaigns");
const getCampaignDetailsForId = require("./controller/getCampaignDetailsForId");
const DeleteInfluencer = require("./controller/deleteInfluencer");
const DeleteEngagement = require("./controller/deleteEngagement");
const GetProfileDetails = require("./controller/getProfileDetails");
const EngagementDetails = require("./controller/engagementDetails.js");
const ProposalCreate = require("./controller/proposalCreate.js");
const EngagementUpdate = require("./controller/engagementUpdate.js");

const multer = require("multer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const otpStore = new Map(); // Store OTPs temporarily (use a database for production)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(multer().array());

const PORT = 3031 || process.env.PORT;

app.use(cors());

app.post("/api/brand/send/otp", async (req, res) => {
  const mobile_number = req.headers.mobile_number;
  console.log(req.headers);
  console.log(mobile_number);
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  console.log(otp);

  try {
    // await client.messages.create({
    //   body: `Your OTP is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: mobile_number,
    // });

    let expiration_time = 60;
    let is_used = "false";

    let query = `insert into user_otps(user_id,otp_code,expiration_time,is_used) values(${mobile_number},${otp},${expiration_time},${is_used})`;

    await connection.query(query, function (err, results) {
      if (err) {
        console.log(`error in execution of query`, err);
        return;
      }
      console.log("otp is inserted with id", results);
      res.status(200).json({ message: "OTP sent successfully!" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send OTP", details: error.message });
  }
});

app.post(
  "/api/brand/login",
  async (req, res, next) => {
    console.log(req.headers);
    const otp = req.headers.otp;
    const role = req.headers.role;
    console.log("otp", otp);
    const mobile_number = req.headers.mobile_number;

    let storedOtp;
    //get otp from database;

    let query = `select otp_code from user_otps where user_id=${mobile_number} order by created_at desc`;
    await connection.query(query, function (err, results) {
      if (err) {
        console.log("error in query execution", err);
        return;
      }
      console.log("select query executed", results[0].otp_code);
      storedOtp = results[0].otp_code;
      console.log("storeOtp", storedOtp);
      if (storedOtp && storedOtp == otp) {
        next();
      } else {
        res.status(400).json({ message: "Invalid or expired OTP" });
      }
    });
  },

  loginController
);

app.use("/api/brand/register", VerifyJWT, BrandRegisterController);

app.get("/api/brand/profile", VerifyJWT, BrandProfile);

app.use("/api/brand/campaign/create", VerifyJWT, CampaignCreate);

app.use("/api/brand/campaign/list", VerifyJWT, CampaignList);

app.use("/api/brand/campaign/id", VerifyJWT, getCampaignDetailsForId);

app.put("/api/brand/campaign/update", VerifyJWT, CampaignUpdate);

app.delete("/api/brand/campaign/delete", VerifyJWT, DeleteCampaign);

app.use("/api/influencer/registration", VerifyJWT, InfluencerRegister);

app.use("/api/influencer/details", VerifyJWT, InfluencerDetails);

app.use("/api/influencer/list", VerifyJWT, InfluencersList);

app.delete("/api/influencer/delete", VerifyJWT, DeleteInfluencer);

app.use("/api/campaign/apply", VerifyJWT, EngagementCreate);

app.use("/api/engagements/influencer", VerifyJWT, ListCampaignOfInfluencer);

app.use("/api/engagements/campaigns", VerifyJWT, ListEngagementsOfCampaign);

app.delete("/api/engagements/delete", VerifyJWT, DeleteEngagement);

app.use("/api/engagements/list", VerifyJWT, ListEngagements);

app.use("/api/engagements/details", VerifyJWT, EngagementDetails);

app.use("/api/profile", VerifyJWT, GetProfileDetails);

app.use("/engagement/create/proposal", VerifyJWT, ProposalCreate);

app.use("/api/engagements/update/status", VerifyJWT, EngagementUpdate);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, function (req, res) {
  console.log(`server is running on port ${PORT}`);
});
