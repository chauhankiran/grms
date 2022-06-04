import connection from "../../database/connection.js";

const details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await connection("companies")
      .where("active", 1)
      .where("id", id)
      .select(
        "id",
        "name",
        "website",
        "phone",
        "mobile",
        "fax",
        "address1",
        "address2",
        "address3",
        "city",
        "state",
        "zip",
        "country",
        "createdBy",
        "createdOn",
        "active"
      )
      .first();

    return res.status(200).json({ data: company });
  } catch (error) {
    next(error);
  }
};

export default details;
