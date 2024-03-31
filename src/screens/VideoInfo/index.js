import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//actions
import { getVideoPlayerData, setSelectedVideoData } from "../../actions/app";

//icons
import Loader from "../../assets/loader.gif";

//style
import "./style.css";

//child components
import VideoPlayer from "../../components/VideoPlayer";

function VideoInfo({
  selected_video_data,
  video_player_data,
  getVideoPlayerData,
  setSelectedVideoData,
}) {
  const navigate = useNavigate();
  const { loader, error, front_data, side_data, video_data, is_toggle } =
    video_player_data;

  useEffect(() => {
    if (selected_video_data) {
      getVideoPlayerData(selected_video_data);
    } else {
      navigate("/");
    }

    // Controlling the browser's back button / Cleanup function when the component unmounts
    return () => {
      setSelectedVideoData(null);
    };
  }, [selected_video_data]);

  return (
    <div>
      {loader ? (
        <div className="loader-align">
          <img src={Loader} style={{ width: "48px" }} alt="loader" />
        </div>
      ) : error ? (
        <div className="loader-align  error">{error}</div>
      ) : selected_video_data && (front_data || side_data || video_data) ? (
        <VideoPlayer
          video_player_data={{ front_data, side_data, video_data, is_toggle }}
          // selectedVideoData={selected_video_data}
          view_type={selected_video_data.view_type}
        />
      ) : (
        <div className="flex-center loader-align">Data not available</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  selected_video_data: state.home.selected_video_data,
  video_player_data: state.home.video_player_data,
});

export default connect(mapStateToProps, {
  getVideoPlayerData,
  setSelectedVideoData,
})(VideoInfo);
