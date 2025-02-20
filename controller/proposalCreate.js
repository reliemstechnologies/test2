const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("../config/dbconfig");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

function ProposalCreate(req, res) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname),
  });

  const upload = multer({ storage });

  try {
    upload.single("post")(req, res, (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).send("Error uploading file");
      }
      // console.log("File Uploaded:", req.file);

      if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).send("No file uploaded");
      }

      console.log(req.body.proposalDetails);
      req.body = JSON.parse(req.body.proposalDetails);
      console.log(req.body.proposal_description);
      let proposal_id = uuidv4();

      let proposal_description = req.body.proposal_description;
      console.log("proposale description", proposal_description);
      let user_id = req.headers.mobile_number;
      let engagement_id = req.headers.engagement_id;
      let post_file_name = req.file.originalname;
      let post_file_path = req.file.path ? req.file.path : null;
      let status = "Proposal Submitted";
      let video_file_name = "undefined";
      let video_file_path = "undefined";

      let checkProposalSubmit = `select * from proposals where engagement_id='${engagement_id}' and user_id='${user_id}'`;
      connection.query(checkProposalSubmit, function (err, resultCheck) {
        if (err) {
          console.log("check proposal error ", err);
          return;
        }

        if (resultCheck.length > 0) {
          res.status(401).json({
            message: "Proposal is already submiited for the engagement",
          });
        } else {
          let insertProposalDetails = `insert into proposals(proposal_id,engagement_id,user_id,proposal_description,post_file_name,post_file_path,video_file_name,video_file_path) values('${proposal_id}','${engagement_id}','${user_id}', '${proposal_description}','${post_file_name}', '${post_file_path}','${video_file_name}','${video_file_path}')`;
          connection.query(insertProposalDetails, function (err, results) {
            if (err) {
              console.log(`error in execution of query`, err);
              return;
            }

            let updateEngagementStatus = `update engagements set status=${status} where engagement_id=${engagement_id}`;
            connection.query(updateEngagementStatus, function (err, result) {
              if (err) {
                console.log("error in update status execution");
                return;
              }

              res.status(200).json({
                message: "Proposal Submitted Successful ! ",
                data: results,
              });
            });
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing the request." });
  }
}

module.exports = ProposalCreate;
