import constants from "../constants";

const getList = async (module, payload) => {
  const { size, page, sortDir, sortBy, search } = payload;

  const res = await fetch(
    `${constants.API_ENDPOINT}/${module}?search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return await res.json();
};

export default getList;
