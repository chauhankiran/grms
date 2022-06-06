import connection from "../../database/connection.js";

const list = async (req, res, next) => {
  try {
    let { page, size, sortBy, sortDir, search } = req.query;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    if (!sortBy) {
      sortBy = "id";
    }
    if (!sortDir) {
      sortDir = "desc";
    }

    let skip = 0;
    if (page > 0) {
      skip = (page - 1) * size;
    }

    const contact = await connection("contacts")
      .where("active", 1)
      .modify((query) => {
        if (search) {
          query.whereLike("firstName", `${search}%`);
          query.orWhereLike("lastName", `${search}%`);
        }
      })
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
      .offset(skip)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: contact });
  } catch (error) {
    next(error);
  }
};

export default list;
