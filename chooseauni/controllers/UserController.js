const pkg = require('../package.json');
const logger = require('../modules/logger.js');
const url = require('url');

/* LogIn Action */
function login(req, res, next) {
    let user_email = "test@chooseauni.com";
    let user_pass = "123cba";
    if (req.body.user_email == user_email && req.body.user_pass == user_pass) res.redirect("/search");
    else res.redirect(url.format({
        pathname: "/",
        query: {
            "login_failed": "Login Detail Invalid"
        }
    }));
}

module.exports = {
    login: login
};