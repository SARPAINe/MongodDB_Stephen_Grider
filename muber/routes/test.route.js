const express = require("express");
const router = express.Router();
const DriversController = require("../controllers/drivers_controller");

router.get("/", DriversController.index);

module.exports = router;
