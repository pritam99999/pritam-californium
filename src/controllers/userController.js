const { count } = require("console")
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Assignment Submission for Try Catch and HTTP status codes
const createUser = async function (req, res) {
  try{
  let data = req.body;
  let savedData = await userModel.create(data);  
  res.status(200).send({ msg: savedData });
}
catch (err)
{
console.log("this is the error",err)
res.status(400).send({msg:"Please Check Your Input", error : err})

}
}

const getUserData = async function (req, res) {
  try{
   let token = req.headers["x-auth-token"];
  if (!token) token = req.headers["x-auth-token"]; 
  if (!token) return res.send({ status: false, msg: "token must be present" });  
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails) 
  return res.send({ status: false, msg: "No such user exists" }); 
  res.send({ status: true, data: userDetails }); 
  }
  catch (err)
{
  res.status(401).send({msg: "Authentication Error", error:err})   
}
}


const postMessage = async function(req,res){
  let message = req.body.message
  let token = req.header["x-auth-token"]
  let decodedToken = jwt.verify(token,'secret-ring')
  let usertobeModified = req.params.userId
  let userLoggedIn = decodedToken.userId
  if(usertobeModified != userLoggedIn)
  return res.send({status:false, msg:"USER LOGGED IN IS NOT ALLOWED {FORBIDDEN}"})
  let user = await userModel.findById(req.params.userId)
  if(!user)return res.send({ status: false, msg:'No Such User exists'})
  let updatedPosts = user.post
  updatedPosts.push(message)
  let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts : updatedPosts}, {new : true})
  return res.send ({status:true, data:updatedUser})




}

module.exports.postMessage=postMessage
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
