const User = require("../models/User");

function showAdminDashboard(req, res) {
    res.render("admin/dashboard");
}

function showAddUserPage(req, res) {
    res.render("admin/add-user");
}

async function showEditUserPage(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.render("admin/edit-user", { user });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

function showUserPage(req, res) {
    res.render("user");
}

function showLoginPage(req, res) {
    res.render("login");
}

function showSignupPage(req, res) {
    res.render("signup");
}

function showAdminLoginPage(req, res) {
    res.render("admin/login");
}

module.exports = {
    showAdminDashboard,
    showAddUserPage,
    showEditUserPage,
    showUserPage,
    showLoginPage,
    showSignupPage,
    showAdminLoginPage
};