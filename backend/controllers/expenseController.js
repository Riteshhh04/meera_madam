const expenseModel = require("../models/expenseModel");

// GET ALL
exports.getAllExpenses = async (req, res) => {
    try {
        const rows = await expenseModel.getAllExpenses();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET ONE
exports.getExpenseById = async (req, res) => {
    try {
        const row = await expenseModel.getExpenseById(req.params.id);
        res.json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// CREATE
exports.createExpense = async (req, res) => {
    try {
        const result = await expenseModel.createExpense(req.body);
        res.json({ success: true, id: result.insertId, message: "Expense Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE
exports.updateExpense = async (req, res) => {
    try {
        await expenseModel.updateExpense(req.params.id, req.body);
        res.json({ success: true, message: "Expense Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE
exports.deleteExpense = async (req, res) => {
    try {
        await expenseModel.deleteExpense(req.params.id);
        res.json({ success: true, message: "Expense Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};