// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose')

// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());

// const connectToMongoDB = () => {
//   try {
//     mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log(err);
//   }
// };

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//  console.log(`Server is running on port ${PORT}`);
// });

// connectToMongoDB(); 

// // Define the Employee schema and model
// const employeeSchema = new mongoose.Schema({
//   Studentid: String,
//   name: String,
// });

// const Employee = mongoose.model('Employee', employeeSchema);

// // 1. GET all employees
// app.get('/api/employees', async (req, res) => {
//   try {
//     const employees = await Employee.find();  // Fetch all employees from MongoDB
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 2. GET a specific employee by ID
// app.get('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);  // Find employee by MongoDB ID
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.json(employee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 3. POST a new employee (Create)
// app.post('/api/employees', async (req, res) => {
//   const newEmployee = new Employee({
//     empid: req.body.empid,
//     name: req.body.name,
//     psTeam: req.body.psTeam,
//     memberType: req.body.memberType,
//     attendance: req.body.attendance,
//     salary: req.body.salary
//   });

//   try {
//     const savedEmployee = await newEmployee.save();  // Save employee to MongoDB
//     res.status(201).json(savedEmployee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // 4. PUT (Update) an employee by ID
// app.put('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);  // Find employee by MongoDB ID
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Update employee details
//     employee.empid = req.body.empid || employee.empid;
//     employee.name = req.body.name || employee.name;
//     employee.psTeam = req.body.psTeam || employee.psTeam;
//     employee.memberType = req.body.memberType || employee.memberType;
//     employee.attendance = req.body.attendance || employee.attendance;
//     employee.salary = req.body.salary || employee.salary;

//     const updatedEmployee = await employee.save();  // Save updated employee to MongoDB
//     res.json(updatedEmployee);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 5. DELETE an employee by ID
// app.delete('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);  // Find employee by MongoDB ID
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     await employee.remove();  // Delete employee from MongoDB
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const connectToMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

connectToMongoDB(); 

// Define the Student schema and model
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  major: { type: String, required: true },
  gpa: { type: Number },
});

const Student = mongoose.model('Student', studentSchema);

// 1. GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();  // Fetch all students from MongoDB
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET a specific student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);  // Find student by MongoDB ID
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST a new student (Create)
app.post('/api/students', async (req, res) => {
  const newStudent = new Student({
    studentId: req.body.studentId,
    name: req.body.name,
    major: req.body.major,
    gpa: req.body.gpa
  });

  try {
    const savedStudent = await newStudent.save();  // Save student to MongoDB
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PUT (Update) a student by ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);  // Find student by MongoDB ID
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student details
    student.studentId = req.body.studentId || student.studentId;
    student.name = req.body.name || student.name;
    student.major = req.body.major || student.major;
    student.gpa = req.body.gpa || student.gpa;

    const updatedStudent = await student.save();  // Save updated student to MongoDB
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. DELETE a student by ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);  // Find student by MongoDB ID
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.remove();  // Delete student from MongoDB
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});