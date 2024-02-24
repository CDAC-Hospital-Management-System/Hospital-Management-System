import React, { useEffect } from "react";

import "./Header.css";
import { useLocation } from "react-router-dom";
function Header(prop) {
  const location = useLocation();
  useEffect(() => {}, [location]);
  
    return (
      <div style={{ width: "100%" }}>
        <h1 className="container-fluid imageContainer" style={{color:"Black"}}>
          Welcome To Hospital Management System
        </h1>
      </div>
    );
  }


export default Header;
