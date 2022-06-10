import connection from "../../database/connection.js";

const update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updated = await connection("deals")
      .where("id", id)
      .update({
        companyId: req.body.companyId || 0,
        contactId: req.body.contactId || 0,
        name: req.body.name || "",
        status: req.body.status || 0,
        stage: req.body.stage || 0,
        total: req.body.total || 0,
        dueDate: req.body.dueDate || "",
        closeDate: req.body.closeDate || "",
        updatedBy: req.auth.id,
        updatedOn: connection.fn.now(),
      });

    if (updated === 1) {
      return res.status(200).json({ data: id });
    } else {
      return res.status(422).json({
        error: "Either deal is updated already or does not exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default update;
