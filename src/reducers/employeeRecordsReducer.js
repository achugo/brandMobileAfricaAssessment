// import { act } from "react-dom/test-utils";
const employeesInStorage = localStorage.getItem("employees");
const stateValue = employeesInStorage ? JSON.parse(employeesInStorage) : [];
const employeeRecordsReducer = (state = stateValue, action) => {
  switch (action.type) {
    case "SET_RECORDS":
      const oldState = [...state];
      let newState = oldState.concat(action.data);
      return newState;
    case "OVERWRITE_RECORDS":
      //this is just a hack, states should not be overwritten
      return [...action.data];
    case "SEARCH_RECORDS":
      let searchedState = JSON.parse(employeesInStorage);
      searchedState = searchedState.filter((employee) => {
        if (searchedState.length > 1) {
          return (
            employee.firstName.includes(action.data.trim()) ||
            employee.lastName.includes(action.data.trim()) ||
            employee.email.includes(action.data.trim()) ||
            employee.phone.includes(action.data.trim())
          );
        }
      });
      return searchedState;

    case "FILTER_RECORDS":
      let filteredState = JSON.parse(employeesInStorage);
      filteredState = filteredState.filter((employee) => {
        if (filteredState.length > 1) {
          return (
            employee.role == action.role ||
            employee.state == action.state ||
            employee.city == action.city
          );
        }
      });
      return filteredState;
    case "DELETE_RECORD":
      //debugger;
      let storedState = JSON.parse(employeesInStorage);
      let updateAfterDelete = storedState.filter((employee) => {
        return employee.email !== action.data;
      });
      return updateAfterDelete;
    default:
      return state;
  }
};

export default employeeRecordsReducer;
