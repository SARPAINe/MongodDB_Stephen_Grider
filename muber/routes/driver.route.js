const express = require("express");
const router = express.Router();
const DriversController = require("../controllers/drivers_controller");

router.post("/", DriversController.create);
router.put("/:id", DriversController.edit);

module.exports = router;
