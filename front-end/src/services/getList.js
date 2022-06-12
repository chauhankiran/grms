import constants from "../constants";

const getList = async (module, payload) => {
  const {
    size,
    page,
    sortDir,
    sortBy,
    search,
    companyId,
    contactId,
    dealId,
    quoteId,
    ticketId,
  } = payload;

  let url = `${constants.API_ENDPOINT}/${module}?size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  if (companyId) {
    url = `${url}&companyId=${companyId}`;
  }
  if (contactId) {
    url = `${url}&contactId=${contactId}`;
  }
  if (dealId) {
    url = `${url}&dealId=${dealId}`;
  }
  if (quoteId) {
    url = `${url}&quoteId=${quoteId}`;
  }
  if (ticketId) {
    url = `${url}&ticketId=${ticketId}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return await res.json();
};

export default getList;
