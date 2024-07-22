const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../Controller/Employee');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Add a new employee
router.post('/employees', upload.single('picture'), employeeController.addEmployee);

// Edit an employee
router.put('/employees/:id', upload.single('picture'), employeeController.updateEmployee);

// Delete an employee
router.delete('/employees/:id', employeeController.deleteEmployee);
router.put('/employees/activate/:id', employeeController.activateEmployee);
router.put('/employees/deactivate/:id', employeeController.deactivateEmployee);
module.exports = router;
