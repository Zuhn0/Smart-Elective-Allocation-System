const express = require("express");

const router = express.Router();

const { runAllocation ,getAllocations,exportAllocationCSV} = require("../controllers/allocationController");

router.get("/", getAllocations);

router.post("/", runAllocation);

router.get("/export", exportAllocationCSV);

module.exports = router;