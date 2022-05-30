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
    // TODO: Add operation
  } catch (error) {
    next(error);
  }
};

export default login;
