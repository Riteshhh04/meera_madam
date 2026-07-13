const db = require("../config/database");

// ==============================
// GET ALL EXPENSES
// ==============================
exports.getAllExpenses = async () => {
    const [rows] = await db.query(`
        SELECT 
            expense_id AS id,
            DATE_FORMAT(expense_date, '%Y-%m-%d') AS date,
            category,
            description,
            amount,
            payment_mode AS paymentMode,
            vendor,
            notes
        FROM expenses
        ORDER BY expense_date DESC, expense_id DESC
    `);
    return rows;
};

// ==============================
// GET EXPENSE BY ID
// ==============================
exports.getExpenseById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            expense_id AS id,
            DATE_FORMAT(expense_date, '%Y-%m-%d') AS date,
            category,
            description,
            amount,
            payment_mode AS paymentMode,
            vendor,
            notes
        FROM expenses
        WHERE expense_id = ?
    `, [id]);
    return rows[0];
};

// ==============================
// CREATE EXPENSE
// ==============================
exports.createExpense = async (data) => {
    const sql = `
        INSERT INTO expenses (expense_date, category, description, amount, payment_mode, vendor, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.date,
        data.category,
        data.description,
        data.amount,
        data.paymentMode,
        data.vendor,
        data.notes
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// UPDATE EXPENSE
// ==============================
exports.updateExpense = async (id, data) => {
    const sql = `
        UPDATE expenses 
        SET expense_date=?, category=?, description=?, amount=?, payment_mode=?, vendor=?, notes=?
        WHERE expense_id=?
    `;
    const values = [
        data.date,
        data.category,
        data.description,
        data.amount,
        data.paymentMode,
        data.vendor,
        data.notes,
        id
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// DELETE EXPENSE
// ==============================
exports.deleteExpense = async (id) => {
    const [result] = await db.query("DELETE FROM expenses WHERE expense_id=?", [id]);
    return result;
};