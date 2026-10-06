function pageAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/");
    }

    next();
}


function apiAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    next();
}


function reverseAuth(req, res, next) {
    if (req.session.userId) {
        return res.redirect("/user");
    }

    next();
}
function adminApiAuth(req, res, next) {
    if (!req.session.admin) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    next();
}
function adminPageAuth(req, res, next) {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }

    next();
}

module.exports = { pageAuth, apiAuth, reverseAuth,adminApiAuth,adminPageAuth};