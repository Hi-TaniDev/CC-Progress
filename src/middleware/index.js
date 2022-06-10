const { authJwt } = require("./authJwt.js");
const { verifySignUp } = require("./verifySignUp.js");
const { upload } = require("./upload.js");

module.exports = { authJwt, verifySignUp, upload };