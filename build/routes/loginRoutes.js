"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = express_1.Router();
exports.router = router;
// Route handlers
router.get('/', function (req, res) {
    res.send('Wow ');
});
router.get('/login', function (req, res) {
    res.send("\n         <form method=\"POST\">\n            <div>\n                <label>Email </label>\n                <input name=\"email\" />\n            </div>\n            <div>\n                <label>Password</label>\n                <input name=\"password\" type=\"password\"/>\n            </div>\n            <button>Submit</button>\n         </form>\n    ");
});
// NB: There will be no sign up routes
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'cheeks@gmail.com' && password === 'password') {
        // mark user as logged in
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        console.log(req.body);
        res.send('Invalid login credentials');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n            <div>You Are Logged In!</div>\n            <a href=\"/logout\">Logout</a>\n        ");
    }
    else {
        res.send("\n            <div>You Are Not Logged In!</div>\n             <a href=\"/login\">Login</a>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', function (req, res) {
    res.send('Welcome to proctected route, user!');
});
