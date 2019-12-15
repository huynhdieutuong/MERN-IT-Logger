const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Log = require('../models/Log');

// @desc    Get all logs
// @route   GET /api/v1/logs
// @access  Public
exports.getLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find()
    .populate({
      path: 'tech',
      select: 'fullName'
    })
    .sort('-createAt');

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs
  });
});

// @desc    Get single log
// @route   GET /api/v1/logs/:id
// @access  Public
exports.getLog = asyncHandler(async (req, res, next) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return next(
      new ErrorResponse(`Log not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Create log
// @route   POST /api/v1/logs
// @access  Public
exports.createLog = asyncHandler(async (req, res, next) => {
  const log = await Log.create(req.body);

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Update log
// @route   PUT /api/v1/logs/:id
// @access  Public
exports.updateLog = asyncHandler(async (req, res, next) => {
  let log = await Log.findById(req.params.id);

  if (!log) {
    return next(
      new ErrorResponse(`Log not found with id of ${req.params.id}`, 404)
    );
  }

  log = await Log.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Delete log
// @route   DELETE /api/v1/logs/:id
// @access  Public
exports.deleteLog = asyncHandler(async (req, res, next) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return next(
      new ErrorResponse(`Log not found with id of ${req.params.id}`, 404)
    );
  }

  await Log.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
