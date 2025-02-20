require("dotenv").config();
const jwt = require("jsonwebtoken");
const connection = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");

function CampaignCreate(req, res) {
  let user_id = req.headers.mobile_number;
  const secretKey = process.env.secretKey;
  console.log(" secretKey", secretKey);

  console.log("request body");
  console.log(req.body);

  let campaign_id = uuidv4();
  let campaign_name = req.body.campaign_name;
  let brand_name = req.body.brand_name;
  let campaign_objective = req.body.campaign_objective;
  let campaign_description = req.body.campaign_description;
  let campaign_industry = req.body.campaign_industry;
  let location = req.body.location;
  let campaign_start_date = req.body.campaign_start_date;
  let campaign_end_date = req.body.campaign_end_date;
  let total_budget = req.body.total_budget;
  let payment_structure = req.body.payment_structure;
  let prefered_influencer_type = req.body.prefered_influencer_type;
  let prefered_platform = req.body.prefered_platform;
  let followers_count = req.body.followers_count;
  let engagement_rate = req.body.engagement_rate;
  let influencer_niche = req.body.influencer_niche;
  let no_of_influencers = req.body.no_of_influencers;
  let expected_revenue = req.body.expected_revenue;
  let content_type = req.body.content_type;
  let number_of_posts = req.body.number_of_posts;
  let hash_tag_used = req.body.hash_tag_used;
  let mentioned_tags = req.body.mentioned_tags;
  let approval_required = req.body.approval_required;

  let insertCampaignDetails = `insert into campaigns(user_id,campaign_id,campaign_name,brand_name,campaign_objective,campaign_description,campaign_industry,location,campaign_start_date,campaign_end_date,total_budget,payment_structure,prefered_influencer_type,prefered_platform,followers_count,engagement_rate,influencer_niche,no_of_influencers,expected_revenue,content_type,number_of_posts,hash_tag_used,mentioned_tags,approval_required) values('${user_id}','${campaign_id}','${campaign_name}','${brand_name}','${campaign_objective}','${campaign_description}','${campaign_industry}','${location}','${campaign_start_date}','${campaign_end_date}','${total_budget}','${payment_structure}','${prefered_influencer_type}','${prefered_platform}','${followers_count}','${engagement_rate}','${influencer_niche}','${no_of_influencers}','${expected_revenue}','${content_type}','${number_of_posts}','${hash_tag_used}','${mentioned_tags}','${approval_required}')`;

  connection.query(insertCampaignDetails, (err, results) => {
    if (err) {
      console.log("error in executing insert campaign query", err);
      return;
    }
    console.log("campaign details inserted successfully ", results[0]);
    res.status(200).json({ message: "Campaign created successfully.." });
  });
}

module.exports = CampaignCreate;
