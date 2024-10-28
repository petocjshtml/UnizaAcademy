require("dotenv").config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).send({ message: 'Prístup zamietnutý. Žiadny token nebol poskytnutý.' });
    }
    jwt.verify(token, process.env.API_KEY, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send({ message: "Token vypršal, prosím, prihláste sa znova" });
            }
            return res.status(401).send({ message: "Neplatný token" });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
