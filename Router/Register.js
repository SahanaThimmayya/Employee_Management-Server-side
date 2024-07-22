const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { register, login } = require('../Controller/Register'); // Ensure this path is correct

// Registration route
router.post(
  '/register',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('username', 'Please include a valid username').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register // Call the register function from the controller
);

// Login route
router.post(
  '/login',
  [
    check('username', 'Please include a valid username').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login // Call the login function from the controller
);

module.exports = router;
