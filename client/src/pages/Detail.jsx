import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CollapsableSection, PanelChrome } from "@grafana/ui";
import TempGauge from "../components/TempGauge";
import HeatStressGauge from "../components/HeatStressGauge";
import AnimalTempHistory from "../components/AnimalTempHistory";
import { calcTHI } from "../service/utility-service";
import HeatStressHistory from "../components/HeatStressHistory";
import MainMenu from "../components/MainMenu";
import GeoFence from "../components/GeoFence";
// import logo1 from "../asset/img/logo/update/logo1.jpg";

const Detail = () => {
  const [detailData, setDetailData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const ranchId = location.pathname.split("/")[2].replace(/_/g, " ");
  const animalId = location.pathname.split("/")[3];

  const getTempByTime = (data) => {
    let date_temp = data.map((item) => {
      let jsDate = new Date(item.date);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
      formattedDate = formattedDate.replace(/,/g, "");
      return [formattedDate, item.temperature];
    });
    let last240Items = date_temp.slice(-240);
    return last240Items;
  };

  const getHeatStressByTime = (data) => {
    let date_value = data.map((item) => {
      let jsDate = new Date(item.datetime);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit" });
      return [formattedDate, calcTHI(item?.temperature, item?.humidity).toFixed(1)];
    });
    let last240Items = date_value.slice(-240);
    return last240Items;
  };

  const getAnimalGeoData = (data) => {
    if (data[2]) {
      return [{ id: data[2]?.animal_id, temperature: data[2]?.temperature, latitude: data[2]?.latitude, longitude: data[2]?.longitude }];
    }
    return [];
  };

  useEffect(() => {
    if (localStorage.getItem("login") !== "success") {
      navigate("/login");
    }
    const fetchData = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://ranchhand.xyz/api/getAnimalData/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setDetailData(res.data);

        const w_res = await axios.get("https://ranchhand.xyz/api/getAllWeatherData", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setWeatherData(w_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // fetchData(animalId);

    fetchData(animalId); // Call fetchData immediately when the component mounts

    const interval = setInterval(() => {
      fetchData(animalId); // Call fetchData within the interval
    }, 60000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <MainMenu />
      <div className="container1">
        <div className="title-container">
          {/* <h1 className="title3">{ranchId}</h1> */}
          <Link className="origin-style" to={`/dashboard/${ranchId.replace(/ /g, "_")}`}>
            <h1 className="title1">{ranchId}</h1>
          </Link>
        </div>
        {/* <div className="logo-conta */}
      </div>
      {/* <Link className="origin-style" to={`/dashboard/${ranchId.replace(/ /g, "_")}`}>
        <h1 className="title1">{ranchId}</h1>
      </Link> */}
      <CollapsableSection label={animalId} isOpen="true">
        <div>
          <div className="row">
            <div className="col-12 w-30">
              <div className="row">
                <div className="col-12 w-40">
                  <PanelChrome height={218} hoverHeader={true}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            overflow: "hidden",
                          }}
                        >
                          <img style={{ maxWidth: "100%" }} src="https://i.ibb.co/Wn3RR0v/cow-avatar-1.jpg" alt="cow-avatar-1" border="0" />
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
                <div className="col-12" style={{ width: "60%" }}>
                  <PanelChrome title="Current Temperature" height={218}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}
                        >
                          <TempGauge id="tempGauge" value={detailData[2]?.temperature.toFixed(2)} width="100%" height="168px" />
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <PanelChrome title="Location & Geo-Fence" height={258}>
                  {(innerwidth, innerheight) => {
                    return (
                      <div
                        style={{
                          height: innerheight + 16,
                          margin: "-8px",
                          fontSize: "24px",
                        }}
                      >
                        <GeoFence value={getAnimalGeoData(detailData)} height={innerheight + 16} showRanch={false} ranchID={ranchId} />
                      </div>
                    );
                  }}
                </PanelChrome>
              </div>
            </div>
            <div className="col-12 w-70">
              <PanelChrome title="Temperature History" height={258}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      <AnimalTempHistory id="animalTempHistory" value={getTempByTime(detailData)} width="100%" height="208px" />
                    </div>
                  );
                }}
              </PanelChrome>
              <div className="row" style={{ marginTop: "8px" }}>
                <div className="col-12 battery-chart" style={{ width: "25%" }}>
                  <PanelChrome title="Battery Level" height={218}>
                    {() => {
                      return (
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "91px",
                            color: "rgb(247, 248, 250)",
                            borderRadius: "3px",
                            background: "linear-gradient(120deg, rgb(66, 154, 67), rgb(111, 183, 87))",
                          }}
                        >
                          {detailData[detailData.length - 1]?.battery.toFixed(1)}
                          <span style={{ fontSize: "54px", margin: "20px 0 0 4px" }}>%</span>
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
                <div className="col-12" style={{ width: "25%" }}>
                  <PanelChrome title="Heat Stress" height={218}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}
                        >
                          <HeatStressGauge
                            id="heatStressGauge"
                            value={calcTHI(weatherData[0]?.temperature, weatherData[0]?.humidity).toFixed(1)}
                            width="100%"
                            height="168px"
                          />
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
                <div className="col-12" style={{ width: "50%" }}>
                  <PanelChrome title="Heat Stress" height={218}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}
                        >
                          <HeatStressHistory id="heatStressHistory" value={getHeatStressByTime(weatherData)} xAxisInterval={50} width="100%" height="168px" />
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "8px" }}>
            <div className="col-12" style={{ width: "13%" }}>
              <PanelChrome title="Birth Date" height={258}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      15th July 2018
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
            <div className="col-12" style={{ width: "13%" }}>
              <PanelChrome height={258} hoverHeader={true}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        style={{ maxWidth: "100%" }}
                        src="https://i.ibb.co/DwXmCwf/Whats-App-Image-2023-07-21-at-3-47-53-AM.jpg"
                        alt="Whats-App-2023-07-21-at-3-47-53-AM"
                        border="0"
                      />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
            <div className="col-12" style={{ width: "22%" }}>
              <PanelChrome height={258} hoverHeader={true}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        style={{ maxWidth: "100%" }}
                        src="https://i.ibb.co/Wnr2prq/signal-2019-04-05-094654-1.jpg"
                        alt="signal-2019-04-05-094654-1"
                        border="0"
                      />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
            <div className="col-12" style={{ width: "16%" }}>
              <PanelChrome height={258} hoverHeader={true}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        style={{ maxWidth: "100%" }}
                        src="https://i.ibb.co/1THJbkH/signal-2019-04-05-094654-1.jpg"
                        alt="signal-2019-04-05-094654-1"
                        border="0"
                      />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
            <div className="col-12" style={{ width: "22%" }}>
              <PanelChrome height={258} hoverHeader={true}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        style={{ maxWidth: "100%" }}
                        src="https://i.ibb.co/CKYZXw1/signal-2019-04-02-132124-1.jpg"
                        alt="signal-2019-04-02-132124-1"
                        border="0"
                      />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
            <div className="col-12" style={{ width: "14%" }}>
              <PanelChrome height={258} hoverHeader={true}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight,
                        overflow: "hidden",
                      }}
                    >
                      <img style={{ maxWidth: "100%" }} src="https://i.ibb.co/w0fxtWr/cow-avatar-2.jpg" alt="cow-avatar-2" border="0" />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
          </div>
        </div>
      </CollapsableSection>
    </div>
  );
};

export default Detail;
