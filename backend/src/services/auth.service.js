const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");


exports.registerAdmin = async (req, res) => {
const { name, email, password } = req.body;


try {
const hashed = await bcrypt.hash(password, 10);
const id = uuid();


await pool.query(
"INSERT INTO users (id, name, email, password, role) VALUES ($1,$2,$3,$4,'admin')",
[id, name, email, hashed]
);


res.json({ message: "Admin registered" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;


try {
const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });


const user = result.rows[0];
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ error: "Invalid password" });


const token = jwt.sign({
userId: user.id,
role: user.role,
adminId: user.role === "worker" ? user.admin_id : user.id
}, process.env.JWT_SECRET, { expiresIn: "10h" });


res.json({ token });
} catch (err) {
res.status(500).json({ error: err.message });
}
};