const bcrypt = require("bcrypt");
const pool = require("../config/database");

const register = async (req, res) => {
    try {
        const {
            phoneNumber,
            email,
            username,
            password
        } = req.body;

        if (!phoneNumber || !email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone number, email, username and password are required",
            });
        }

        const existingUser = await pool.query(
            `SELECT id
             FROM users
             WHERE email = $1
                OR username = $2
                OR phone_number = $3`,
            [email, username, phoneNumber]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email, username or phone number already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, username, phone_number, password_hash)
             VALUES
                ($1, $2, $3, $4, $5)
             RETURNING id, name, email, username, phone_number, created_at`,
            [
                username,
                email,
                username,
                phoneNumber,
                passwordHash
            ]
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.rows[0],
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    register,
};