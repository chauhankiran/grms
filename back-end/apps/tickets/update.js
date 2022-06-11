import connection from "../../database/connection.js";

const update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updated = await connection("tickets")
      .where("id", id)
      .update({
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
        updatedBy: req.auth.id,
        updatedOn: connection.fn.now(),
      });

    if (updated === 1) {
      return res.status(200).json({ data: id });
    } else {
      return res.status(422).json({
        error: "Either ticket is updated already or does not exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default update;
