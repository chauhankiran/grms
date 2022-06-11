import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await connection("tasks")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "companyId",
        "contactId",
        "dealId",
        "ticketId",
        "title",
        "time",
        "createdBy",
        "createdOn",
        "updatedBy",
        "updatedOn"
      )
      .first();

    return res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
};

export default details;
