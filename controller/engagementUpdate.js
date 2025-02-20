const connection = require("../config/dbconfig");

function EngagementUpdate(req, res) {
  let engagement_id = req.headers.engagement_id;
  let engagement_status = req.headers.engagement_status;

  let updateCampaignDetails = `update engagements set status='${engagement_status}' where engagement_id='${engagement_id}'`;

  connection.query(updateCampaignDetails, function (err, results) {
    if (err) {
      console.log("error in updating campaign details", err);
      return;
    }
    console.log("Engagemnents details are updated successfully...", results[0]);
    res.status(200).json({ message: "engagements updated successfully.." });
  });
}

module.exports = EngagementUpdate;
