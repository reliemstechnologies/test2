const connection = require("../config/dbconfig");
const formatDate = require("../middlewares/convertToDate");

function InfluencerDetails(req, res) {
  const mobile_number = req.headers.mobile_number;

  console.log("mobil number", mobile_number);

  let getInfluencerDetails = `select * from influencers where user_id=${mobile_number}`;

  connection.query(getInfluencerDetails, function (err, results) {
    if (err) {
      console.log("error in query execution of get influencer details", err);
      return;
    }

    const dob = formatDate(results[0].dob);

    console.log("Influencer details fetch successfully...", results[0]);
    res.status(200).json({
      user_id: results[0].user_id,
      influencer_name: results[0].influencer_name,
      email: results[0].email,
      dob: dob,
      gender: results[0].gender,
      address: results[0].address,
      city: results[0].city,
      state: results[0].state,
      pincode: results[0].pincode,
      social_media_urls: results[0].social_media_urls,
      prefered_brand_categories: results[0].prefered_brand_categories,
      is_profile_completed: results[0].is_profile_completed,
      is_profile_active: results[0].is_profile_active,
    });
  });
}

module.exports = InfluencerDetails;
