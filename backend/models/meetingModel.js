const db = require("../config/database");

// ==============================
// GET ALL MEETINGS
// ==============================
exports.getAllMeetings = async () => {
    const [rows] = await db.query(`
        SELECT 
            m.meeting_id AS id,
            m.client_id,
            c.name AS title, -- Grabs the client name and calls it 'title' for the frontend
            m.with_whom AS withWhom,
            DATE_FORMAT(m.meeting_date, '%Y-%m-%d') AS date,
            TIME_FORMAT(m.meeting_time, '%H:%i') AS time,
            m.mode,
            m.notes
        FROM meetings m
        LEFT JOIN clients c ON m.client_id = c.client_id
        ORDER BY m.meeting_date DESC, m.meeting_time DESC
    `);
    return rows;
};

// ==============================
// GET MEETING BY ID
// ==============================
exports.getMeetingById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            m.meeting_id AS id,
            m.client_id,
            c.name AS title,
            m.with_whom AS withWhom,
            DATE_FORMAT(m.meeting_date, '%Y-%m-%d') AS date,
            TIME_FORMAT(m.meeting_time, '%H:%i') AS time,
            m.mode,
            m.notes
        FROM meetings m
        LEFT JOIN clients c ON m.client_id = c.client_id
        WHERE m.meeting_id = ?
    `, [id]);
    return rows[0];
};

// ==============================
// CREATE MEETING
// ==============================
exports.createMeeting = async (data) => {
    const sql = `
        INSERT INTO meetings (client_id, with_whom, meeting_date, meeting_time, mode, notes)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.client_id,
        data.withWhom,
        data.date,
        data.time || null,
        data.mode || 'Call',
        data.notes
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// UPDATE MEETING
// ==============================
exports.updateMeeting = async (id, data) => {
    const sql = `
        UPDATE meetings 
        SET client_id=?, with_whom=?, meeting_date=?, meeting_time=?, mode=?, notes=?
        WHERE meeting_id=?
    `;
    const values = [
        data.client_id,
        data.withWhom,
        data.date,
        data.time || null,
        data.mode,
        data.notes,
        id
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// DELETE MEETING
// ==============================
exports.deleteMeeting = async (id) => {
    const [result] = await db.query("DELETE FROM meetings WHERE meeting_id=?", [id]);
    return result;
};