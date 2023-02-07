import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">
          <img
            className="goHome"
            src={process.env.PUBLIC_URL + "/img/logo.png"}
          />
        </Link>
      </li>
      <li>
        <Link to="/">Nwiter</Link>
      </li>
      <li>
        <Link to="/profile">
          <img
            className="goProfile"
            src={process.env.PUBLIC_URL + "/img/mypage.png"}
          />
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
