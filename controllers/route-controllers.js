const express = require('express');
const { getAllRoutes, getAllRotuesNames } = require('../bll/routes-logic.js');

const router = express.Router();

router.get('/', getAllRoutes);

router.get('/allNames', getAllRotuesNames);

module.exports = router;
