const express = require("express");
const { create, getAllStudents, getStudentsById, update, deleteStudent } = require("../controller/studentController.js");

const route = express.Router();

route.post("/student", create);
route.get("/students", getAllStudents);
route.get("/student/:id", getStudentsById);
route.put("/student/:id", update);
route.delete("/student/:id", deleteStudent);

module.exports = route;


