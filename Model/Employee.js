const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  unique_id: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, enum: ['BCA', 'MCA', 'BSC'], default: 'BCA' }, // Default and enum values

  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'deactive'], default: 'active' }

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
