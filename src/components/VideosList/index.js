import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//actions
import {
  getPaginatedVideos,
  getVideosListData,
  setCurrentPage,
  setSelectedCountry,
  setSelectedTime,
  setSelectedVideoData,
  setSelectedView,
  setSelectedGender,
  setAiDataFlag,
} from "../../actions/app";

//style
import "./style.css";

//icon
import Loader from "../../assets/loader.gif";

//child components
import SelectDropdown from "../SelectDropDown";
import MultiSelectDropdown from "../SelectDropDown/MultiSelectDropdown";

function VideosList({
  is_ai_data,
  selected_gender,
  selected_country,
  selected_time,
  selected_view,
  setSelectedCountry,
  setSelectedTime,
  setSelectedView,
  setSelectedVideoData,
  videos_list,
  getVideosListData,
  getPaginatedVideos,
  setCurrentPage,
  setSelectedGender,
  setAiDataFlag,
  isAuthenticated,
}) {
  const navigate = useNavigate();
  const { loader, error, data, currentPage, totalPages } = videos_list;
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    // Update the limit based on the conditions
    setLimit(data && data.length ? Math.min(data.length, 35) : 0);
  }, [data]);

  const tableRef = useRef();

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
      if (
        limit < data.length &&
        scrollHeight - scrollTop - clientHeight - 5 < 1
      ) {
        setLimit((prev) => Math.min(prev + 20, data.length));
      }
    }
  };

  useEffect(() => {
    const currentTableRef = tableRef.current;

    if (currentTableRef) {
      currentTableRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentTableRef) {
        currentTableRef.removeEventListener("scroll", handleScroll);
        currentTableRef.scrollTop = 0;
      }
    };
  }, [data]);

  useEffect(() => {
    if ((!data && !error) || !isAuthenticated) {
      getVideosListData();
    }
  }, []);

  const handleEyeClick = () => {
    if (!loader) {
      setAiDataFlag(!is_ai_data);
      setSelectedGender([]);
      getVideosListData();
    }
  };

  const handleVideoItemClick = (item) => {
    setSelectedVideoData(item);
    navigate("/video-info");
  };

  const pageButtonsClick = (page) => {
    setCurrentPage(page);
    getPaginatedVideos(page);
    setLimit(data && data.length ? Math.min(data.length, 35) : 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      pageButtonsClick(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      pageButtonsClick(prevPage);
    }
  };

  const countryOptions = [
    {
      label: "India",
      value: "India",
    },
    {
      label: "Indonesia",
      value: "Indonesia",
    },
    {
      label: "Vietnam",
      value: "Vietnam",
    },
  ];

  const timeOptions = [
    {
      label: "Day",
      value: "Day",
    },
    {
      label: "Night",
      value: "Night",
    },
  ];

  const viewOptions = [
    {
      label: "Front",
      value: "Front",
    },
    {
      label: "Side",
      value: "Side",
    },
  ];

  const genderOptions = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Kid",
      value: "Kid",
    },
  ];

  const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
    label: `Page ${i + 1}`,
    value: i + 1,
  }));

  return (
    <div className="videos-container">
      <div className="filter-section-heading">
        <div className="ai-head">
          <span style={{ color: "#888" }}>Videos with AI Data</span>
          <span
            onClick={handleEyeClick}
            style={{
              color: loader ? "grey" : "#ff6e34",
              cursor: loader ? "not-allowed" : "pointer",
              padding: "6px",
            }}
          >
            {is_ai_data ? (
              <i className="fa fa-eye" title="Click to hide"></i>
            ) : (
              <i className="fa fa-eye-slash" title="Click to show"></i>
            )}
          </span>
        </div>
        <div className="filter-head pagination-buttons">
          <span>Filters</span>
          <button onClick={getVideosListData} disabled={loader}>
            Apply
          </button>
        </div>
        <MultiSelectDropdown
          options={countryOptions}
          onChange={setSelectedCountry}
          title={"Select country"}
          selectedOptions={selected_country}
        />
        {is_ai_data && (
          <MultiSelectDropdown
            options={genderOptions}
            onChange={setSelectedGender}
            title={"Select gender"}
            selectedOptions={selected_gender}
          />
        )}
        <SelectDropdown
          options={timeOptions}
          onChange={(value) => {
            setSelectedTime(value);
          }}
          title={"Select time"}
          selectedOption={selected_time}
        />
        <SelectDropdown
          options={viewOptions}
          onChange={(value) => {
            setSelectedView(value);
          }}
          title={"Select view"}
          selectedOption={selected_view}
        />
      </div>
      <div className="main-videos-container">
        {loader ? (
          <div className="loader-align">
            <img src={Loader} style={{ width: "48px" }} alt="loader" />
          </div>
        ) : error ? (
          <div className="loader-align error">{error}</div>
        ) : data !== null && data.length !== 0 ? (
          <>
            <div className="container-header">
              <div className="items-count">
                Showing {limit} of {data ? data.length : 0} items
              </div>
              <div className="pagination-buttons">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>{" "}
                <span>
                  {" "}
                  Page {currentPage} of {totalPages}
                </span>{" "}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <div className="page-select">
                <SelectDropdown
                  options={pageOptions}
                  onChange={(item) => {
                    pageButtonsClick(item.value);
                  }}
                  title={"Select page"}
                  selectedOption={{
                    label: `Page ${currentPage}`,
                    value: currentPage,
                  }}
                />
              </div>
            </div>

            <div className="videos-List-container" ref={tableRef}>
              <table>
                <thead>
                  <tr>
                    <th className="heading">Video name</th>
                    <th className="heading">Country</th>
                    <th className="heading">Time</th>
                    <th className="heading">View</th>
                    {is_ai_data && <th className="heading">Gender</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, limit).map((item, index) => (
                    <tr className={"row"} key={index}>
                      <td
                        className="video-name"
                        onClick={() => {
                          handleVideoItemClick(item);
                        }}
                      >
                        {item.video_name}
                      </td>
                      <td>{item.country || "-"}</td>
                      <td>
                        {item.time_of_day
                          ? item.time_of_day === "Kid"
                            ? "-"
                            : item.time_of_day
                          : "-"}
                      </td>
                      <td>{item.view_type || "-"}</td>
                      {is_ai_data && <td>{item.gender || "-"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="loader-align">Videos are not available.</div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.home.isAuthenticated,
  selected_country: state.home.selected_country,
  selected_time: state.home.selected_time,
  selected_view: state.home.selected_view,
  videos_list: state.home.videos_list,
  selected_gender: state.home.selected_gender,
  is_ai_data: state.home.is_ai_data,
});

export default connect(mapStateToProps, {
  setSelectedCountry,
  setSelectedTime,
  setSelectedView,
  setSelectedVideoData,
  getVideosListData,
  getPaginatedVideos,
  setCurrentPage,
  setSelectedGender,
  setAiDataFlag,
})(VideosList);
