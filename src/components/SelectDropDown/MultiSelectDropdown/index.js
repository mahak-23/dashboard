import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const MultiSelectDropdown = ({ options, onChange, title, selectedOptions }) => {
  const [selectedItems, setSelectedItems] = useState([...selectedOptions]);
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
    const updatedSelection = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div
        className="dropdown-header"
        onClick={handleToggleDropdown}
        style={{ width: "80%" }}
      >
        {selectedItems.length > 0 ? (
          <span className="title">{selectedItems.join(",")}</span>
        ) : selectedItems.length === 0 ? (
          <span className="title">{title}</span>
        ) : null}
        {selectedItems.length > 0 ? (
          <span
            onClick={(e) => {
              setSelectedItems([]);
              onChange([]);
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
          <ul className="dropdown-list" style={{ position: "relative" }}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleItemClick(option.value)}
                className={
                  selectedItems.includes(option.value) ? "selected-item" : ""
                }
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(option.value)}
                  readOnly
                />
                <label>{option.label}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
