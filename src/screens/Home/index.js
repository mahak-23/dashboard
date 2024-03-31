import React, { useEffect } from "react";
import { connect } from "react-redux";

// styles
import "./style.css";

// child components
import VideosList from "../../components/VideosList";

function Home() {
  return (
    <div className="home-page-container">
      <VideosList />
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);
