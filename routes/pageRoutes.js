const express = require("express");
const router = express.Router();
const {pageAuth,reverseAuth,adminPageAuth} = require("../middleware/authMiddleware");
const noCache=require("../middleware/noCache");
const {
    showLoginPage,
    showSignupPage,
    showUserPage,
    showAdminLoginPage,
    showAdminDashboard,
    showAddUserPage,
    showEditUserPage
} = require("../controllers/pageController");

router.get("/", reverseAuth,showLoginPage);
router.get("/signup",noCache,reverseAuth, showSignupPage);
router.get("/user",noCache,pageAuth,showUserPage);
router.get("/admin/login",noCache,reverseAuth, showAdminLoginPage);
router.get("/admin/dashboard",noCache,adminPageAuth,showAdminDashboard);
router.get("/admin/add-user",noCache,adminPageAuth, showAddUserPage);
router.get("/admin/edit-user/:id",noCache, adminPageAuth,showEditUserPage);

module.exports = router;