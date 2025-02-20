const jwt = require("jsonwebtoken");
const connection = require("../config/dbconfig");
require("dotenv").config();

function GetProfileDetails(req, res) {
  const mobile_number = req.headers.mobile_number;
  console.log(mobile_number);
  let query = `select * from brands where user_id=${mobile_number}`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in select query of brand", err);
      return;
    }

    if (results.length == 0) {
      let getInfluencerDetails = `select * from influencers where user_id=${mobile_number}`;

      connection.query(getInfluencerDetails, function (err, results) {
        if (err) {
          console.log(
            "error in query execution of get influencer details",
            err
          );
          return;
        }
        console.log("Influencer details fetch successfully...", results[0]);
        res.status(200).json({
          user_id: results[0].user_id,
          influencer_name: results[0].influencer_name,
          type: results[0].type,
          location: results[0].location,
          reach: results[0].reach,
          no_of_followers: results[0].no_of_followers,
          social_media_url: results[0].social_media_url,
          budget: results[0].budget,
          status: results[0].status,
          role: "influencer",
        });
      });
    } else {
      console.log("brand select query executed..", results);
      res.status(200).json({
        brand_name: results[0].brand_name,
        logo: results[0].logo,
        website_url: results[0].website_url,
        address: results[0].address,
        email: results[0].email,
        mobile_number: results[0].user_id,
        gstn: results[0].gstn,
        social_media_url: results[0].social_media_url,
        industry_category: results[0].industry_category,
        industry_product_service: results[0].industry_product_service,
        role: "brand",
        user_id: results[0].user_id,
      });
    }
  });
}

module.exports = GetProfileDetails;
