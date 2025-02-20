const connection = require("../config/dbconfig");

function CampaignList(req, res) {
  const mobile_number = req.headers.mobile_number;
  let query = `select * from campaigns`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in select query of brand", err);
      return;
    }

    // console.log("campaign select query executed..", results);
    // res.status(200).json({
    //   user_id: results[0].user_id,
    //   campaign_id: results[0].campaign_id,
    //   campaign_name: results[0].campaign_name,
    //   audience: results[0].audience,
    //   location: results[0].location,
    //   target_reach: results[0].target_reach,
    //   budget: results[0].budget,
    //   start_date: results[0].start_date,
    //   end_date: results[0].end_date,
    //   expected_revenue: results[0].expected_revenue,
    //   description: results[0].description,
    //   product_service_name: results[0].product_service_name,
    //   product_service_description: results[0].product_service_description,
    //   influencer_type: results[0].influencer_type,
    //   no_of_influencers: results[0].no_of_influencers,
    // });
    res.json(results);
  });
}

module.exports = CampaignList;
