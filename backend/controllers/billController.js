const billModel = require("../models/billModel");

// GET ALL
exports.getAllBills = async (req, res) => {
    try {
        const rows = await billModel.getAllBills();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET ONE
exports.getBillById = async (req, res) => {
    try {
        const row = await billModel.getBillById(req.params.id);
        res.json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// CREATE
exports.createBill = async (req, res) => {
    try {
        const result = await billModel.createBill(req.body);
        res.json({ success: true, id: result.insertId, message: "Bill Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE
exports.updateBill = async (req, res) => {
    try {
        await billModel.updateBill(req.params.id, req.body);
        res.json({ success: true, message: "Bill Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE
exports.deleteBill = async (req, res) => {
    try {
        await billModel.deleteBill(req.params.id);
        res.json({ success: true, message: "Bill Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};