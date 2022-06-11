import connection from "../../database/connection.js";

const list = async (req, res, next) => {
  try {
    let {
      page,
      size,
      sortBy,
      sortDir,
      search,
      companyId,
      contactId,
      dealId,
      quoteId,
    } = req.query;

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

    const tickets = await connection("tickets")
      .where("active", 1)
      .modify((query) => {
        if (search) {
          query.whereLike("title", `${search}%`);
        }
        if (companyId) {
          query.whereLike("companyId", `${companyId}%`);
        }
        if (contactId) {
          query.whereLike("contactId", `${contactId}%`);
        }
        if (dealId) {
          query.whereLike("dealId", `${dealId}%`);
        }
        if (quoteId) {
          query.whereLike("quoteId", `${quoteId}%`);
        }
      })
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
      .offset(skip)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: tickets });
  } catch (error) {
    next(error);
  }
};

export default list;
