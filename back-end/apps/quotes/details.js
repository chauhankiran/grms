import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const quote = await connection("quotes")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "companyId",
        "contactId",
        "dealId",
        "name",
        "total",
        "expireOn",
        "createdBy",
        "createdOn",
        "updatedBy",
        "updatedOn"
      )
      .first();

    return res.status(200).json({ data: quote });
  } catch (error) {
    next(error);
  }
};

export default details;
