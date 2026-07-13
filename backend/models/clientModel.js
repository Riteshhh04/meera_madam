const db = require("../config/database");

// ==============================
// GET ALL CLIENTS
// ==============================
exports.getAllClients = async () => {

    const [rows] = await db.query(`
        SELECT
            client_id AS id,
            name,
            type,
            phone,
            email,
            city,
            status,
            notes,
            created_at,
            updated_at
        FROM clients
        ORDER BY client_id DESC
    `);

    return rows;
};

// ==============================
// GET CLIENT BY ID
// ==============================
exports.getClientById = async (id) => {

    const [rows] = await db.query(`
        SELECT
            client_id AS id,
            name,
            type,
            phone,
            email,
            city,
            status,
            notes,
            created_at,
            updated_at
        FROM clients
        WHERE client_id = ?
    `, [id]);

    return rows[0];
};

// ==============================
// CREATE CLIENT
// ==============================
exports.createClient = async (client) => {

    const sql = `
        INSERT INTO clients
        (
            name,
            type,
            phone,
            email,
            city,
            status,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        client.name,
        client.type,
        client.phone,
        client.email,
        client.city,
        client.status,
        client.notes
    ];

    const [result] = await db.query(sql, values);

    return result;
};

// ==============================
// UPDATE CLIENT
// ==============================
exports.updateClient = async (id, client) => {

    const sql = `
        UPDATE clients
        SET
            name = ?,
            type = ?,
            phone = ?,
            email = ?,
            city = ?,
            status = ?,
            notes = ?
        WHERE client_id = ?
    `;

    const values = [
        client.name,
        client.type,
        client.phone,
        client.email,
        client.city,
        client.status,
        client.notes,
        id
    ];

    const [result] = await db.query(sql, values);

    return result;
};

// ==============================
// DELETE CLIENT
// ==============================
exports.deleteClient = async (id) => {

    const [result] = await db.query(
        "DELETE FROM clients WHERE client_id = ?",
        [id]
    );

    return result;
};