import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import connection from "../../database/connection.js";

const login = async (req, res, next) => {
  // login requires at least email and password fields at this moment.
  const { email, password } = req.body;

  // TODO: Add more validations here.
  if (!email || !password) {
    return res.status(422).json({ error: "All fields are required." });
  }

  try {
    const user = await connection("users")
      .where("email", email)
      .select("*")
      .first();

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "10d" }
        );
        return res.status(200).json({ data: token });
      } else {
        return res
          .status(422)
          .json({ error: "Incorrect email and/or password." });
      }
    } else {
      return res.status(422).json({
        error: "Account does not exist with this email.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default login;
