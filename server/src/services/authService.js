// Note: This file is currently unused by the server controllers,
// which call the database directly. Kept for reference.
const pool = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = { pool, bcrypt };
