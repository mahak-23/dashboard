import React from "react";

//style
import "./style.css";

//child components
import GraphPopulation from "../../components/GraphPopulation";
import Cryptocurrency from "../../components/Cryptocurrency";
import MetaMask from "../../components/MetaMask";

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-head">
          <div className="title">
            <h2>
              Hello, <span>User </span>👋
            </h2>
            <h3>
              Welcome to <span>Dashboard </span>
            </h3>
          </div>
          <div className="mask">
            <MetaMask />
          </div>
        </div>
        <div className="graphs-container">
          <div className="theme-container graphs">
            <div className="card-header">
              <h2>Population Data</h2>
            </div>
            <GraphPopulation />
          </div>
        </div>

        <div className="theme-container graphs">
          <div className="card-header">
            <h2>
              Cryptocurrency Prices{" "}
              <span style={{ color: "green", fontSize: "14px" }}>
                (Bitcoin)
              </span>
            </h2>
          </div>
          <Cryptocurrency />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
