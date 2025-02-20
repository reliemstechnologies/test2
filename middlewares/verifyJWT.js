require("dotenv").config();
const jwt = require("jsonwebtoken");

function VerifyJWT(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const secretKey = process.env.secretKey;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("error in jwt token verification", err);
      return res.status(401).json("invalid token or token provided is expired");
    }
    req.headers.mobile_number = decoded.mobile_number;
    next();
  });
}

module.exports = VerifyJWT;
