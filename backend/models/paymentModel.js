const db = require("../config/database");

exports.getAllPayments = async () => {
    const [rows] = await db.query(`
        SELECT 
            p.payment_id AS id,
            p.invoice_id,
            p.client_id,
            c.name AS client,
            p.artwork_description AS artwork,
            p.total_amount AS totalAmount,
            p.amount_paid AS amountPaid,
            p.pending_amount AS pending,
            p.status,
            DATE_FORMAT(p.due_date, '%Y-%m-%d') AS dueDate,
            DATE_FORMAT(p.paid_date, '%Y-%m-%d') AS paidDate,
            p.notes
        FROM payments p
        LEFT JOIN clients c ON p.client_id = c.client_id
        ORDER BY p.due_date ASC, p.payment_id DESC
    `);
    return rows;
};

exports.getPaymentById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            p.payment_id AS id,
            p.invoice_id,
            p.client_id,
            c.name AS client,
            p.artwork_description AS artwork,
            p.total_amount AS totalAmount,
            p.amount_paid AS amountPaid,
            p.pending_amount AS pending,
            p.status,
            DATE_FORMAT(p.due_date, '%Y-%m-%d') AS dueDate,
            DATE_FORMAT(p.paid_date, '%Y-%m-%d') AS paidDate,
            p.notes
        FROM payments p
        LEFT JOIN clients c ON p.client_id = c.client_id
        WHERE p.payment_id = ?
    `, [id]);
    return rows[0];
};

exports.createPayment = async (data) => {
    const sql = `
        INSERT INTO payments (invoice_id, client_id, artwork_description, total_amount, amount_paid, pending_amount, status, due_date, paid_date, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.invoice_id || null, // Allow null if not attached to an invoice
        data.client_id,
        data.artwork,
        data.totalAmount,
        data.amountPaid || 0,
        data.pending || 0,
        data.status || 'Pending',
        data.dueDate || null,
        data.paidDate || null,
        data.notes
    ];
    const [result] = await db.query(sql, values);
    return result;
};

exports.updatePayment = async (id, data) => {
    const sql = `
        UPDATE payments 
        SET invoice_id=?, client_id=?, artwork_description=?, total_amount=?, amount_paid=?, pending_amount=?, status=?, due_date=?, paid_date=?, notes=?
        WHERE payment_id=?
    `;
    const values = [
        data.invoice_id || null,
        data.client_id,
        data.artwork,
        data.totalAmount,
        data.amountPaid,
        data.pending,
        data.status,
        data.dueDate || null,
        data.paidDate || null,
        data.notes,
        id
    ];
    const [result] = await db.query(sql, values);
    return result;
};

exports.deletePayment = async (id) => {
    const [result] = await db.query("DELETE FROM payments WHERE payment_id=?", [id]);
    return result;
};