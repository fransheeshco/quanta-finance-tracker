"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const validator_1 = __importDefault(require("validator"));
const authUtils_1 = require("../utils/authUtils");
const check_password_strength_1 = require("check-password-strength");
const associationblock_1 = require("../models/associationblock");
const signUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "All forms must be filled." });
    }
    // check if email is valid
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({ message: "Not a valid email." });
    }
    const strong = (0, check_password_strength_1.passwordStrength)(password).value;
    console.log(strong);
    if (strong === 'Too weak') {
        return res.status(400).json({ message: "Password is too weak." });
    }
    try {
        const user = await associationblock_1.User.findOne({ where: { email } });
        if (user) {
            return res.status(409).json({ message: "user already exists." });
        }
        const hashedPassword = await (0, authUtils_1.hashPassword)(password);
        const newUser = await associationblock_1.User.create({
            fname, lname, email, password: hashedPassword
        });
        const token = (0, authUtils_1.generateToken)(newUser.userID);
        res.status(201).json({ message: "Login successful", token, user: {
                fname: newUser.fname,
                email: newUser.email
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    const { email, password } = req.body;
    // Check for empty fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields must be filled." });
    }
    // Check if email is valid 
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({ message: "Not a valid email." });
    }
    // Look for user
    try {
        const user = await associationblock_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Compare password
        const match = await (0, authUtils_1.comparePasswords)(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid password." });
        }
        // ✅ Success
        const token = (0, authUtils_1.generateToken)(user.userID);
        return res.status(200).json({ message: "Login successful", token, user: {
                userID: user.userID,
                fname: user.fname,
                email: user.email
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error has occured.' });
    }
};
exports.login = login;
