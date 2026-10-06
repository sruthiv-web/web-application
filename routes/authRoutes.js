const express = require("express");
const router = express.Router();

const {loginUser,signupUser,logoutUser,userStatus} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.get("/auth/status",userStatus);

module.exports = router;