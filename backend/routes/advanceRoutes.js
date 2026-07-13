const express = require("express");

const router = express.Router();

const advanceController = require("../controllers/advanceController");

// GET ALL

router.get(

    "/",

    advanceController.getAllAdvances

);

// GET BY ID

router.get(

    "/:id",

    advanceController.getAdvanceById

);

// CREATE

router.post(

    "/",

    advanceController.createAdvance

);

// UPDATE

router.put(

    "/:id",

    advanceController.updateAdvance

);

// DELETE

router.delete(

    "/:id",

    advanceController.deleteAdvance

);

module.exports = router;