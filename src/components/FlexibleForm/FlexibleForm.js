import React, { useEffect } from "react";
import FormGroup from "./FormGroup";
import { connect } from "react-redux";
import { setEmployeeRecords } from "../../creators/employeeRecordsCreator";
import store from "../../store/store";
import "./_MainForm.scss";

const FlexibleForm = (props) => {
  const [employeeRecords, setEmployeeRecord__] = React.useState([
    {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      phone: "",
      street: "",
      state: "",
      lga: "",
    },
  ]);

  useEffect(() => {
    console.log(store);
  });

  const addEmployee = () => {
    if (employeeRecords.length < 5) {
      setEmployeeRecord__([
        ...employeeRecords,
        {
          firstName: "",
          lastName: "",
          role: "",
          email: "",
          phone: "",
          street: "",
          state: "",
          lga: "",
        },
      ]);
    } else {
      alert("Please enter a maximum of 5 employees at a time");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setEmployeeRecords(employeeRecords);
    event.target.reset();
    setEmployeeRecord__([
      {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        phone: "",
        street: "",
        state: "",
        lga: "",
      },
    ]);

    localStorage.setItem(
      "employees",
      JSON.stringify(store.getState("employees").employees)
    );
  };

  const handleChange = (event) => {
    let currentId = event.target.id;
    let tracker = Number(
      currentId.substr(currentId.length - 1, currentId.length)
    );
    const updatedRecords = [...employeeRecords];
    updatedRecords[tracker][event.target.className] = event.target.value;
    setEmployeeRecord__(updatedRecords);
  };

  return (
    <div className="employee__form">
      <form onSubmit={handleSubmit} onChange={handleChange}>
        {employeeRecords.map((row, index) => {
          const firstNameId = `firstName-${index}`,
            lastNameId = `lastName-${index}`,
            roleId = `role-${index}`,
            emailId = `email-${index}`,
            phoneId = `phone-${index}`,
            streetId = `street-${index}`,
            stateId = `state-${index}`,
            lgaId = `lga-${index}`;
          return (
            <div className="my-2" key={index}>
              <FormGroup
                firstName={firstNameId}
                lastName={lastNameId}
                role={roleId}
                email={emailId}
                phone={phoneId}
                street={streetId}
                state={stateId}
                lga={lgaId}
                data-id={index}
              />
            </div>
          );
        })}
        <button className="add__button" type="button" onClick={addEmployee}>
          Add Employee
        </button>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

const mapStateToProps = ({ employees }) => {
  return {
    employees,
  };
};

export default connect(mapStateToProps, { setEmployeeRecords })(FlexibleForm);
