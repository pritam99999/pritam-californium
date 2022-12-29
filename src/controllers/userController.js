const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);  
  res.send({ msg: savedData });
};


const getUserData = async function (req, res) {
  let token = req.headers["x-auth-token"];
  if (!token) token = req.headers["x-auth-token"]; 
  if (!token) return res.send({ status: false, msg: "token must be present" });  
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });  
};



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
