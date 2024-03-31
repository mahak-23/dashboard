import React, { useEffect, useRef, useState } from "react";

//style
import "./style.css";

const SelectDropdown = ({ options, onChange, title, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div className="select-dropdown" ref={dropdownRef}>
      <div
        className="dropdown-header"
        onClick={handleToggleDropdown}
        style={title !== "Select page" ? { width: "80%" } : { width: "80px" }}
      >
        <span>{selectedOption ? selectedOption.label : `${title}`}</span>
        {selectedOption && title !== "Select page" ? (
          <span
            onClick={(e) => {
              onChange(null);
            }}
          >
            <i className="fa fa-close" style={{ fontSize: "14px" }}></i>
          </span>
        ) : (
          <span>
            {isOpen ? (
              <i
                className="fa fa-chevron-down"
                style={{ fontSize: "14px" }}
              ></i>
            ) : (
              <i
                className="fa fa-chevron-right"
                style={{ fontSize: "14px" }}
              ></i>
            )}
          </span>
        )}
      </div>
      {isOpen && (
        <div>
          <ul
            className="dropdown-list"
            style={
              title !== "Select page"
                ? { position: "relative" }
                : { position: "absolute" }
            }
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleItemClick(option)}
                className={
                  selectedOption && selectedOption.value === option.value
                    ? "selected"
                    : ""
                }
              >
                <label>{option.label}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
