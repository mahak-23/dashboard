import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//style
import "./style.css";
import unileverLOGO from "../../assets/unilever-logo.png";

//data keys map json
import dataMap from "../../utils/mappingData/videoDataKeysMap.json";

const dataTitle = [
  "External Environment Parameters",
  "Pre Brushing Activities",
  "During Brushing Activities",
  "Post Brushing Activities",
];

function VideoPlayer({
  // videoPlayerData,
  // selectedVideoData,
  view_type,
  video_player_data,
}) {
  const { front_data, side_data, video_data, is_toggle } = video_player_data;
  const [viewType, setViewType] = useState(view_type);
  const navigate = useNavigate();

  const [videoPlayerData, setVideoPlayerData] = useState(() => {
    if (viewType === "Front") return front_data;
    if (viewType === "Side") return side_data;
    return video_data;
  });

  useEffect(() => {
    if (viewType === "Front") setVideoPlayerData(front_data);
    else if (viewType === "Side") setVideoPlayerData(side_data);
    else setVideoPlayerData(video_data);
  }, [viewType, front_data, side_data, video_data]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleViewTypeToggle = () => {
    setViewType(viewType === "Front" ? "Side" : "Front");
  };

  console.log(is_toggle);
  return (
    <div>
      <div className="video-header">
        <i
          className="fa fa-arrow-circle-left"
          style={{ fontSize: "24px", cursor: "pointer", color: "#ff6e34" }}
          onClick={handleBackClick}
        ></i>
        {videoPlayerData && (
          <span className="heading" style={{ fontWeight: "600" }}>
            {videoPlayerData.video_name}
          </span>
        )}
        {is_toggle === 1 && (
          <div className="toggle">
            <div className="toggle-btn">
              <button
                title="Toggle to front data "
                onClick={handleViewTypeToggle}
                className="front-toggle-btn"
                disabled={viewType === "Front"}
              >
                Front
              </button>
              <button
                title="Toggle to side data"
                onClick={handleViewTypeToggle}
                className="side-toggle-btn"
                disabled={viewType === "Side"}
              >
                Side
              </button>
            </div>
          </div>
        )}
      </div>
      {videoPlayerData && Object.keys(videoPlayerData).length === 0 ? (
        <div
          className="no_data loader-align"
          style={{ height: "calc(100vh - 168px)" }}
        >
          {" "}
          {viewType} data is not available{" "}
        </div>
      ) : (
        videoPlayerData && (
          <div className="video-player-container">
            {videoPlayerData.video_url && (
              <div className="video-container">
                <iframe
                  src={videoPlayerData.video_url}
                  className="video-iframe"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                  sandbox="allow-same-origin allow-scripts"
                ></iframe>
                <div className="overlay">
                  <div className="mask">
                    <img src={unileverLOGO} />
                  </div>
                </div>
              </div>
            )}
            <div className="video-data-container">
              {videoPlayerData.data &&
              Object.keys(videoPlayerData.data).length === 0 ? (
                <div className="no_data">Data not available </div>
              ) : (
                <div className="video-data-container-item">
                  {dataTitle.map(
                    (item, index) =>
                      videoPlayerData.data[item] && (
                        <div className="video-data-list" key={index}>
                          <div className="video-data-head">{item}</div>
                          {Object.keys(videoPlayerData.data[item]).length ===
                          0 ? (
                            <div
                              style={{
                                fontSize: "14px",
                                textAlign: "center",
                                paddingTop: "4px",
                              }}
                            >
                              No Data
                            </div>
                          ) : (
                            Object.keys(videoPlayerData.data[item]).map(
                              (key, index) => (
                                <div key={index} className="data-item ">
                                  <span className="data-item-column">
                                    {dataMap[key]
                                      ? dataMap[key]
                                      : key.replace(/_/g, " ")}
                                  </span>
                                  <span className="data-item-column-value">
                                    {videoPlayerData.data[item][key]}
                                  </span>
                                </div>
                              )
                            )
                          )}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(VideoPlayer);
