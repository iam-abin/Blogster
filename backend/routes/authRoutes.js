const passport = require("passport");
const { FRONTEND_URL } = require("../utils/constants");

module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            console.log("User after callback:", req.user); // Debug
            res.redirect(FRONTEND_URL);
        }
    );

    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.send({message: "logout success"});
    });

    app.get("/api/current-user", (req, res) => {
        res.send(req.user);
    });
};
