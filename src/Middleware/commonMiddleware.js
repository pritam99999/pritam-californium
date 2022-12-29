const userModel= require("../models/userModel")
const jwt = require("jsonwebtoken");

const loginUser = async function (req, res,next) {
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
    return res.send({status: false,msg: "the credentials don't match with any user's data",});
    let token = jwt.sign(
        {userId: user._id.toString(),
        Clan:"Uchiha",
        Organisation: "Akatsuki",},
        "secret-ring");

    res.setHeader("x-auth-token",token);
    res.send({ status: true, token: token });
    next();
  };

  const updateUser = async function (req, res) {  
    let token = req.headers["x-auth-token"];
    if (!token) token = req.headers["x-auth-token"]; 
    if (!token) return res.send({ status: false, msg: "token must be present" });  
    let userId = req.params.userId;
    let user = await userModel.findById(userId); 
    if (!user) {
      return res.send("Invalid User ID");
    }
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: updatedUser, data: updatedUser });
  
    next();
};
  
  const deleteUser = async function (req, res) {
    let token = req.headers["x-auth-token"];
    if (!token) token = req.headers["x-auth-token"]; 
    if (!token){
    return res.send({ status: false, msg: "token must be present" });  
  }
  
    let userId = req.params.userId;
    let user = await userModel.findById(userId); 
    if (!user) {
      return res.send("No such user exists");
    }
    let userData = req.body;
    let deletedUser = await userModel.findOneAndDelete({ _id: userId }, userData);
    res.send({ status: deletedUser, data: deletedUser });
    next();
  };

 



module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser;
