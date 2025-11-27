const pool3 = require("../config/db");
const path3 = require("path");
const fs = require("fs");
const { v4: uuid3 } = require("uuid");


exports.upload = async (req, res) => {
const adminId = req.user.adminId;
const userId = req.user.userId;
const file = req.file.filename;


try {
const id = uuid3();


await pool3.query(
`INSERT INTO images (id, file_path, admin_id, uploaded_by)
VALUES ($1,$2,$3,$4)`,
[id, file, adminId, userId]
);


res.json({ message: "Image uploaded", id });
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.list = async (req, res) => {
try {
const adminId = req.user.adminId;
const result = await pool3.query("SELECT * FROM images WHERE admin_id=$1", [adminId]);
res.json(result.rows);
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.getById = async (req, res) => {
const { id } = req.params;


try {
const image = await pool3.query("SELECT * FROM images WHERE id=$1", [id]);
if (image.rows.length === 0) return res.status(404).json({ error: "Not found" });


const img = image.rows[0];


if (req.user.adminId !== img.admin_id) {
return res.status(403).json({ error: "Access denied" });
}


const filePath = path3.join(__dirname, "../uploads/", img.file_path);
res.sendFile(filePath);
} catch (err) {
res.status(500).json({ error: err.message });
}
};