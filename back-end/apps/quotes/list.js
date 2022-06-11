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

    const quotes = await connection("quotes")
      .where("active", 1)
      .modify((query) => {
        if (search) {
          query.whereLike("name", `${search}%`);
        }
      })
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
      .offset(skip)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: quotes });
  } catch (error) {
    next(error);
  }
};

export default list;
