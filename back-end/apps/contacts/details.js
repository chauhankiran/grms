import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const contact = await connection("contacts")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "companyId",
        "pointOfContact",
        "firstName",
        "lastName",
        "prefix",
        "title",
        "email",
        "phone",
        "mobile",
        "address1",
        "address2",
        "address3",
        "city",
        "state",
        "zip",
        "country",
        "createdBy",
        "createdOn",
        "updatedBy",
        "updatedOn",
        "active",
        "archivedOn",
        "archivedBy"
      )
      .first();

    return res.status(200).json({ data: contact });
  } catch (error) {
    next(error);
  }
};

export default details;
