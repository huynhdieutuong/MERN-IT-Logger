const express = require('express');
const router = express.Router();

const {
  getLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
  searchLog
} = require('../controllers/logs');

router
  .route('/')
  .get(getLogs)
  .post(createLog);

router.get('/search', searchLog);

router
  .route('/:id')
  .get(getLog)
  .put(updateLog)
  .delete(deleteLog);

module.exports = router;
