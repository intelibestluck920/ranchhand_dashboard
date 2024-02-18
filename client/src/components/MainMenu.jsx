import React, { useState } from "react";
import { Menu, Button } from "@grafana/ui";
import { Link, useNavigate } from "react-router-dom";

const MainMenu = () => {
  const [menuShow, setMenuShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="fixed-menu" style={{zIndex: "100"}}>
      <Button icon="bars" fill="text" tooltip={"Menu"} style={{ color: "#ccccdc" }} onClick={() => setMenuShow(!menuShow)} />
      {menuShow && (
        <div className="menu-container">
          <Menu>
            <Link className="origin-style" to="/">
              <Menu.Item label="Government Dashboard" />
            </Link>
            <Link className="origin-style" to="/disease">
              <Menu.Item label="Disease Chain" />
            </Link>
            <Link className="origin-style" to="/membership">
              <Menu.Item label="Membership" />
            </Link>
            <Link className="origin-style" to="/login">
              <Menu.Item
                label="Log out"
                onClick={() => {
                  localStorage.setItem("login", "");
                  navigate("/login");
                }}
              />
            </Link>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
