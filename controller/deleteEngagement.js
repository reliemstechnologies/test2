const connection = require("../config/dbconfig");

function DeleteEngagement(req, res) {
  const engagement_id = req.headers.engagement_id;
  console.log("delete engagement_id api", engagement_id);
  console.log("engagement_id", engagement_id);
  let deleteEngagement = `delete from engagements where engagement_id='${engagement_id}'`;

  connection.query(deleteEngagement, function (err, results) {
    if (err) {
      console.log("error in deleting the engagement....", err);
      return;
    }
    // console.log("Campaign deleted successfully ....", results);
    res.status(200).json({ message: "Engagement deleted successfully ...." });
  });
}

module.exports = DeleteEngagement;
