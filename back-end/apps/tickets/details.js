import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const ticket = await connection("tickets")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "companyId",
        "contactId",
        "title",
        "priority",
        "assignee",
        "status",
        "type",
        "dueOn",
        "createdBy",
        "createdOn",
        "updatedBy",
        "updatedOn"
      )
      .first();

    return res.status(200).json({ data: ticket });
  } catch (error) {
    next(error);
  }
};

export default details;
