import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  // Basic header with Pokemon logo that can link back to the landing Dashboard page
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokemon Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Link>
    </div>
  );
};

export default Header;
