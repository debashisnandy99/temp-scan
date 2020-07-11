const express = require('express');

const imgOcrController = require('../controllers/imgocr');

const router = express.Router();

router.post('/startOcr',imgOcrController.startOcr);

module.exports = router;