const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.tokenVerification = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res
        .status(401)
        .json({ status: "error", error: "No token provided" });

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ status: "error", error: "Invalid token" });

      req.decodedToken = decoded;
      next();
    });
  } catch (error) {
    return res.json({ status: "error", error });
  }
};
