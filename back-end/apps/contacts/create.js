import connection from "../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const contact = await connection("contacts")
      .insert({
        companyId: req.body.companyId || 0,
        pointOfContact: req.body.pointOfContact || 0,
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        prefix: req.body.prefix || "",
        title: req.body.title || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        mobile: req.body.mobile || "",
        address1: req.body.address1 || "",
        address2: req.body.address2 || "",
        address3: req.body.address3 || "",
        city: req.body.city || "",
        state: req.body.state || 0,
        zip: req.body.zip || "",
        country: req.body.country || 0,
        createdBy: req.auth.id,
        createdOn: connection.fn.now(),
        active: 1,
      })
      .returning("id");

    if (contact.length > 0) {
      return res.status(200).json({ data: contact[0].id });
    } else {
      return res
        .state(500)
        .json({ error: "Error while creating a new contact." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
