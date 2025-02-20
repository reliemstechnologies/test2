const connection = require("../config/dbconfig");

function InfluencersList(req, res) {
  let getAllInfluencers = `select * from influencers`;

  connection.query(getAllInfluencers, function (err, results) {
    if (err) {
      console.log(
        "error in query execution of getting list of influencers",
        err
      );
      return;
    }
    console.log("Query sucessfull..", results);
    res.json(results);
  });
}

module.exports = InfluencersList;
