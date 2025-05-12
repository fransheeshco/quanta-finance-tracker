"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const authUtils_1 = require("../utils/authUtils");
const authToken = (req, res, next) => {
    const authHeader = req.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided." });
        return;
    }
    try {
        const decoded = (0, authUtils_1.verifyToken)(token);
        req.userID = decoded.userID;
        console.log("Full decoded token:", decoded);
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
exports.authToken = authToken;
