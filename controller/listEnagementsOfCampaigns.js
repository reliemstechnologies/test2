const connection = require("../config/dbconfig");

function ListEngagementsOfCampaign(req, res) {
  const campaign_id = req.body.campaign_id;
  const user_id = req.headers.mobile_number;
  let getEngagementsOfCampaign = `select * from engagements where user_id='${user_id}'`;

  connection.query(getEngagementsOfCampaign, function (err, results) {
    if (err) {
      console.log("query execution is failed", err);
      return;
    }
    console.log("query execution is successfull..", results);
    res.json(results);
  });
}

module.exports = ListEngagementsOfCampaign;
