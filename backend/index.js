const express = require("express");
const cors = require("cors");
const dbConnection = require("./configs/db.config");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routes/auth.route");
const teacherRouter = require("./routes/teacher.route");
const studentRouter = require("./routes/student.route");
const { tokenVerification } = require("./middlewares/token.verification");

const app = express();
dbConnection();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/verify", tokenVerification);
app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

app.listen("5000", () => {
  console.log("server starting");
});
