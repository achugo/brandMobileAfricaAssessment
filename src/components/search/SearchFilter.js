import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import api from "../../sideEffects/apis/api";
import {
  searchEmployeeRecords,
  filterEmployeeRecords,
} from "../../creators/employeeRecordsCreator";
import "./_SearchFilter.scss";

const SearchFilter = ({ searchEmployeeRecords, filterEmployeeRecords }) => {
  const [searchValue, setSearchValue] = useState("");
  const [lga, setLGAs] = useState("");
  const [role_, setRole_] = useState("");
  const [state, setState] = useState("");

  const employeeRoles = ["HR", "ACCOUNT MANAGER", "OPERATIONS", "ENGINEERING"];
  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const state_ = await api.getAll(
      "https://locationsng-api.herokuapp.com/api/v1/lgas"
    );
    setState(state_);
  };

  const chooseState = ({ target }) => {
    const [showLGAs] = state.filter((value) => value.state == target.value);
    setLGAs(showLGAs.lgas);
  };

  const selectRole = ({ target }) => {
    setRole_(target.value);
  };

  const defaultLga = (e) => {
    lga ? (e.target.value = lga[0]) : (e.target.value = "");
  };
  const searchForEmployee = ({ target }) => {
    setSearchValue(target.value);
    searchEmployeeRecords(target.value);
  };

  const FilterEmployees = (e) => {
    e.preventDefault();
    filterEmployeeRecords(role_, state, lga);
  };

  return (
    <div className="search__filter">
      <div className="row mx-0">
        <div className="col-4">
          <input
            type="text"
            value={searchValue}
            onChange={searchForEmployee}
            placeholder="search employee"
          />
        </div>
        <div className="col-8">
          <form onSubmit={FilterEmployees}>
            <div className="col--3">
              <select onChange={selectRole}>
                <option disabled>Select Role</option>
                {employeeRoles.map((role, index) => (
                  <option key={index}>{role}</option>
                ))}
              </select>
            </div>
            {state && (
              <div className="col--3">
                <select onChange={chooseState}>
                  <option disabled>Select state</option>
                  {state.map((state, index) => (
                    <option key={index}>{state.state}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="col--3">
              <select onChange={defaultLga}>
                <option disabled>Select Role</option>

                {lga &&
                  lga.map((lga, index) => <option key={index}>{lga}</option>)}
              </select>
            </div>
            <div className="col--3">
              <button type="submit">Filter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  searchEmployeeRecords,
  filterEmployeeRecords,
})(SearchFilter);
