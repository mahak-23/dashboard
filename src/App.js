import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//style
import "./App.css";

//components
import SideNavBar from "./screens/SideNavBar";
import Dashboard from "./screens/Dashboard";
import Trades from "./screens/Trades";
import History from "./screens/History";
import Organization from "./screens/Organization";

function App() {
  const [navVisible, showNavbar] = useState(true);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <SideNavBar visible={navVisible} show={showNavbar} />
          <Routes>
            <Route
              path="/"
              element={
                <div className={!navVisible ? "page" : "page page-with-navbar"}>
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/organization"
              element={
                <div className={!navVisible ? "page" : "page page-with-navbar"}>
                  <Organization />
                </div>
              }
            />
            <Route
              path="/trades"
              element={
                <div className={!navVisible ? "page" : "page page-with-navbar"}>
                  <Trades />
                </div>
              }
            />
            <Route
              path="/history"
              element={
                <div className={!navVisible ? "page" : "page page-with-navbar"}>
                  <History />
                </div>
              }
            />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
