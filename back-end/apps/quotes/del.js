import connection from "../../database/connection.js";

const del = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deleted = await connection("quotes").where("id", id).del();

    if (deleted === 1) {
      return res.status(200).json({ data: id });
    } else {
      return res.status(422).json({
        error: "Either quote is deleted already or does not exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default del;
