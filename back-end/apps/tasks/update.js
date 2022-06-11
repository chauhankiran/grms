import connection from "../../database/connection.js";

const update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updated = await connection("tasks")
      .where("id", id)
      .update({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        dealId: req.body.dealId || 0,
        ticketId: req.body.ticketId || 0,
        title: req.body.title || "",
        time: req.body.time || "",
        updatedBy: req.auth.id,
        updatedOn: connection.fn.now(),
      });

    if (updated === 1) {
      return res.status(200).json({ data: id });
    } else {
      return res.status(422).json({
        error: "Either task is updated already or does not exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default update;
