const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staffController");

// ============================
// GET ALL
// ============================

router.get("/", staffController.getAllStaff);

// ============================
// GET SINGLE
// ============================

router.get("/:id", staffController.getStaffById);

// ============================
// CREATE
// ============================

router.post("/", staffController.createStaff);

// ============================
// UPDATE
// ============================

router.put("/:id", staffController.updateStaff);

// ============================
// DELETE
// ============================

router.delete("/:id", staffController.deleteStaff);

module.exports = router;