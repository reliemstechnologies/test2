const jwt = require("jsonwebtoken");
require("dotenv").config();
const connection = require("../config/dbconfig");
const multer = require("multer");
const fs = require("fs");
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

function BrandRegisterController(req, res) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });
  const upload = multer({ storage });

  console.log("req.logo");
  console.log(req.file);

  try {
    upload.single("file")(req, res, (err) => {
      console.log("file");
      console.log(req.file);
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).send("Error uploading file");
      }
      console.log("File Uploaded:", req.file);
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      req.body = JSON.parse(req.body.brandDetails);

      let user_id = req.headers.mobile_number;
      let brand_name = req.body.brand_name;
      let website_url = req.body.website_url;
      let address = req.body.address;
      let email = req.body.email;
      let gstn = req.body.gstn;
      let social_media_urls = "";
      let designation = req.body.designation;
      let state = req.body.state;
      let contact_person_name = req.body.contact_person_name;
      let pincode = req.body.pincode;
      let city = req.body.city;
      let industry_category = req.body.industry_category;
      let industry_type = req.body.industry_type;
      const fileName = req.file.originalname;
      const filePath = req.file ? req.file.path : null;
      let is_profile_completed = true;
      let is_profile_active = true;
      let selectedoptions = req.body.selectedoptions;

      console.log(selectedoptions);
      let stringSelectedOptions = selectedoptions;
      for (let i = 0; i < selectedoptions.length; i++) {
        if (i == 0) {
          social_media_urls = selectedoptions[i];
        } else {
          social_media_urls = social_media_urls + "~" + selectedoptions[i];
        }
      }
      console.log(social_media_urls);

      let updateBrandDetails = `update brands set brand_name='${brand_name}',logo_file_name='${fileName}',logo_file_path='${filePath}',website_url='${website_url}',address='${address}',city='${city}', state='${state}',pincode='${pincode}',email='${email}',mobile_number='${user_id}',contact_person_name='${contact_person_name}',designation='${designation}',gstn='${gstn}',social_media_urls='${social_media_urls}',industry_category='${industry_category}',industry_type='${industry_type}', is_profile_completed=${is_profile_completed}, is_profile_active=${is_profile_active} where user_id='${user_id}'`;

      connection.query(updateBrandDetails, function (err, results) {
        if (err) {
          console.log(`error in execution of query`, err);
          return;
        }

        res.status(200).json({
          message: "Brand Registration Successful! ",
          data: results,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing the request." });
  }
}

module.exports = BrandRegisterController;
