const reset = async (req, res, next) => {
  // reset password requires email.
  const { email } = req.body;

  // TODO: Add more validation.
  if (!email) {
    return res.status(422).json({ error: "Email is required." });
  }

  try {
    // TODO: Add operation
  } catch (error) {
    next(error);
  }
};

export default reset;
