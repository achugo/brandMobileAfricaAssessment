import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../sideEffects/apis/api";
import Navigation from "../Navigation/Navigation";
import FlexibleForm from "../FlexibleForm/FlexibleForm";
import EmployeeRecords from "./EmployeeRecords";

const Home = ({ history }) => {
  return (
    <div className="container-fluid px-0">
      <Navigation />
      <div className="custom-container mt-5">
        <div className="row">
          <div className="col-md-4">
            <FlexibleForm />
          </div>
          <div className="col-md-8">
            <EmployeeRecords history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
