const jwt = require("jsonwebtoken");

const isAuthorized = function (req) {
  return true;
  // return !!req.headers.authorization;
};

const getToken = function (email) {
  const role = email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
  return jwt.sign({ role, email }, "shhhhh");
};

module.exports = {
  isAuthorized,
  getToken,
};
