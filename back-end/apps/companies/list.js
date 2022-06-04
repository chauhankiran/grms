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

    const companies = await connection("companies")
      .where("active", 1)
      .modify((query) => {
        if (search) {
          if (search.name) {
            query.whereLike("name", `${search.name}%`);
          }
        }
      })
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
        "updatedBy",
        "updatedOn",
        "active"
      )
      .offset(skip)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: companies });
  } catch (error) {
    next(error);
  }
};

export default list;
