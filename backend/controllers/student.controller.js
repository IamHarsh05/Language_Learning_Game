const quizmodel = require("../models/quiz.model");
const resultmodel = require("../models/result.model");

exports.enterQuiz = async (req, res) => {
  try {
    const resultfound = await resultmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
      useremail: req.body.useremail,
    });

    if (resultfound) {
      res.json({
        status: "error",
        message: "you have alrady completed this quiz",
      });
      return;
    }

    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    if (!user) {
      res.json({ status: "error", message: "Quiz not found" });
      return;
    }

    const questions = await user.questions.map((e) => {
      return {
        question: e.question,
        option1: e.option1,
        option2: e.option2,
        option3: e.option3,
        option4: e.option4,
      };
    });

    res.json({ status: "ok", questions, time: user.time });
  } catch (error) {
    res.json({ status: "error", message: "Quiz not found" });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    const answers = await user.questions.map((e) => {
      return e.answer;
    });

    const userans = req.body.userans;
    userans.sort(sortFunction);

    function sortFunction(a, b) {
      if (a[0] === b[0]) {
        return 0;
      } else {
        return a[0] < b[0] ? -1 : 1;
      }
    }

    const useranswer = [];
    for (let i = 0; i < userans.length - 1; i++) {
      if (userans[i][0] != userans[i + 1][0]) {
        useranswer.push(userans[i]);
      }
    }
    if (userans.length > 0) useranswer.push(userans[userans.length - 1]);

    let result = 0;
    for (let i = 0; i < answers.length; i++) {
      for (let j = 0; j < useranswer.length; j++) {
        if (useranswer[j][0] == i && answers[i] == useranswer[j][1]) {
          result++;
        }
      }
    }

    await resultmodel.create({
      useremail: req.body.useremail,
      createdby: req.body.createdby,
      useranswer: useranswer,
      result: result,
      quizname: req.body.quizname,
    });

    res.json({ status: "ok", result });
  } catch (error) {
    res.json({ status: "error", message: "Quiz is not submited, Try again!" });
  }
};

exports.studentDeshboard = async (req, res) => {
  try {
    const response = await resultmodel.find({
      useremail: req.body.useremail,
    });

    if (response.length > 0) {
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "you have not completed any quiz" });
    }
  } catch (error) {
    res.json({ status: "error", message: "you have not completed any quiz" });
  }
};

exports.oneQuizInfo = async (req, res) => {
  try {
    const response = await quizmodel.findOne({
      quizname: req.body.quizname,
      createdby: req.body.createdby,
    });

    if (response) {
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "you have not completed any quiz" });
    }
  } catch (error) {
    res.json({ status: "error", message: "you have not completed any quiz" });
  }
};
