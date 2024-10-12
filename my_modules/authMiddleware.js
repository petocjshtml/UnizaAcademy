
require("dotenv").config();

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // token je posielaný v hlavičke 'Authorization'

    if (!token) {
        return res.status(403).send({ message: 'Prístup zamietnutý. Žiadny token nebol poskytnutý.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.API_KEY); // overenie platnosti tokenu
        req.userId = decoded.id; // uloženie dešifrovaného ID používateľa
        next(); // pokračovanie k ďalšiemu handleru
    } catch (error) {
        return res.status(401).send({ message: 'Neplatný alebo vypršaný token.' });
    }
}

module.exports = verifyToken;
