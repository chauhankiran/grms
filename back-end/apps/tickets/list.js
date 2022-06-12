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

    // Sub query.
    const subQuery = connection("tickets")
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
      });

    const t = await subQuery.clone().count("id as count");
    const total = t[0].count;
    const tickets = await subQuery
      .clone()
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
      .limit(size)
      .orderBy(sortBy, sortDir);

    return res.status(200).json({ data: tickets, count: total || 0 });
  } catch (error) {
    next(error);
  }
};

export default list;
