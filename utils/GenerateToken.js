const jwt = require('jsonwebtoken');

const generateToken = () => {
    jwt.sign(
        {
            data: 'admin'
        },
        'adminSecretKey',
        (err, token) => {
            if (err) console.log(err);
            else {
                console.log(token);
            }
        }
    );
};

generateToken();
