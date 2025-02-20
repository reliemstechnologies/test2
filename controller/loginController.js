const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("../config/dbconfig");

const secretKey = process.env.secretKey;

function loginController(req, res) {
  console.log("login controller");
  const role = req.headers.role;
  const mobile_number = req.headers.mobile_number;
  let user_id = mobile_number;
  let is_profile_active;
  let is_profile_completed;
  let is_user_already_exist = "false";

  const payload = {
    mobile_number: req.headers.mobile_number,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  console.log("Generated token", token);
  console.log("role", role);

  if (role == "brand") {
    let getBrand = `select * from brands where user_id='${user_id}'`;
    connection.query(getBrand, function (err, results) {
      if (err) {
        console.log("error in getting brand details while login", err);
        return;
      }
      if (results.length === 0) {
        let getInfluencers = `select * from influencers where user_id=${user_id}`;
        connection.query(getInfluencers, function (err, result) {
          if (err) {
            console.log("error in getting influencers in brand login", err);
            return;
          }

          if (result.length == 0) {
            let insertBrandDetails = `insert into brands(user_id,brand_name,logo_file_name,logo_file_path,website_url,address,city,state,pincode,email,mobile_number,contact_person_name,designation,gstn,social_media_urls,industry_category,industry_type,is_profile_completed,is_profile_active) values('${user_id}','','','','','','','','','','','','','','','','','','')`;
            connection.query(insertBrandDetails, function (err, results) {
              if (err) {
                console.log(`error in execution of query`, err);
                return;
              }

              is_profile_active = false;
              is_profile_completed = false;
              is_user_already_exist = "false";
              console.log(
                is_profile_active,
                is_profile_completed,
                is_user_already_exist
              );
              res.status(200).json({
                message: "login successful!",
                token: token,
                is_profile_active: is_profile_active,
                is_profile_completed: is_profile_completed,
                is_user_already_exist: is_user_already_exist,
              });
            });
          } else {
            res.status(400).json({
              message:
                "You can not login as brand already registered as influencer!",
            });
          }
        });
      } else {
        is_profile_active = results[0].is_profile_active;
        is_profile_completed = results[0].is_profile_completed;
        is_user_already_exist = "true";
        console.log(is_profile_active, is_profile_completed);
        res.status(200).json({
          message: "login successful!",
          token: token,
          is_profile_active: is_profile_active,
          is_profile_completed: is_profile_completed,
          is_user_already_exist: is_user_already_exist,
          role: "brand",
          user_id: results[0].user_id,
          brand_name: results[0].brand_name,
        });
      }
    });
  } else if (role == "influencer") {
    console.log("role", role);
    console.log("userid", user_id);

    let getInfluencerDetails = `select * from influencers where user_id='${user_id}'`;

    connection.query(getInfluencerDetails, function (err, results) {
      if (err) {
        console.log("error in getting influencer details while login", err);
        return;
      }
      console.log("results");
      console.log(results.length);
      if (results.length == 0) {
        let getBrandDetails = `select * from brands where user_id=${user_id}`;
        connection.query(getBrandDetails, function (err, result) {
          if (err) {
            console.log(
              "error in getting brand details while influencer login",
              err
            );
            return;
          }
          if (result.length == 0) {
            let insertInfluencerDetails = `insert into influencers(user_id,influencer_name,email,dob,gender,address,city,state,pincode,social_media_urls,prefered_brand_categories,profile_image_name,profile_image_path,is_profile_completed,is_profile_active) values('${user_id}','','','','','','','','','','','','','','')`;
            connection.query(insertInfluencerDetails, function (err, results) {
              if (err) {
                console.log(
                  "error in query execution of influencer registration",
                  err
                );
                return;
              }
              console.log("Influencer Registration is sucessfull...", results);
              is_profile_active = false;
              is_profile_completed = false;
              is_user_already_exist = "false";
              console.log(is_profile_active, is_profile_completed);
              res.status(200).json({
                message: "login successful!",
                token: token,
                is_profile_active: is_profile_active,
                is_profile_completed: is_profile_completed,
                is_user_already_exist: is_user_already_exist,
              });
            });
          } else {
            res.status(400).json({
              message:
                "You can not login as influencer already registered as brand!",
            });
          }
        });
      } else {
        is_profile_active = results[0].is_profile_active;
        is_profile_completed = results[0].is_profile_completed;
        is_user_already_exist = "true";

        console.log(is_profile_active, is_profile_completed);
        res.status(200).json({
          message: "login successful!",
          token: token,
          is_profile_active: is_profile_active,
          is_profile_completed: is_profile_completed,
          is_user_already_exist: is_user_already_exist,
          influencer_name: results[0].influencer_name,
          role: "influencer",
          user_id: results[0].user_id,
        });
      }
    });
  } else {
    console.log("please provide valid role");
  }
}

module.exports = loginController;
