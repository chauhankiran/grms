import constants from "../constants";

const getDetails = async (module, id) => {
  const res = await fetch(`${constants.API_ENDPOINT}/${module}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export default getDetails;
