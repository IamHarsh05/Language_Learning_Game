const express = require("express");
const {
  enterQuiz,
  submitQuiz,
  studentDeshboard,
  oneQuizInfo,
} = require("../controllers/student.controller");
const { tokenVerification } = require("../middlewares/token.verification");

const studentRouter = express.Router();

studentRouter.use(tokenVerification);

studentRouter.post("/enterquiz", enterQuiz);
studentRouter.post("/submitquiz", submitQuiz);
studentRouter.post("/deshboard", studentDeshboard);
studentRouter.post("/onequiz", oneQuizInfo);

module.exports = studentRouter;
