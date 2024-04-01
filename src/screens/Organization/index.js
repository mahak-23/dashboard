import React from "react";
import "./style.css";

const Organization = () => {
  // Sample data for organization details
  const organization = {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "123 Main Street, Cityville, ABC",
    email: "info@example.com",
    phone: "+1234567890",
    website: "www.example.com",
  };

  const about =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum aperiam in nisi. Voluptatibus optio ducimus dolore quisquam maiores similique. Consequatur quo saepe pariatur nesciunt molestias harum quas rerum ullam quaerat";

  return (
    <div className="organization-page">
      <h2>Organization</h2>

      <div className="about-card theme-container">
        <h3>About</h3>
        <p>{about}</p>
      </div>
      <div className="organization-details theme-container">
        <h3>Organization Details</h3>
        <p>{organization.description}</p>
        <div className="details">
          <div className="detail">
            <strong>Address:</strong> {organization.address}
          </div>
          <div className="detail">
            <strong>Email:</strong> {organization.email}
          </div>
          <div className="detail">
            <strong>Phone:</strong> {organization.phone}
          </div>
          <div className="detail">
            <strong>Website:</strong>{" "}
            <a
              href={`http://${organization.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {organization.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
