import connection from "../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const deal = await connection("deals")
      .insert({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        name: req.body.name || "",
        status: req.body.status || 0,
        stage: req.body.stage || 0,
        total: req.body.total || 0,
        dueDate: req.body.dueDate || "",
        closeDate: req.body.closeDate || "",
        createdBy: req.auth.id,
        createdOn: connection.fn.now(),
        active: 1,
      })
      .returning("id");

    if (deal.length > 0) {
      return res.status(200).json({ data: deal[0].id });
    } else {
      return res.state(500).json({ error: "Error while creating a new deal." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
