const connection = require("../config/dbconfig");

function DeleteCampaign(req, res) {
  const campaign_id = req.headers.campaign_id;
  console.log("delete campaign api", campaign_id);
  console.log("campaign_id", campaign_id);
  let deleteCampaign = `delete from campaigns where campaign_id='${campaign_id}'`;

  connection.query(deleteCampaign, function (err, results) {
    if (err) {
      console.log("error in deleting the campaigns....", err);
      return;
    }
    // console.log("Campaign deleted successfully ....", results);
    res.status(200).json({ message: "Campaign deleted successfully ...." });
  });
}

module.exports = DeleteCampaign;
