const express = require("express");
const router = express.Router();

const { adminLogin,getUsers,createUser,updateUser,deleteUser,adminLogout,adminStatus} = require("../controllers/adminController");
const { adminApiAuth } = require("../middleware/authMiddleware");
router.post("/login", adminLogin);
router.get("/users",adminApiAuth,getUsers);
router.post("/users",adminApiAuth,createUser);
router.put("/users/:id",adminApiAuth,updateUser);
router.delete("/users/:id", adminApiAuth, deleteUser);
router.post("/logout",adminLogout);
router.get("/status",adminStatus);
module.exports = router;