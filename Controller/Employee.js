const Employee = require('../Model/Employee');
const path = require('path');
const fs = require('fs');

// Generate unique employee ID in the format EMPID001
const generateUniqueEmployeeId = async () => {
  const lastEmployee = await Employee.findOne().sort({ createdAt: -1 }).exec();
  let newIdNumber = 1;

  if (lastEmployee && lastEmployee.unique_id) {
    const lastIdMatch = lastEmployee.unique_id.match(/EMPID(\d+)/);
    if (lastIdMatch) {
      const lastIdNumber = parseInt(lastIdMatch[1], 10);
      newIdNumber = lastIdNumber + 1;
    }
  }

  const newId = `EMPID${newIdNumber.toString().padStart(3, '0')}`;
  return newId;
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const picture = req.file ? req.file.filename : null;

    const unique_id = await generateUniqueEmployeeId();

    const newEmployee = new Employee({
      unique_id,
      name,
      email,
      mobile,
      designation,
      gender,
      course: course || 'BCA', // Default to BCA if course is not provided
      picture
    });

    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Edit an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.picture = req.file.filename;
    }

    const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (employee && employee.picture) {
      fs.unlinkSync(path.join(__dirname, '../uploads', employee.picture));
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};
exports.activateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, { status: 'active' }, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error activating employee', error });
  }
};

// Deactivate an employee
exports.deactivateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, { status: 'deactive' }, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating employee', error });
  }
};