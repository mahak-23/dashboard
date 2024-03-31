import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as pbi from "powerbi-client";
import axios from "axios";
import { BASE_URL, Report_ID } from "../../config/constants";

//actions
import { setSelectedCountryFile, setAuthentication } from "../../actions/app";

//style
import "./style.css";

//icons
import Loader from "../../assets/loader.gif";

//child components
import SelectDropdown from "../../components/SelectDropDown";

//helperfunc
import { downloadPointsFile } from "../../utils/helperFunc";

function Dashboard({ selectedCountryFile, setSelectedCountryFile }) {
  const [error, setError] = useState(null);

  //Power BI embeded
  useEffect(() => {
    setError(null);

    axios
      .get(BASE_URL + "/powerbi/getembedtoken", { withCredentials: true })
      .then((res) => {
        const data = res.data;
        if (data.auth_redirect) {
          window.location.href = data.auth_redirect;
          return; // Stop execution after redirection
        }
        setAuthentication(true);
        const { embedUrl, accessToken } = JSON.parse(data);
        const config = {
          type: "report",
          tokenType: pbi.models.TokenType.Embed,
          accessToken: accessToken,
          embedUrl: embedUrl,
          id: Report_ID,
          permissions: pbi.permissions,
          settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
          },
        };

        const powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );

        const reportContainer = document.getElementById("reportContainer");
        const report = powerbi.embed(reportContainer, config);
        setError(null);
      })
      .catch((error) => {
        setError(
          "Something went wrong. Please try again by refreshing the tab."
        );
      });
  }, []);

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

  return (
    <div>
      <div className="dashboard-header">
        <span
          className="heading"
          style={{ fontWeight: "700", fontSize: "24px" }}
        >
          Dashboard
        </span>
      </div>
      {/* <div className="download-field">
        <SelectDropdown
          options={countryOptions}
          onChange={(value) => {
            setSelectedCountryFile(value);
          }}
          title={"country"}
          selectedOption={selectedCountryFile}
        />
        <button
          title="Selected a country to download file"
          className="download-button"
          onClick={() =>
            downloadPointsFile(selectedCountryFile && selectedCountryFile.value)
          }
          disabled={
            selectedCountryFile && selectedCountryFile.value ? false : true
          }
        >
          Download file
        </button>
      </div> */}
      <div className="dashboard-container">
        <div style={{ height: "100%" }} id="reportContainer">
          <div
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {error ? (
              <div className="loader-align error">{error}</div>
            ) : (
              <div className="loader-align">
                <img src={Loader} style={{ width: "48px" }} alt="loader" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedCountryFile: state.home.selected_country_file,
});

export default connect(mapStateToProps, { setSelectedCountryFile })(Dashboard);
