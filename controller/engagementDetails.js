const connection = require("../config/dbconfig");

function EngagementDetails(req, res) {
  const engagement_id = req.headers.engagement_id;
  let query = `select * from engagements where engagement_id='${engagement_id}'`;
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in query execution of engagements", err);
      return;
    }

    let campaign_id = results[0].campaign_id;

    let getCampaignDetails = `select * from campaigns where campaign_id='${campaign_id}'`;

    connection.query(getCampaignDetails, function (err, result) {
      if (err) {
        console.log(
          "error in getting campaign details in engagement list",
          err
        );
        return;
      }

      let proposal_description = "";
      let proposal_id = "";
      let post_file_name = "";
      let post_file_path = "";

      console.log(results[0].status);

      if (
        results[0].status == "Proposal Submitted" ||
        results[0].status == "Proposal Approved" ||
        results[0].status == "Proposal Rejected" ||
        results[0].status == "Go Live" ||
        results[0].status == "Completed"
      ) {
        let getProposalDetails = `select * from proposals where engagement_id='${engagement_id}'`;
        connection.query(getProposalDetails, function (err, propResults) {
          if (err) {
            return;
          }

          console.log(propResults[0]);

          if (propResults.length > 0) {
            console.log(propResults[0].proposal_description);
            proposal_description = propResults[0].proposal_description;
            proposal_id = propResults[0].proposal_id;
            post_file_name = propResults[0].post_file_name;
            post_file_path = propResults[0].post_file_path;

            res.status(200).send({
              engagement_id: results[0].engagement_id,
              user_id: results[0].user_id,
              campaign_id: results[0].campaign_id,
              engagement_name: results[0].engagement_name,
              status: results[0].status,
              campaign_description: result[0].campaign_description,
              campaign_start_date: result[0].campaign_start_date,
              campaign_end_date: result[0].campaign_end_date,
              campaign_industry: result[0].campaign_industry,
              number_of_posts: result[0].number_of_posts,
              proposal_description: proposal_description,
              proposal_id: proposal_id,
              post_file_name: post_file_name,
              post_file_path: "http://localhost:3031/uploads/" + post_file_name,
            });
          }
        });
      } else {
        res.status(200).send({
          engagement_id: results[0].engagement_id,
          user_id: results[0].user_id,
          campaign_id: results[0].campaign_id,
          engagement_name: results[0].engagement_name,
          status: results[0].status,
          campaign_description: result[0].campaign_description,
          campaign_start_date: result[0].campaign_start_date,
          campaign_end_date: result[0].campaign_end_date,
          campaign_industry: result[0].campaign_industry,
          number_of_posts: result[0].number_of_posts,
        });
      }
    });
  });
}

module.exports = EngagementDetails;
