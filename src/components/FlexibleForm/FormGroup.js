import React, { useState, useEffect } from "react";
import api from "../../sideEffects/apis/api";
import "./_FlexibleForm.scss";
//import useForm from "../../customHooks/useForm";

const FormGroup = (props) => {
  const employeeRoles = ["HR", "ACCOUNT MANAGER", "OPERATIONS", "ENGINEERING"];
  const [lga, setLGAs] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const state_ = await api.getAll(
      "https://locationsng-api.herokuapp.com/api/v1/lgas"
    );
    setState(state_);
  };

  const chooseState = (e) => {
    const [showLGAs] = state.filter((value) => value.state == e.target.value);
    setLGAs(showLGAs.lgas);
  };

  const defaultLga = (e) => {
    lga ? (e.target.value = lga[0]) : (e.target.value = "");
  };
  return (
    <div className="dynamicForm__item">
      <div className="form-group py-1">
        <label>Select Employee Role</label>
        <select
          className="role"
          name={props.role}
          data-id={props.key}
          id={props.role}
        >
          <option disabled>Select Role</option>
          {employeeRoles.map((role, index) => (
            <option key={index}>{role}</option>
          ))}
        </select>
      </div>

      <div className="form-group firstname_ py-1">
        <input
          placeholder="Enter First Name"
          type="text"
          name={props.firstName}
          data-id={props.key}
          id={props.firstName}
          className="firstName"
        />
      </div>
      <div className="form-group lastname_ py-1">
        <input
          type="text"
          placeholder="Enter Last Name"
          name={props.lastName}
          data-id={props.key}
          id={props.lastName}
          className="lastName"
        />
      </div>

      <div className="form-group email_ py-1">
        <input
          placeholder="Email"
          type="email"
          name={props.email}
          data-id={props.key}
          id={props.email}
          className="email"
        />
      </div>

      <div className="form-group phone_ py-1">
        <input
          placeholder="Phone Number"
          type="tel"
          name={props.email}
          data-id={props.key}
          id={props.phone}
          className="phone"
        />
      </div>

      <div className="form-group street_ py-1">
        <input
          type="text"
          placeholder="Enter street Address"
          name={props.street}
          data-id={props.key}
          id={props.street}
          className="street"
        />
      </div>

      {state && (
        <div className="form-group state_ py-1">
          <label>Choose State</label>

          <select
            className="state"
            name={props.state}
            data-id={props.key}
            id={props.state}
            onChange={chooseState}
          >
            <option disabled>Select state</option>
            {state.map((state, index) => (
              <option key={index}>{state.state}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group lga_ py-1">
        <label>Choose LGA</label>

        <select
          className="lga"
          name={props.lga}
          data-id={props.key}
          id={props.lga}
          onChange={defaultLga}
        >
          <option disabled>Select Role</option>

          {lga && lga.map((lga, key) => <option key={key}>{lga}</option>)}
        </select>
      </div>
    </div>
  );
};

export default FormGroup;
