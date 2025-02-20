const connection = require("../config/dbconfig");

function ListCampaignOfInfluencer(req, res) {
  const campaign_id = req.body.campaign_id;
  const user_id = req.headers.mobile_number;

  let getEngagementsOfInfluencer = `select * from engagements where user_id='${user_id}'`;
  connection.query(getEngagementsOfInfluencer, function (err, results) {
    if (err) {
      console.log("Get Influencers specific engagements query failed", err);
      return;
    }
    console.log("Get influencer specific engagements", results);
    res.json(results);
  });
}

module.exports = ListCampaignOfInfluencer;
