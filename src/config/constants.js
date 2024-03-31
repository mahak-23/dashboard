//powerBI workspace report_id
const Report_ID = "70bf8a4e-d5ae-457e-aedc-b9f516dfa3fd";

const windowsLocation = window.location.origin;
let BASE_URL = "";

const prodDomain = "https://unilever-tos.paralleldots.com";
const devDomain = "https://unilever-tos-dev.paralleldots.com";

const prodURL = "https://unilever-tos-prod-apis.paralleldots.com";
const devURL = "https://unilever-tos-dev-apis.paralleldots.com";

if (windowsLocation === prodDomain) {
  BASE_URL = prodURL;
} else {
  BASE_URL = devURL;
}

export { BASE_URL, Report_ID };
