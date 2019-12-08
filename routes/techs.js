const express = require('express');
const router = express.Router();

const {
  getTechs,
  getTech,
  createTech,
  updateTech,
  deleteTech
} = require('../controllers/techs');

router
  .route('/')
  .get(getTechs)
  .post(createTech);

router
  .route('/:id')
  .get(getTech)
  .put(updateTech)
  .delete(deleteTech);

module.exports = router;
