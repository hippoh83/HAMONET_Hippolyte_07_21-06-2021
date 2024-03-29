const jwt = require('jsonwebtoken');


// changer la clé random token qui est trop utilisée et facilement trouvable
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        next()
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }

};