import bcrypt from "bcrypt";
import connection from "../../database/connection.js";

const register = async (req, res, next) => {
  // register requires at least first name, last name, email, and password.
  // For the purpose of validation on back-end side, we will also fetch the confirmPassword.
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // TODO: Add more validation.
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "All fields are required." });
  }
  if (password.length < 6) {
    return res
      .status(422)
      .json({ error: "Password must be at least 6 characters long." });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ error: "Entered password doesn't match" });
  }

  // Generate password hash.
  const passwordHash = bcrypt.hashSync(password, 14);

  try {
    // TODO: Add validation to check if given email id exists or not.
    // TODO: Password should be saved in encryted hash.
    const id = await connection("users").insert({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // When the new account is created, we're not going to directly support
    // the login. We'll send a confirmation email and the login should be done.
    return res.status(200).json({ data: id[0] });
  } catch (error) {
    next(error);
  }
};

export default register;
