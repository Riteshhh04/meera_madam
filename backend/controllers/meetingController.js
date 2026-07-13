const meetingModel = require("../models/meetingModel");

// GET ALL
exports.getAllMeetings = async (req, res) => {
    try {
        const rows = await meetingModel.getAllMeetings();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET ONE
exports.getMeetingById = async (req, res) => {
    try {
        const row = await meetingModel.getMeetingById(req.params.id);
        res.json(row);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// CREATE
exports.createMeeting = async (req, res) => {
    try {
        const result = await meetingModel.createMeeting(req.body);
        res.json({ success: true, id: result.insertId, message: "Meeting Created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE
exports.updateMeeting = async (req, res) => {
    try {
        await meetingModel.updateMeeting(req.params.id, req.body);
        res.json({ success: true, message: "Meeting Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE
exports.deleteMeeting = async (req, res) => {
    try {
        await meetingModel.deleteMeeting(req.params.id);
        res.json({ success: true, message: "Meeting Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};