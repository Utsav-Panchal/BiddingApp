const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access denied');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!roles.includes(decoded.role)) return res.status(403).send('Forbidden');
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    };
};
