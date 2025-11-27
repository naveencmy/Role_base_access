const pool2 = require("../config/db");
const { v4: uuid2 } = require("uuid");
const bcrypt2 = require("bcryptjs");


exports.createWorker = async (req, res) => {
const adminId = req.user.userId;
const { name, email, password } = req.body;


try {
const hashed = await bcrypt2.hash(password, 10);
const id = uuid2();


await pool2.query(
`INSERT INTO users (id, name, email, password, role, admin_id)
VALUES ($1,$2,$3,$4,'worker',$5)`,
[id, name, email, hashed, adminId]
);


res.json({ message: "Worker created" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.getWorkers = async (req, res) => {
try {
const adminId = req.user.userId;
const result = await pool2.query("SELECT * FROM users WHERE role='worker' AND admin_id=$1", [adminId]);
res.json(result.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.updateWorkerStatus = async (req, res) => {
const { id } = req.params;
const { status } = req.body;


try {
await pool2.query("UPDATE users SET status=$1 WHERE id=$2", [status, id]);
res.json({ message: "Worker status updated" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};