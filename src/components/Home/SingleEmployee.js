import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import api from "../../sideEffects/apis/api";
import { connect } from "react-redux";
import history from "../../history";
import { ReplaceEmployeeRecords } from "../../creators/employeeRecordsCreator";
import "./_SingleEmployee.scss";

const SingleEmployee = ({ employees }) => {
  const [empData, setEmpData] = useState(null);
  const employeeRoles = ["HR", "ACCOUNT MANAGER", "OPERATIONS", "ENGINEERING"];
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [updateState, setUpdateState] = useState("");
  const [updateLGA, setUpdateLGA] = useState("");
  const [lga, setLGAs] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const handleFirstNameChange = ({ target }) => {
    setFirstName(target.value);
  };

  const handleLastNameChange = ({ target }) => {
    setLastName(target.value);
  };

  const handleEmailNameChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePhoneChange = ({ target }) => {
    setPhone(target.value);
  };

  const handleStreetChange = ({ target }) => {
    setStreet(target.value);
  };

  const handleRoleChange = ({ target }) => {
    setRole(target.value);
  };

  const fetchStates = async () => {
    const state_ = await api.getAll(
      "https://locationsng-api.herokuapp.com/api/v1/lgas"
    );
    setState(state_);
  };

  const chooseState = (e) => {
    setUpdateState(e.target.value);
    const [showLGAs] = state.filter((value) => value.state == e.target.value);
    setLGAs(showLGAs.lgas);
  };

  const defaultLga = (e) => {
    setUpdateLGA(e.target.value);
    lga ? (e.target.value = lga[0]) : (e.target.value = "");
  };
  useEffect(() => {
    console.log(history);
    const email = localStorage.getItem("email");
    const currentEmployee = employees.find((emp) => {
      return emp.email === email;
    });
    setEmpData(currentEmployee);
    //console.log(currentEmployee);
  }, []);

  const UpdateCurrentUser = (e) => {
    e.preventDefault();

    const getCurrentUserIndex = employees.findIndex(
      (emp) => emp.email == empData.email
    );
    const indexOptions = getCurrentUserIndex != 0 ? getCurrentUserIndex : 0;
    const filteredEmployees = employees.filter((emp) => {
      return emp.email !== empData.email;
    });
    console.log(filteredEmployees);
    const newUserObj = {
      firstName,
      lastName,
      role,
      email,
      phone,
      street,
      state: updateState,
      lga: updateLGA,
    };
    filteredEmployees.splice(indexOptions, 0, newUserObj);
    console.log(filteredEmployees);
    localStorage.setItem("employees", JSON.stringify(filteredEmployees));
    // ReplaceEmployeeRecords(filteredEmployees);
    history.push("/");
    //window.location.reload();
  };
  return (
    <div className="container-fluid px-0">
      <Navigation />
      <div className="custom-container mt-5">
        <div className="row">
          <div className="col-md-6">
            {empData && (
              <div className="profile__details">
                <div className="single__detail">
                  <span className="data__label">First Name:</span>
                  <span className="data__value">{empData.firstName}</span>
                </div>
                <div className="single__detail">
                  <span className="data__label">Last Name:</span>
                  <span className="data__value">{empData.lastName}</span>
                </div>
                <div className="single__detail">
                  <span className="data__label">Role:</span>
                  <span className="data__value">{empData.role}</span>
                </div>

                <div className="single__detail">
                  <span className="data__label">Email: </span>
                  <span className="data__value">{empData.email}</span>
                </div>

                <div className="single__detail">
                  <span className="data__label">Street: </span>
                  <span className="data__value">{empData.street}</span>
                </div>

                <div className="single__detail">
                  <span className="data__label">Phone: </span>
                  <span className="data__value">{empData.phone}</span>
                </div>

                <div className="single__detail">
                  <span className="data__label">State: </span>
                  <span className="data__value">{empData.state}</span>
                </div>

                <div className="single__detail">
                  <span className="data__label">LGA</span>
                  <span className="data__value">{empData.lga}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <form onSubmit={UpdateCurrentUser}>
              <div className="dynamicForm__item">
                <div className="form-group py-2">
                  <label>Select Employee Role</label>
                  <select className="role" onChange={handleRoleChange}>
                    <option disabled>Select Role</option>
                    {employeeRoles.map((role, index) => (
                      <option key={index}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group firstname_ py-2">
                  <input
                    placeholder="Update First Name"
                    type="text"
                    className="firstName"
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="form-group lastname_ py-2">
                  <input
                    placeholder="Last Name"
                    type="text"
                    className="lastName"
                    onChange={handleLastNameChange}
                  />
                </div>

                <div className="form-group email_ py-1">
                  <input
                    placeholder="Email"
                    type="email"
                    className="email"
                    onChange={handleEmailNameChange}
                  />
                </div>

                <div className="form-group phone_ py-1">
                  <input
                    placeholder="Phone"
                    type="tel"
                    className="phone"
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="form-group street_ py-2">
                  <input
                    placeholder="street"
                    type="text"
                    className="street"
                    onChange={handleStreetChange}
                  />
                </div>

                {state && (
                  <div className="form-group state_ py-2">
                    <label>Choose State</label>
                    <select className="state" onChange={chooseState}>
                      <option disabled>Choose State</option>
                      {state.map((state, index) => (
                        <option key={index}>{state.state}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group lga_ py-2">
                  <label>Choose LGA</label>
                  <select className="lga" onChange={defaultLga}>
                    <option disabled>Select LGA</option>

                    {lga &&
                      lga.map((lga, index) => (
                        <option key={index}>{lga}</option>
                      ))}
                  </select>
                </div>
              </div>
              <button type="submit">Update User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ employees }) => {
  return {
    employees,
  };
};
export default connect(mapStateToProps, { ReplaceEmployeeRecords })(
  SingleEmployee
);
