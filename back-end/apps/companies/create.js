import connection from "../../database/connection.js";

const create = async (req, res, next) => {
  try {
    // TODO: Add validations for the fields.
    const company = await connection("companies")
      .insert({
        name: req.body.name || "",
        website: req.body.website || "",
        phone: req.body.phone || "",
        mobile: req.body.mobile || "",
        fax: req.body.fax || "",
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

    if (company.length > 0) {
      return res.status(200).json({ data: company[0].id });
    } else {
      return res
        .state(500)
        .json({ error: "Error while creating a new company." });
    }
  } catch (error) {
    next(error);
  }
};

export default create;
