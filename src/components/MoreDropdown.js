import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MoreDropdown.module.css"
import { useHistory } from "react-router";

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
      MENU
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
  

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
        
        change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
        
        change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
  