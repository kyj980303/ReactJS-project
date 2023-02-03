import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">
          <img className="goHome" src="img/logo.png" />
        </Link>
      </li>
      <li>
        <Link to="/">Nwiter</Link>
      </li>
      <li>
        <Link to="/profile">
          <img className="goProfile" src="img/mypage.png" />
          {/* {userObj.displayName} Profile */}
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
