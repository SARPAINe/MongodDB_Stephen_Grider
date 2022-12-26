const express = require("express");
const router = express.Router();
const DriversController = require("../controllers/drivers_controller");

router.post("/", DriversController.create);
router.put("/:id", DriversController.edit);
router.delete("/:id", DriversController.deleteDriver);
router.get("/", DriversController.index);

module.exports = router;
