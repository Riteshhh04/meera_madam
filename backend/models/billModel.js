const db = require("../config/database");

// ==============================
// GET ALL BILLS
// ==============================
exports.getAllBills = async () => {
    const [rows] = await db.query(`
        SELECT 
            bill_id AS id,
            bill_name AS name,
            vendor,
            category,
            amount,
            DATE_FORMAT(due_date, '%Y-%m-%d') AS dueDate,
            status,
            DATE_FORMAT(paid_date, '%Y-%m-%d') AS paidDate,
            payment_mode AS paymentMode,
            notes
        FROM bills
        ORDER BY due_date ASC, bill_id DESC
    `);
    return rows;
};

// ==============================
// GET BILL BY ID
// ==============================
exports.getBillById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            bill_id AS id,
            bill_name AS name,
            vendor,
            category,
            amount,
            DATE_FORMAT(due_date, '%Y-%m-%d') AS dueDate,
            status,
            DATE_FORMAT(paid_date, '%Y-%m-%d') AS paidDate,
            payment_mode AS paymentMode,
            notes
        FROM bills
        WHERE bill_id = ?
    `, [id]);
    return rows[0];
};

// ==============================
// CREATE BILL
// ==============================
exports.createBill = async (data) => {
    const sql = `
        INSERT INTO bills (bill_name, vendor, category, amount, due_date, status, paid_date, payment_mode, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.name,
        data.vendor,
        data.category,
        data.amount,
        data.dueDate || null,
        data.status || 'Unpaid',
        data.paidDate || null,
        data.paymentMode || 'UPI',
        data.notes
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// UPDATE BILL
// ==============================
exports.updateBill = async (id, data) => {
    const sql = `
        UPDATE bills 
        SET bill_name=?, vendor=?, category=?, amount=?, due_date=?, status=?, paid_date=?, payment_mode=?, notes=?
        WHERE bill_id=?
    `;
    const values = [
        data.name,
        data.vendor,
        data.category,
        data.amount,
        data.dueDate || null,
        data.status,
        data.paidDate || null,
        data.paymentMode,
        data.notes,
        id
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// DELETE BILL
// ==============================
exports.deleteBill = async (id) => {
    const [result] = await db.query("DELETE FROM bills WHERE bill_id=?", [id]);
    return result;
};