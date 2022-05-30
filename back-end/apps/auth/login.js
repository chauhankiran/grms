import jsonwebtoken from "jsonwebtoken";
import connection from "../../database/connection.js";

const login = async (req, res, next) => {
  // login required at least email and password.
  const { email, password } = req.body;

  // TODO: Add more validation.
  if (!email || !password) {
    return res.status(422).json({ error: "All fields are required." });
  }
  if (password.length < 6) {
    return res
      .status(422)
      .json({ error: "Password must be at least 6 characters long." });
  }

  try {
    // TODO: Divide the user check process into two part.
    // 1. Check for the email.
    // 2. Check and match the password with hash.
    const user = await connection("users")
      .where("email", email)
      .where("password", password)
      .select("id")
      .first();

    if (user) {
      // TODO: Remove the secret from here and either put in .env file or in config.js file.
      const token = jsonwebtoken.sign(
        { id: user.id },
        "uncdGsAZn3pLb7NsmcVMhYlL5mcRQY8W",
        { expiresIn: "1d" }
      );
      return res.status(200).json({ data: token });
    } else {
      return res
        .status(404)
        .json({ error: "Incorrect email and/or password." });
    }
  } catch (error) {
    next(error);
  }
};

export default login;
