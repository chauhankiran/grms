import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deal = await connection("deals")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "companyId",
        "contactId",
        "name",
        "status",
        "stage",
        "total",
        "dueDate",
        "closeDate",
        "createdBy",
        "createdOn",
        "updatedBy",
        "updatedOn"
      )
      .first();

    return res.status(200).json({ data: deal });
  } catch (error) {
    next(error);
  }
};

export default details;
