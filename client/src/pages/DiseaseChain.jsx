import React, { useEffect } from "react";
import { PanelChrome } from "@grafana/ui";
import MainMenu from "../components/MainMenu";
import { useNavigate } from "react-router-dom";
// import logo1 from "../asset/img/logo/update/logo1.jpg";

const DiseaseChain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login") !== "success") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <MainMenu />
      {/* <h1 className="title1">Disease Chain</h1> */}
      <div className="container1">
        <div className="title-container">
          <h1 className="title3">Disease Chain</h1>
        </div>
        {/* <div className="logo-container">
          <img src={logo1} alt="Logo" className="logo1" />
        </div> */}
      </div>
      <PanelChrome height={823}>
        {(innerwidth, innerheight) => {
          return (
            <div
              style={{
                height: innerheight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img style={{ maxWidth: "1280px" }} src="https://i.ibb.co/Y8MfwRW/Disease-Chain-Better.gif" alt="Disease-Chain-Better" border="0" />
              </div>
            </div>
          );
        }}
      </PanelChrome>
    </div>
  );
};

export default DiseaseChain;
