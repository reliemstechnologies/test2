const connection = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");

function EngagementCreate(req, res) {
  const user_id = req.headers.mobile_number;
  const campaign_id = req.headers.campaign_id;
  const campaign_name = req.body.campaign_name;
  const name = req.body.name;
  const status = req.body.status;

  const engagement_name = name + "-" + campaign_name;

  let engagement_id = uuidv4();
  console.log(engagement_id);

  console.log("campaign id", campaign_id, "user id", user_id);

  let checkAlreadyAppliedOrNot = `select * from engagements where campaign_id='${campaign_id}' and user_id='${user_id}'`;
  connection.query(checkAlreadyAppliedOrNot, function (err, result) {
    if (err) {
      console.log("already applied to campaign", err);
      return;
    }
    console.log(result[0]);
    console.log(result.length);
    if (result.length > 0) {
      res.status(400).json({
        message: "Already applied to campaign",
      });
    } else {
      let createEngagementQuery = `insert into engagements(engagement_id,user_id,campaign_id,engagement_name,status) values('${engagement_id}','${user_id}','${campaign_id}','${engagement_name}','${status}')`;
      connection.query(createEngagementQuery, function (err, results) {
        if (err) {
          console.log("Error in query execution insert engagements", err);
          return;
        }
        console.log("insert engagements are successfull...", results);
        res
          .status(200)
          .json({ message: "Engagements detailS are inserted successfully.." });
      });
    }
  });
}

module.exports = EngagementCreate;
