const connection = require("../config/dbconfig");
const multer = require("multer");
const fs = require("fs");
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

function InfluencerRegister(req, res) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });

  const upload = multer({ storage });

  console.log("req.profile image");
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

      req.body = JSON.parse(req.body.influencerDetails);

      let user_id = req.headers.mobile_number;
      let influencer_name = req.body.influencer_name;
      let email = req.body.email;
      let dob = req.body.dob;
      let gender = req.body.gender;
      let address = req.body.address;
      let state = req.body.state;
      let pincode = req.body.pincode;
      let city = req.body.city;
      const fileName = req.file.originalname;
      const filePath = req.file ? req.file.path : null;
      let is_profile_completed = true;
      let is_profile_active = true;
      let prefered_brand_categories = req.body.prefered_brand_categories;
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

      let updateInfluencerDetails = `update influencers set influencer_name='${influencer_name}', email='${email}', dob='${dob}', gender='${gender}', address='${address}', city='${city}', state='${state}', pincode='${pincode}', prefered_brand_categories='${prefered_brand_categories}', social_media_urls='${social_media_urls}', profile_image_name='${fileName}', profile_image_path='${filePath}', is_profile_completed=${is_profile_completed}, is_profile_active=${is_profile_active} where user_id='${user_id}'`;

      connection.query(updateInfluencerDetails, function (err, results) {
        if (err) {
          console.log(
            `error in query execution of influencer registration `,
            err
          );
          return;
        }
        console.log("Influencer Registration is sucessfull...", results);
        res
          .status(200)
          .json({ message: "Influencer Registration Successful! ", results });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing the request." });
  }
}

module.exports = InfluencerRegister;
