import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import SearchFilter from "../search/SearchFilter";
// import history from "../history";
import { withRouter } from "react-router-dom";
import {
  filterEmployeeRecords,
  deleteEmployee,
} from "../../creators/employeeRecordsCreator";
import "./_EmployeeRecords.scss";

const EmployeeRecords = ({ employees, deleteEmployee, history }) => {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    setEmployeeList(JSON.parse(localStorage.getItem("employees")));
  }, []);

  const deleteUser = (payload) => {
    deleteEmployee(payload);
    localStorage.setItem(
      "employees",
      JSON.stringify(store.getState("employees").employees)
    );
  };

  const viewEmployeeInfo = (lastName, firstName, email) => {
    history.push(`/employee/${lastName + firstName}`);
    localStorage.setItem("email", email);
  };
  return (
    <div className="employee__records">
      <SearchFilter />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>S/N</th>
              <th>FirstName</th>
              <th>lastName</th>
              <th>Email</th>
              <th>Role</th>
              <th>phone</th>
              <th colSpan="3">streetNumber/Address</th>
              <th>state</th>
              <th>lga</th>
              <th colSpan="2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {employeeList &&
              employeeList.map((employee, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <th>{employee.firstName}</th>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>{employee.phone}</td>
                    <td colSpan="3">{employee.street}</td>
                    <td>{employee.state}</td>
                    <td>{employee.lga}</td>
                    <td colSpan="2">
                      <button
                        className="view"
                        onClick={() =>
                          viewEmployeeInfo(
                            employee.lastName,
                            employee.firstName,
                            employee.email
                          )
                        }
                      >
                        View
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteUser(employee.email)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ employees }) => {
  return {
    employees,
  };
};

export default connect(mapStateToProps, {
  deleteEmployee,
  filterEmployeeRecords,
})(withRouter(EmployeeRecords));
