const express = require("express");

const router = express.Router();

const artworkController = require("../controllers/artworkController");

// GET ALL
router.get("/", artworkController.getArtworks);

// GET BY ID
router.get("/:id", artworkController.getArtwork);

// CREATE
router.post("/", artworkController.createArtwork);

// UPDATE
router.put("/:id", artworkController.updateArtwork);

// DELETE
router.delete("/:id", artworkController.deleteArtwork);

module.exports = router;