const connection = require("../config/dbconfig");

function DeleteInfluencer(req, res) {
  const influencer_id = req.headers.influencer_id;
  console.log("delete influencer api", influencer_id);
  console.log("influencer_id", influencer_id);
  let deleteInfluencer = `delete from influencers where user_id='${influencer_id}'`;

  connection.query(deleteInfluencer, function (err, results) {
    if (err) {
      console.log("error in deleting the campaigns....", err);
      return;
    }
    // console.log("Campaign deleted successfully ....", results);
    res.status(200).json({ message: "Influencer deleted successfully ...." });
  });
}

module.exports = DeleteInfluencer;
