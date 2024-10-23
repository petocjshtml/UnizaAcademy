
require("dotenv").config();

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    //.split(' ')[1] Odstráni 'Bearer ' z tokenu pre správne fungovanie funkcie jwt.verify
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).send({ message: 'Prístup zamietnutý. Žiadny token nebol poskytnutý.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.API_KEY); // overenie platnosti tokenu
        req.userId = decoded.id; // pri admin endpointoch overiť, či user id má práva administrátora
        next(); // pokračovanie k ďalšiemu handleru
    } catch (error) {
        return res.status(401).send({ message: 'Neplatný alebo vypršaný token.' });
    }
}

module.exports = verifyToken;
