const db = require("../config/database");

// ============================
// GET ALL STAFF
// ============================

exports.getAllStaff = async () => {

    const [rows] = await db.query(`
        SELECT
            staff_id AS id,
            name,
            role,
            salary,
            phone,
            join_date AS joinDate,
            status,
            payment_mode AS paymentMode,
            notes
        FROM staff
        ORDER BY staff_id DESC
    `);

    return rows;

};

// ============================
// GET STAFF BY ID
// ============================

exports.getStaffById = async (id) => {

    const [rows] = await db.query(`
        SELECT
            staff_id AS id,
            name,
            role,
            salary,
            phone,
            join_date AS joinDate,
            status,
            payment_mode AS paymentMode,
            notes
        FROM staff
        WHERE staff_id=?
    `,[id]);

    return rows[0];

};

// ============================
// CREATE STAFF
// ============================

exports.createStaff = async (staff) => {

    const sql = `
        INSERT INTO staff
        (
            name,
            role,
            salary,
            phone,
            join_date,
            status,
            payment_mode,
            notes
        )
        VALUES
        (?,?,?,?,?,?,?,?)
    `;

    const values = [

        staff.name,
        staff.role,
        staff.salary,
        staff.phone,
        staff.joinDate,
        staff.status,
        staff.paymentMode,
        staff.notes

    ];

    const [result] = await db.query(sql, values);

    return result;

};

// ============================
// UPDATE STAFF
// ============================

exports.updateStaff = async (id, staff) => {

    const sql = `
        UPDATE staff
        SET
            name=?,
            role=?,
            salary=?,
            phone=?,
            join_date=?,
            status=?,
            payment_mode=?,
            notes=?
        WHERE staff_id=?
    `;

    const values = [

        staff.name,
        staff.role,
        staff.salary,
        staff.phone,
        staff.joinDate,
        staff.status,
        staff.paymentMode,
        staff.notes,
        id

    ];

    const [result] = await db.query(sql, values);

    return result;

};

// ============================
// DELETE STAFF
// ============================

exports.deleteStaff = async (id) => {

    const [result] = await db.query(

        "DELETE FROM staff WHERE staff_id=?",

        [id]

    );

    return result;

};