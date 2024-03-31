import { BASE_URL } from "../config/constants";
import axios from "axios";
import Cookies from "js-cookie";

export const setSelectedCountry = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_COUNTRY",
    payload: item,
  });
};

export const setSelectedTime = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_TIME",
    payload: item,
  });
};

export const setSelectedView = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_VIEW",
    payload: item,
  });
};

export const setSelectedGender = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_GENDER",
    payload: item,
  });
};

export const setAiDataFlag = (flag) => (dispatch) => {
  dispatch({
    type: "SET_AI_DATA_VIDEOS_FLAG",
    payload: flag,
  });
};

export const setCurrentPage = (page) => (dispatch) => {
  dispatch({
    type: "SET_CURRENT_PAGE",
    payload: page,
  });
};

export const setAuthentication = (val) => (dispatch) => {
  dispatch({
    type: "SET_AUTHENTICATION",
    payload: val,
  });
};

export const getVideosListData = () => async (dispatch, getState) => {
  const {
    selected_country,
    selected_time,
    selected_view,
    selected_gender,
    is_ai_data,
  } = getState().home;

  dispatch({
    type: "FETCHING_VIDEO_LIST_DATA",
  });
  
  let dt = {
    country: selected_country,
    time_of_day: selected_time ? selected_time.value : "",
    view_type: selected_view ? selected_view.value : "",
    gender: selected_gender,
  };

  let end_point = BASE_URL + "/videos/get";

  if (!is_ai_data) {
    end_point = BASE_URL + "/othervideos/get";
  }

  axios
    .post(end_point, dt, { withCredentials: true })
    .then((res) => {
      if (res.data.auth_redirect) {
        window.location.href = res.data.auth_redirect;
      } else if (res.data.status) {
        let data = res.data.videos;

        //create object to seperate items in chunks as pages
        const chunkSize = 50;
        const videoObject = {};
        let totalPages = 0;

        data.forEach((video, index) => {
          const chunkIndex = Math.floor(index / chunkSize) + 1;
          // console.log("chunkIndex",chunkIndex ,"index",index, index / chunkSize)

          if (!videoObject[chunkIndex]) {
            videoObject[chunkIndex] = [];
            totalPages += 1;
          }

          videoObject[chunkIndex].push(video);
        });
        dispatch({
          type: "SET_VIDEO_LIST_DATA",
          payload: {
            videoObject,
            totalPages,
          },
        });
        dispatch(getPaginatedVideos(1));
        dispatch(setAuthentication(true));
      } else {
        dispatch({
          type: "VIDEO_LIST_DATA_FAILURE",
          payload: res.data.message,
        });
        dispatch(setAuthentication(true));
      }
    })
    .catch((err) => {
      dispatch({
        type: "VIDEO_LIST_DATA_FAILURE",
        payload: "Something went wrong while fetching video list",
      });
    });
};

export const getPaginatedVideos = (page) => (dispatch) => {
  dispatch({
    type: "SET_PAGE_VIDEOS_LIST",
    payload: page,
  });
};

export const setSelectedVideoData = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_VIDEO_DATA",
    payload: item,
  });
};

export const getVideoPlayerData = (item) => (dispatch) => {
  dispatch({
    type: "FETCHING_VIDEO_PLAYER_DATA",
  });

  let dt = {
    video_id: item && item.id,
    view_type: (item && item.view_type) || "",
    video_name: (item && item.video_name) || "",
    video_url: (item && item.video_url) || "",
    is_data: item && item.is_data,
  };

  let end_point = BASE_URL + "/videos/data/get";

  axios
    .post(end_point, dt, { withCredentials: true })
    .then((res) => {
      if (res.data.auth_redirect) {
        window.location.href = res.data.auth_redirect;
      } else if (res.data.status) {
        const front_data = res.data.front || null;
        const side_data = res.data.side || null;
        const video_data = res.data.video_data || null;
        const is_toggle = res.data && res.data.toggle;

        dispatch({
          type: "SET_VIDEO_PLAYER_DATA",
          payload: { front_data, side_data, video_data, is_toggle },
        });
        dispatch(setAuthentication(true));
      } else {
        dispatch({
          type: "VIDEO_PLAYER_DATA_FAILURE",
          payload: res.data.message,
        });
        dispatch(setAuthentication(true));
      }
    })
    .catch((err) => {
      dispatch({
        type: "VIDEO_PLAYER_DATA_FAILURE",
        payload: "Something went wrong while fetching video Data",
      });
    });
};

export const setSelectedCountryFile = (item) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_COUNTRY_FILE",
    payload: item,
  });
};

export const logout = () => (dispatch) => {
  let end_point = BASE_URL + "/logout";

  axios
    .get(end_point, { withCredentials: true })
    .then((res) => {
      if (res.data.auth_redirect) {
        window.location.href = res.data.auth_redirect;
      } else {
        alert("something went wrong");
      }
      dispatch(setAuthentication(false));
    })
    .catch((err) => {
      alert("something went wrong");
    });
};