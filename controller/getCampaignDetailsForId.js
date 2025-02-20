const connection = require("../config/dbconfig");

function getCampaignDetailsForId(req, res) {
  const mobile_number = req.headers.mobile_number;
  const campaign_id = req.headers.campaign_id;

  let query = `select * from campaigns where campaign_id='${campaign_id}'`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in select query of brand", err);
      return;
    }

    const campaign_start_date = formatDate(results[0].campaign_start_date);
    const campaign_end_date = formatDate(results[0].campaign_end_date);

    res.status(200).json({
      campaign_id: results[0].campaign_id,
      campaign_name: results[0].campaign_name,
      created_at: results[0].created_at,
      brand_name: results[0].brand_name,
      campaign_objective: results[0].campaign_objective,
      campaign_description: results[0].campaign_description,
      campaign_industry: results[0].campaign_industry,
      campaign_start_date: campaign_start_date,
      campaign_end_date: campaign_end_date,
      total_budget: results[0].total_budget,
      payment_structure: results[0].payment_structure,
      prefered_influencer_type: results[0].prefered_influencer_type,
      prefered_platform: results[0].prefered_platform,
      followers_count: results[0].followers_count,
      engagement_rate: results[0].engagement_rate,
      influencer_niche: results[0].influencer_niche,
      no_of_influencers: results[0].no_of_influencers,
      expected_revenue: results[0].expected_revenue,
      content_type: results[0].content_type,
      number_of_posts: results[0].number_of_posts,
      hash_tag_used: results[0].hash_tag_used,
      mentioned_tags: results[0].mentioned_tags,
      approval_required: results[0].approval_required,
      user_id: results[0].user_id,
      modified_at: results[0].modified_at,
      location: results[0].location,
    });
  });
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because getMonth() returns 0-indexed months
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

module.exports = getCampaignDetailsForId;
