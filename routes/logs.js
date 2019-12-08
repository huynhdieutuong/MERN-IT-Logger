const express = require('express');
const router = express.Router();

const {
  getLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog
} = require('../controllers/logs');

router
  .route('/')
  .get(getLogs)
  .post(createLog);

router
  .route('/:id')
  .get(getLog)
  .put(updateLog)
  .delete(deleteLog);

module.exports = router;
