const invoiceModel = require("../models/invoiceModel");

exports.getAllInvoices = async (req, res) => {
    try {
        const rows = await invoiceModel.getAllInvoices();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const row = await invoiceModel.getInvoiceById(req.params.id);
        res.json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createInvoice = async (req, res) => {
    try {
        const result = await invoiceModel.createInvoice(req.body);
        res.json({ success: true, id: result.insertId, message: "Invoice Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        await invoiceModel.updateInvoice(req.params.id, req.body);
        res.json({ success: true, message: "Invoice Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        await invoiceModel.deleteInvoice(req.params.id);
        res.json({ success: true, message: "Invoice Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};