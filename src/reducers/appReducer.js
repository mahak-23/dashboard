const INITIAL_STATE = {
  isAuthenticated: false,
  videos_list: {
    loader: false,
    error: null,
    data: null,
    paginated_data: null,
    currentPage: 1,
    totalPages: 1,
  },
  video_player_data: {
    loader: false,
    error: null,
    front_data: null,
    side_data: null,
    video_data: null,
    is_toggle: 1,
  },
  selected_video_data: null,
  selected_country: [],
  selected_gender: [],
  selected_time: null,
  selected_view: null,
  selected_country_file: null,
  is_ai_data: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_AUTHENTICATION":
      return {
        ...state,
        isAuthenticated: action.payload, 
      };

    case "SET_SELECTED_COUNTRY":
      return {
        ...state,
        selected_country: payload,
        // selected_time: null,
        // selected_view: null,
      };

    case "SET_SELECTED_TIME":
      return {
        ...state,
        selected_time: payload,
      };

    case "SET_SELECTED_VIEW":
      return {
        ...state,
        selected_view: payload,
      };

    case "SET_SELECTED_GENDER":
      return {
        ...state,
        selected_gender: payload,
      };

    case "SET_AI_DATA_VIDEOS_FLAG":
      return {
        ...state,
        is_ai_data: payload,
      };

    case "FETCHING_VIDEO_LIST_DATA":
      return {
        ...state,
        videos_list: {
          ...state.videos_list,
          loader: true,
        },
      };

    case "SET_VIDEO_LIST_DATA":
      return {
        ...state,
        videos_list: {
          ...state.videos_list,
          data: null,
          error: null,
          paginated_data: payload.videoObject,
          loader: false,
          totalPages: payload.totalPages || 1,
        },
      };

    case "VIDEO_LIST_DATA_FAILURE":
      return {
        ...state,
        videos_list: {
          ...state.videos_list,
          error: payload,
          loader: false,
        },
      };

    case "SET_PAGE_VIDEOS_LIST":
      return {
        ...state,
        videos_list: {
          ...state.videos_list,
          data:
            (state.videos_list.paginated_data &&
              state.videos_list.paginated_data[payload]) ||
            [],
          currentPage: payload,
        },
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        videos_list: {
          ...state.videos_list,
          currentPage: payload,
        },
      };

    case "SET_SELECTED_VIDEO_DATA":
      return {
        ...state,
        selected_video_data: payload,
        video_player_data: {
          ...state.video_player_data,
          data: null,
        },
      };

    case "FETCHING_VIDEO_PLAYER_DATA":
      return {
        ...state,
        video_player_data: {
          ...state.video_player_data,
          loader: true,
        },
      };

    case "SET_VIDEO_PLAYER_DATA":
      return {
        ...state,
        video_player_data: {
          ...state.video_player_data,
          front_data: payload.front_data,
          side_data: payload.side_data,
          video_data: payload.video_data,
          is_toggle: payload.is_toggle,
          loader: false,
          error: null,
        },
      };

    case "VIDEO_PLAYER_DATA_FAILURE":
      return {
        ...state,
        video_player_data: {
          ...state.video_player_data,
          error: payload,
          loader: false,
        },
      };

    case "SET_SELECTED_COUNTRY_FILE":
      return {
        ...state,
        selected_country_file: payload,
      };

    default:
      return {
        ...state,
      };
  }
};
