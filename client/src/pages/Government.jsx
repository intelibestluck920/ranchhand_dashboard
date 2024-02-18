import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PanelChrome } from "@grafana/ui";
import MainMenu from "../components/MainMenu";
import StatusMap from "../components/StatusMap";
// import logo1 from "../asset/img/logo/update/logo1.jpg";

const Government = () => {
  const [ranchData, setRanchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login") !== "success") {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://ranchhand.xyz/api/getAllRanchId", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("res: ", res);
        let ranchDataTemp = res.data.map((id) => {
          return { id: id, data: [] };
        });
        for (let i = 0; i < ranchDataTemp.length; i++) {
          try {
            const res = await axios.get(`https://ranchhand.xyz/api/getRanchData/${ranchDataTemp[i].id.replace(/ /g, "_")}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            // eslint-disable-next-line no-loop-func
            const updatedData = ranchDataTemp.map((ranch) => {
              if (ranch.id === ranchDataTemp[i].id) {
                return { ...ranch, data: res.data };
              }
              return ranch;
            });
            ranchDataTemp = updatedData;
          } catch (err) {
            console.log(err);
          }
        }
        setRanchData(ranchDataTemp);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 60000);

    // return () => {
    //   clearInterval(interval);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  return (
    <div className="container">
      <MainMenu />
      <div className="container1">
        <div className="title-container">
          <h1 className="title3">Government Dashboard</h1>
        </div>
        {/* <div className="logo-container">
          <img src={logo1} alt="Logo" className="logo1" />
        </div> */}
      </div>
      <div className="row" style={{ height: "182px" }}>
        {ranchData.map((ranch) => (
          <div className="col-12" key={`ranch_panel${ranch.id}`} style={{ width: `${100 / ranchData.length}%` }}>
            <Link className="origin-style" to={`/dashboard/${ranch.id.replace(/ /g, "_")}`}>
              <PanelChrome title={ranch.id} height={182}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "64px",
                      }}
                    >
                      {ranch.data?.length}
                    </div>
                  );
                }}
              </PanelChrome>
            </Link>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "8px" }}>
        <PanelChrome title="Status Map" height={700}>
          {(innerwidth, innerheight) => {
            return (
              <div
                style={{
                  height: innerheight + 16,
                  margin: "-8px",
                  fontSize: "24px",
                }}
              >
                <StatusMap value={ranchData} height={innerheight + 16} />
              </div>
            );
          }}
        </PanelChrome>
      </div>
    </div>
  );
};

export default Government;
