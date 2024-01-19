const quizmodel = require("../models/quiz.model");
const resultmodel = require("../models/result.model");

exports.teacherDeshboard = async (req, res) => {
  try {
    const user = await quizmodel.find({
      createdby: req.body.createdby,
    });

    if (user.length > 0) {
      let response = [];
      for (let i = 0; i < user.length; i++) {
        const count = await resultmodel.find({
          createdby: req.body.createdby,
          quizname: user[i].quizname,
        });

        response.push({
          studentcount: count.length,
          quizname: user[i].quizname,
          questions: user[i].questions,
        });
      }
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "Their is no quiz conducted by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Their is no quiz conducted by you" });
  }
};

exports.oneQuizInfo = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    if (user) {
      let students = [];
      const count = await resultmodel.find({
        createdby: req.body.createdby,
        quizname: req.body.quizname,
      });

      for (let j = 0; j < count.length; j++) {
        students.push({
          useremail: count[j].useremail,
          result: count[j].result,
        });
      }
      const response = {
        studentcount: count.length,
        quizname: user.quizname,
        questions: user.questions,
        students,
      };

      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "Their is no quiz conducted by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Their is no quiz conducted by you" });
  }
};

exports.makeQuiz = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.name,
      quizname: req.body.quizname,
    });

    if (user) {
      res.json({
        status: "error",
        message: "quiz is exist with this quiz name",
      });
      return;
    }

    await quizmodel.create({
      createdby: req.body.name,
      questions: req.body.questions,
      quizname: req.body.quizname,
      time: req.body.time,
    });

    res.json({ status: "ok", message: "success" });
  } catch (error) {
    res.json({ status: "error", message: "Quiz is not created, Try again!" });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const result = await quizmodel.updateOne(
      {
        quizname: req.body.quizname,
        createdby: req.body.createdby,
      },
      {
        $set: {
          questions: req.body.questions,
        },
      }
    );

    if (result.modifiedCount) {
      const user = await quizmodel.findOne({
        createdby: req.body.createdby,
        quizname: req.body.quizname,
      });

      const answers = await user.questions.map((e) => {
        return e.answer;
      });

      const useremails = await req.body.students.map((e) => {
        return e.useremail;
      });

      for (let i = 0; i < useremails.length; i++) {
        const student = await resultmodel.findOne({
          quizname: req.body.quizname,
          createdby: req.body.createdby,
          useremail: useremails[i],
        });

        let result = 0;
        for (let j = 0; j < answers.length; j++) {
          for (let x = 0; x < student.useranswer.length; x++) {
            if (
              student.useranswer[x][0] === j &&
              student.useranswer[x][1] === answers[j]
            ) {
              result++;
            }
          }
        }

        await resultmodel.updateOne(
          {
            quizname: req.body.quizname,
            createdby: req.body.createdby,
            useremail: useremails[i],
          },
          {
            $set: {
              result: result,
            },
          }
        );
      }
      res.json({ status: "ok", message: "updated successfilly" });
    } else {
      res.json({ status: "ok", message: "no changes is made by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
