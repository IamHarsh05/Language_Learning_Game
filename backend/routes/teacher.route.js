const express = require("express");
const {
  teacherDeshboard,
  oneQuizInfo,
  makeQuiz,
  updateQuiz,
} = require("../controllers/teacher.controller");
const { tokenVerification } = require("../middlewares/token.verification");

const teacherRouter = express.Router();

teacherRouter.use(tokenVerification);

teacherRouter.post("/makequiz", makeQuiz);
teacherRouter.post("/deshboard", teacherDeshboard);
teacherRouter.post("/onequiz", oneQuizInfo);
teacherRouter.post("/updatequiz", updateQuiz);

module.exports = teacherRouter;
