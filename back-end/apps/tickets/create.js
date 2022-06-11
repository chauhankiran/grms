import connection from "../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const ticket = await connection("tickets")
      .insert({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        dealId: req.body.dealId || 0,
        quoteId: req.body.quoteId || 0,
        title: req.body.title || "",
        priority: req.body.priority || 0,
        assignee: req.body.assignee || 0,
        status: req.body.status || 0,
        type: req.body.type || 0,
        dueOn: req.body.dueOn || "",
        createdBy: req.auth.id,
        createdOn: connection.fn.now(),
        active: 1,
      })
      .returning("id");

    if (ticket.length > 0) {
      return res.status(200).json({ data: ticket[0].id });
    } else {
      return res
        .state(500)
        .json({ error: "Error while creating a new ticket." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
