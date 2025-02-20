const connection = require("../config/dbconfig");

function CampaignUpdate(req, res) {
  let campaign_id = req.body.campaign_id;
  console.log("campagin id", campaign_id);

  let campaign_name;
  let brand_name;
  let campaign_objective;
  let campaign_description;
  let campaign_industry;
  let location;
  let campaign_start_date;
  let campaign_end_date;
  let total_budget;
  let payment_structure;
  let prefered_influencer_type;
  let prefered_platform;
  let followers_count;
  let engagement_rate;
  let influencer_niche;
  let no_of_influencers;
  let expected_revenue;
  let content_type;
  let number_of_posts;
  let hash_tag_used;
  let mentioned_tags;
  let approval_required;

  console.log("campaign id", campaign_id);

  let getCampaignData = `select * from campaigns where campaign_id='${campaign_id}'`;

  connection.query(getCampaignData, function (err, results) {
    if (err) {
      console.log("error in getting campaign details...", err);
      return;
    }
    // console.log("Campaign details are", results[0]);
    campaign_name = req.body.campaign_name
      ? req.body.campaign_name
      : results[0].campaign_name;

    brand_name = req.body.brand_name
      ? req.body.brand_name
      : results[0].brand_name;

    campaign_objective = req.body.campaign_objective
      ? req.body.campaign_objective
      : results[0].campaign_objective;

    campaign_description = req.body.campaign_description
      ? req.body.campaign_description
      : results[0].campaign_description;

    campaign_industry = req.body.campaign_industry
      ? req.body.campaign_industry
      : results[0].campaign_industry;

    campaign_start_date = req.body.campaign_start_date
      ? req.body.campaign_start_date
      : results[0].campaign_start_date;

    campaign_end_date = req.body.campaign_end_date
      ? req.body.campaign_end_date
      : results[0].campaign_end_date;

    total_budget = req.body.total_budget
      ? req.body.total_budget
      : results[0].total_budget;

    payment_structure = req.body.payment_structure
      ? req.body.payment_structure
      : results[0].payment_structure;

    prefered_influencer_type = req.body.prefered_influencer_type
      ? req.body.prefered_influencer_type
      : results[0].prefered_influencer_type;

    prefered_platform = req.body.prefered_platform
      ? req.body.prefered_platform
      : results[0].prefered_platform;

    followers_count = req.body.followers_count
      ? req.body.followers_count
      : results[0].followers_count;

    engagement_rate = req.body.engagement_rate
      ? req.body.engagement_rate
      : results[0].engagement_rate;

    influencer_niche = req.body.influencer_niche
      ? req.body.influencer_niche
      : results[0].influencer_niche;

    no_of_influencers = req.body.no_of_influencers
      ? req.body.no_of_influencers
      : results[0].no_of_influencers;

    expected_revenue = req.body.expected_revenue
      ? req.body.expected_revenue
      : results[0].expected_revenue;

    content_type = req.body.content_type
      ? req.body.content_type
      : results[0].content_type;

    number_of_posts = req.body.number_of_posts
      ? req.body.number_of_posts
      : results[0].number_of_posts;

    hash_tag_used = req.body.hash_tag_used
      ? req.body.hash_tag_used
      : results[0].hash_tag_used;

    mentioned_tags = req.body.mentioned_tags
      ? req.body.mentioned_tags
      : results[0].mentioned_tags;

    approval_required = req.body.approval_required
      ? req.body.approval_required
      : results[0].approval_required;

    location = req.body.location ? req.body.location : results[0].location;

    console.log(campaign_id);

    let updateCampaignDetails = `update campaigns set campaign_name='${campaign_name}', brand_name='${brand_name}', campaign_objective='${campaign_objective}', campaign_description='${campaign_description}', campaign_industry='${campaign_industry}', campaign_start_date='${campaign_start_date}', campaign_end_date='${campaign_end_date}', total_budget='${total_budget}', payment_structure='${payment_structure}', prefered_influencer_type='${prefered_influencer_type}', prefered_platform='${prefered_platform}', followers_count='${followers_count}', engagement_rate='${engagement_rate}', influencer_niche='${influencer_niche}', no_of_influencers='${no_of_influencers}', expected_revenue='${expected_revenue}', content_type='${content_type}', number_of_posts='${number_of_posts}', hash_tag_used='${hash_tag_used}', mentioned_tags='${mentioned_tags}', approval_required='${approval_required}', location='${location}' where campaign_id='${campaign_id}'`;

    connection.query(updateCampaignDetails, function (err, results) {
      if (err) {
        console.log("error in updating campaign details", err);
        return;
      }
      console.log("campaign details are updated successfully...", results[0]);
      res.status(200).json({ message: "Campagin updated successfully.." });
    });
  });
}

module.exports = CampaignUpdate;
