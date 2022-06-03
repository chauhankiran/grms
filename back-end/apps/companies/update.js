import connection from "../../database/connection.js";

const update = async (req, res, next) => {
  const id = req.params.id;

  try {
    const updated = await connection("companies").where("id", id).update({
      name: req.body.name,
      website: req.body.website,
      phone: req.body.phone,
      mobile: req.body.mobile,
      fax: req.body.fax,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      updatedBy: req.auth.id,
      updatedOn: connection.fn.now(),
    });

    if (updated === 1) {
      return res.status(200).json({ data: id });
    } else {
      return res.status(422).json({
        error: "Either company is updated already or does not exists",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default update;
