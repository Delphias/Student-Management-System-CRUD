const Student = require ("../model/studentModel.js")

const create = async(req, res) => {
  try{
    const newStudent = new Student(req.body);
    const { email } = newStudent;

    //check if student already exists
    const studentExist = await Student.findOne({ email });
    if (studentExist) {
        return res.status(400).json({ message: "Student already exist."});
    }

    //save new student
    const saveData = await newStudent.save();
    res.status(200).json(saveData);

  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
};

const getAllStudents = async (req, res) => {
  try {
    const studentData = await Student.find();
    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ message: "Student data not found." });
    }
    res.status(200).json({ studentData});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

const getStudentsById = async (req, res) => {
  try {
    const id = req.params.id;
    const studentExist = await Student.findById(id);
    if(!studentExist){
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json({studentExist });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const studentExist = await Student.findById(id);
    if(!studentExist){
      return res.status(404).json({ message: "Student not found." });
    }
    const updatedData = await Student.findByIdAndUpdate(id, req.body, {
      new : true
    })
    res.status(200).json({ updatedData })
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const studentExist = await Student.findById(id);
    if(!studentExist) {
      return res.status(404).json({ message: "Student not found." });
    }
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


module.exports = { create, getAllStudents, getStudentsById, update, deleteStudent};