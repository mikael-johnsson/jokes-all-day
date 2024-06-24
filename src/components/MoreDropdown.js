import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css"
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <a
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      Edit/Delete
    </a>
  ));

  export const MoreDropdown = ({handleEdit, handleDelete}) => {
    return (
    <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
        <Dropdown.Item 
        className={styles.DropdownItem}
        onClick={handleEdit}
        aria-label="edit">
            edit
        </Dropdown.Item>

        <Dropdown.Item 
        className={styles.DropdownItem}
        onClick={handleDelete}
        aria-label="delete">
            delete
        </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>)
  }
  