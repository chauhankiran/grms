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

  try {
    // TODO: Add operation
  } catch (error) {
    next(error);
  }
};

export default register;
