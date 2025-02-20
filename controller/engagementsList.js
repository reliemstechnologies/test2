const connection = require("../config/dbconfig");

function EngagementList(req, res) {
  const user_id = req.headers.mobile_number;
  const role = req.headers.role;
  let query = "";
  if (role == "brand") {
    query = `select * from engagements where brand_user_id=${user_id}`;
  } else {
    query = `select * from engagements where user_id=${user_id}`;
  }
  connection.query(query, function (err, results) {
    if (err) {
      console.log("error in query execution of engagements");
      return;
    }
    console.log("get engagement query is successfull...", results);
    res.json(results);
  });
}

module.exports = EngagementList;
