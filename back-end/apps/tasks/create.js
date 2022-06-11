import connection from "../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const task = await connection("tasks")
      .insert({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        dealId: req.body.dealId || 0,
        ticketId: req.body.ticketId || 0,
        title: req.body.title || "",
        time: req.body.time || "",
        createdBy: req.auth.id,
        createdOn: connection.fn.now(),
        active: 1,
      })
      .returning("id");

    if (task.length > 0) {
      return res.status(200).json({ data: task[0].id });
    } else {
      return res.state(500).json({ error: "Error while creating a new task." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
