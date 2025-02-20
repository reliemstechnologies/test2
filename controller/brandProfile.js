const jwt = require("jsonwebtoken");
const connection = require("../config/dbconfig");
require("dotenv").config();

function BrandProfile(req, res) {
  const mobile_number = req.headers.mobile_number;
  console.log(mobile_number);
  let query = `select * from brands where user_id=${mobile_number}`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in select query of brand", err);
      return;
    }

    console.log("brand select query executed..", results);
    res.status(200).json({
      brand_name: results[0].brand_name,
      logo: results[0].logo,
      website_url: results[0].website_url,
      address: results[0].address,
      email: results[0].email,
      mobile_number: results[0].user_id,
      gstn: results[0].gstn,
      social_media_urls: results[0].social_media_urls,
      industry_category: results[0].industry_category,
      industry_product_service: results[0].industry_product_service,
      user_id: results[0].user_id,
      industry_type: results[0].industry_type,
      industry_category: results[0].industry_category,
      is_profile_completed: results[0].is_profile_completed,
      is_profile_active: results[0].is_profile_active,
      created_at: results[0].created_at,
      modified_at: results[0].modified_at,
      contact_person_name: results[0].contact_person_name,
      designation: results[0].designation,
      social_media_urls: results[0].social_media_urls,
      city: results[0].city,
      state: results[0].state,
      pincode: results[0].pincode,
    });
  });
}

module.exports = BrandProfile;
