export const setEmployeeRecords = (data) => {
  return { type: "SET_RECORDS", data };
};

export const ReplaceEmployeeRecords = (data) => {
  return { type: "OVEWRITE_RECORDS", data };
};

export const searchEmployeeRecords = (data) => {
  return { type: "SEARCH_RECORDS", data };
};

export const filterEmployeeRecords = (role, state, city) => {
  return { type: "FILTER_RECORDS", role, city, state };
};

export const deleteEmployee = (data) => {
  return { type: "DELETE_RECORD", data };
};
