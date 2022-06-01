import connection from "../../database/connection.js";

const reset = async (req, res, next) => {
  // reset password requires email.
  const { email } = req.body;

  // TODO: Add more validation.
  if (!email) {
    return res.status(422).json({ error: "Email is required." });
  }

  try {
    const user = await connection("users")
      .where("email", email)
      .select("id")
      .first();

    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res
        .status(404)
        .json({ error: "User with entered email doesn't found." });
    }
  } catch (error) {
    next(error);
  }
};

export default reset;
