const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Tech = require('../models/Tech');

// @desc    Get all techs
// @route   GET /api/v1/techs
// @access  Public
exports.getTechs = asyncHandler(async (req, res, next) => {
  const techs = await Tech.find().populate('logs');

  res.status(200).json({
    success: true,
    count: techs.length,
    data: techs
  });
});

// @desc    Get single tech
// @route   GET /api/v1/techs/:id
// @access  Public
exports.getTech = asyncHandler(async (req, res, next) => {
  const tech = await Tech.findById(req.params.id).populate('logs');

  if (!tech) {
    return next(
      new ErrorResponse(`Tech not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Create tech
// @route   POST /api/v1/techs
// @access  Public
exports.createTech = asyncHandler(async (req, res, next) => {
  const tech = await Tech.create(req.body);

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Update tech
// @route   PUT /api/v1/techs/:id
// @access  Public
exports.updateTech = asyncHandler(async (req, res, next) => {
  let tech = await Tech.findById(req.params.id);

  if (!tech) {
    return next(
      new ErrorResponse(`Tech not found with id of ${req.params.id}`, 404)
    );
  }

  const { firstName, lastName, createAt } = req.body;
  if (firstName) tech.firstName = firstName;
  if (lastName) tech.lastName = lastName;
  if (createAt) tech.createAt = createAt;

  await tech.save();

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Delete tech
// @route   DELETE /api/v1/techs/:id
// @access  Public
exports.deleteTech = asyncHandler(async (req, res, next) => {
  const tech = await Tech.findById(req.params.id);

  if (!tech) {
    return next(
      new ErrorResponse(`Tech not found with id of ${req.params.id}`, 404)
    );
  }

  await Tech.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
