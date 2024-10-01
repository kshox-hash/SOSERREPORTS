const express = require('express');
const router = express.Router();
const viewController = require('../controller/view_controller');
const fetchDataController = require('../controller/fetch_controller');


router.get('/', viewController.view);
router.get('/v1/fetch-all-data', fetchDataController.fetchingData);
router.post('/v1/fetch-data-custom-filter', fetchDataController.gettingCustomFiltersData);
router.post('/getData', fetchDataController.getDataFromDb);

module.exports = router;
