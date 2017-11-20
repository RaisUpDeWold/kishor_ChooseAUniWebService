const pkg = require('../package.json');
const logger = require('../modules/logger.js');
const url = require('url');

/* LogIn Action */
function login(req, res, next) {
    let user_email = "a@a.a";
    let user_pass = "a";
    if (req.body.user_email == user_email && req.body.user_pass == user_pass) res.redirect("/search");
    else res.redirect(url.format({
        pathname: "/",
        query: {
            "login_failed": "Invalid Login Credentials"
        }
    }));
}

module.exports = {
    login: login
};