const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");
const register = async (req, res) => {
    try {
        const { name, phoneNumber, email, username, password } = req.body;

        if (!phoneNumber || !email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone number, email, username and password are required",
            });
        }

        const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
        { phone_number: phoneNumber }
      ]
    },
    select: { id: true }
});

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email, username or phone number already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Use name if provided, otherwise fall back to username
        const displayName = (name && name.trim()) ? name.trim() : username;

        const result = await prisma.user.create({
    data: {
      name: displayName,
      email,
      username,
      phone_number: phoneNumber,
      password_hash: passwordHash
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      phone_number: true,
      created_at: true
    }
});

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result,
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const result = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      phone_number: true,
      password_hash: true
    }
});

        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result;

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        delete user.password_hash;

        res.json({
            success: true,
            message: "Login successful",
            user: user,
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


module.exports = {
    register,
    login,
};