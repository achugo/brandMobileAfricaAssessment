import axios from "axios";

const getAll = (url) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });

export default {
  getAll,
};
