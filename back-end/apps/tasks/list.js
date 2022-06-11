import connection from "../../database/connection.js";

const list = async (req, res, next) => {
  try {
    let { page, size, sortBy, sortDir, search, companyId } = req.query;

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

    const tasks = await connection("tasks")
      .where("active", 1)
      .modify((query) => {
        if (search) {
          query.whereLike("title", `${search}%`);
        }
        if (companyId) {
          query.whereLike("companyId", `${companyId}%`);
        }
      })
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
      .offset(skip)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};

export default list;
