const paymentModel = require("../models/paymentModel");

exports.getAllPayments = async (req, res) => {
    try {
        const rows = await paymentModel.getAllPayments();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const row = await paymentModel.getPaymentById(req.params.id);
        res.json(row);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createPayment = async (req, res) => {
    try {
        const result = await paymentModel.createPayment(req.body);
        res.json({ success: true, id: result.insertId, message: "Payment Created" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        await paymentModel.updatePayment(req.params.id, req.body);
        res.json({ success: true, message: "Payment Updated" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        await paymentModel.deletePayment(req.params.id);
        res.json({ success: true, message: "Payment Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};