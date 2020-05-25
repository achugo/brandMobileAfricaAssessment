export const setUser = (data) => {
  return { type: "SET_USER", data };
};

export const deleteUser = () => {
  return { type: "DELETE_USER" };
};
