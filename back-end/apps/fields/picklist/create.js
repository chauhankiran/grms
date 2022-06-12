import connection from "../../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const quote = await connection("quotes")
      .insert({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        dealId: req.body.dealId || 0,
        name: req.body.name || "",
        total: req.body.total || 0,
        expireOn: req.body.expireOn || "",
        createdBy: req.auth.id,
        createdOn: connection.fn.now(),
        active: 1,
      })
      .returning("id");

    if (quote.length > 0) {
      return res.status(200).json({ data: quote[0].id });
    } else {
      return res
        .state(500)
        .json({ error: "Error while creating a new quote." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
