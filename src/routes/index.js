import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import Home from "../screens/Home";
import VideoInfo from "../screens/VideoInfo";
import Dashboard from "../screens/Dashboard";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video-info" element={<VideoInfo />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRouter;
