const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid = require("../Middleware/commonMiddleware")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", mid.loginUser)

router.get("/users/:userId", userController.getUserData)

router.put("/Updateusers/:userId", mid.updateUser)

router.put("/Deleteusers/:userId", mid.deleteUser)
module.exports = router;