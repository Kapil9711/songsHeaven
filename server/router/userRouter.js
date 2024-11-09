import express from "express";

const router = express.Router();

// create user
router.route("/").post().get();
router.route("/:id").get().patch().delete();
