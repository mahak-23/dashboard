import indiaFile from "./countryCutPointsFile/India_Cut_Points.xlsx";
import indonesiaFile from "./countryCutPointsFile/Indonesia_Cut_Points.xlsx";
import vietnamFile from "./countryCutPointsFile/Vietnam_Cut_Points.xlsx";

export const downloadPointsFile = (selectedCountry) => {
  let filePath = null;

  if (selectedCountry === "Indonesia") {
    filePath = indonesiaFile;
  } else if (selectedCountry === "Vietnam") {
    filePath = vietnamFile;
  } else if (selectedCountry === "India") {
    filePath = indiaFile;
  } else {
    alert("Please select a correct country");
    return;
  }

  // Create a link element
  const link = document.createElement("a");
  link.href = filePath;
  link.download = `${selectedCountry}.xlsx`;
  // Append the link to the body
  document.body.appendChild(link);
  // Trigger the click event to start downloading
  link.click();
  // Clean up by removing the link from the body
  document.body.removeChild(link);
};
