const db = require("../config/database");

// ==============================
// GET ALL INVOICES
// ==============================
exports.getAllInvoices = async () => {
    const [rows] = await db.query(`
        SELECT 
            i.invoice_id AS id,
            i.invoice_no AS invoiceNo,
            i.client_id,
            c.name AS client,
            i.description,
            i.subtotal,
            i.tax_rate AS taxRate,
            i.tax_amount AS taxAmount,
            i.total,
            DATE_FORMAT(i.issue_date, '%Y-%m-%d') AS issueDate,
            DATE_FORMAT(i.due_date, '%Y-%m-%d') AS dueDate,
            i.status,
            i.notes
        FROM invoices i
        LEFT JOIN clients c ON i.client_id = c.client_id
        ORDER BY i.issue_date DESC, i.invoice_id DESC
    `);
    return rows;
};

// ==============================
// GET INVOICE BY ID
// ==============================
exports.getInvoiceById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            i.invoice_id AS id,
            i.invoice_no AS invoiceNo,
            i.client_id,
            c.name AS client,
            i.description,
            i.subtotal,
            i.tax_rate AS taxRate,
            i.tax_amount AS taxAmount,
            i.total,
            DATE_FORMAT(i.issue_date, '%Y-%m-%d') AS issueDate,
            DATE_FORMAT(i.due_date, '%Y-%m-%d') AS dueDate,
            i.status,
            i.notes
        FROM invoices i
        LEFT JOIN clients c ON i.client_id = c.client_id
        WHERE i.invoice_id = ?
    `, [id]);
    return rows[0];
};

// ==============================
// CREATE INVOICE
// ==============================
exports.createInvoice = async (data) => {
    const sql = `
        INSERT INTO invoices (invoice_no, client_id, description, subtotal, tax_rate, tax_amount, total, issue_date, due_date, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.invoiceNo,
        data.client_id,
        data.description,
        data.subtotal,
        data.taxRate || 18,
        data.taxAmount || 0,
        data.total,
        data.issueDate || null,
        data.dueDate || null,
        data.status || 'Draft',
        data.notes
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// UPDATE INVOICE
// ==============================
exports.updateInvoice = async (id, data) => {
    const sql = `
        UPDATE invoices 
        SET invoice_no=?, client_id=?, description=?, subtotal=?, tax_rate=?, tax_amount=?, total=?, issue_date=?, due_date=?, status=?, notes=?
        WHERE invoice_id=?
    `;
    const values = [
        data.invoiceNo,
        data.client_id,
        data.description,
        data.subtotal,
        data.taxRate,
        data.taxAmount,
        data.total,
        data.issueDate || null,
        data.dueDate || null,
        data.status,
        data.notes,
        id
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// DELETE INVOICE
// ==============================
exports.deleteInvoice = async (id) => {
    const [result] = await db.query("DELETE FROM invoices WHERE invoice_id=?", [id]);
    return result;
};