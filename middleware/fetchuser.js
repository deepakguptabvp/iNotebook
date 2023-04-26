const jwt = require("jsonwebtoken");
const JWT_SECRET = "Deepakis$doingG$reat";

const fetuser = (req, res, next) => { // Get the user from jwt token and add id to req obj...
    const token = req.header("auth-token");
    if (! token) {
        return res.status(401).send({error: "Please aunthenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Please aunthenticate using valid token"});
    }
};

module.exports = fetuser;
