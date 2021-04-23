const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.body.token;

    if (token) {
        jwt.verify(token, 'adminSecretKey', (err, decodedToken) => {
            if (err) console.log(err);
            else {
                req.isAdmin = true;
                next();
            }
        });
    } else {
        req.isAdmin = false;

        next();
    }
};

module.exports = verifyAdmin;
