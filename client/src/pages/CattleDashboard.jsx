import React, { useEffect, useState } from "react";
import { PanelChrome, CollapsableSection } from "@grafana/ui";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { calcTHI } from "../service/utility-service";
import HeatStressGauge from "../components/HeatStressGauge";
import HeatStressHistory from "../components/HeatStressHistory";
import TempAndHumidity from "../components/TempAndHumidity";
import PressureWindSpeed from "../components/PressureWindSpeed";
import ScatterChart from "../components/ScatterChart";
import MainMenu from "../components/MainMenu";
import AnimalTempGauge from "../components/AnimalTempGauge";
import GeoFence from "../components/GeoFence";
// import logo1 from "../asset/img/logo/update/logo1.jpg";

const CattleDashboard = () => {
  const [animalData, setAnimalData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [animalDataDate, setAnimalDataDate] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const ranchId = location.pathname.split("/")[2].replace(/_/g, " ");

  const [CntArray, setCntArray] = useState([]);

  const getHeatStressByTime = (data) => {
    let date_value = data.map((item) => {
      let jsDate = new Date(item.datetime);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
      formattedDate = formattedDate.replace(/,/g, "");
      return [formattedDate, calcTHI(item?.temperature, item?.humidity).toFixed(1)];
    });
    let last240Items = date_value.slice(-240);
    return last240Items;
  };

  const getTempHumiByTime = (data) => {
    let date_value = data.map((item) => {
      let jsDate = new Date(item.datetime);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit" });
      formattedDate = formattedDate.replace(/,/g, "");
      return [formattedDate, item.temperature, item.humidity];
    });
    let last240Items = date_value.slice(-240);
    return last240Items;
  };

  const getPressWSpeedByTime = (data) => {
    let date_value = data.map((item) => {
      let jsDate = new Date(item.datetime);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit" });
      formattedDate = formattedDate.replace(/,/g, "");
      return [formattedDate, item.sealevelpressure, item.windspeed];
    });
    let last240Items = date_value.slice(-240);
    return last240Items;
  };

  const getAnimalTempData = (dataArray) => {
    let returnData = dataArray.map((data) => {
      let date_value = data.data.map((item) => item.temperature);
      let last240Items = date_value.slice(-240);
      return { id: data.id, data: last240Items };
    });
    return returnData;
  };

  const getAnimalBatteryData = (dataArray) => {
    let returnData = dataArray.map((data) => {
      let date_value = data.data.map((item) => item.battery);
      let last240Items = date_value.slice(-240);
      return { id: data.id, data: last240Items };
    });
    return returnData;
  };

  const getAnimalDataDate = (data) => {
    let date_value = data.map((item) => {
      let jsDate = new Date(item);
      let formattedDate = jsDate.toLocaleString("default", { month: "2-digit", day: "2-digit" });
      formattedDate = formattedDate.replace(/,/g, "");
      return formattedDate;
    });
    let last240Items = date_value.slice(-240);
    return last240Items;
  };

  const getAnimalGeoData = (data) => {
    let filteredData = data.map((item) => {
      let obj = item?.data[2];
      return { id: obj?.animal_id, temperature: obj?.temperature, latitude: obj?.latitude, longitude: obj?.longitude };
    });
    return filteredData;
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8881/api/getAllAnimalId", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // console.log(res);
      let animalDataTemp = res.data.map((id) => {
        return { id: id, data: [] };
      });
      // console.log("animalDataTemp_xxxxx", animalDataTemp);
      for (let i = 0; i < animalDataTemp.length; i++) {
        try {
          const res = await axios.get(`http://localhost:8881/api/getAnimalData/${animalDataTemp[i].id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // eslint-disable-next-line no-loop-func
          var updatedData = animalDataTemp.map((animal) => {
            if (animal.id === animalDataTemp[i].id) {
              // console.log('res_data', res.data);
              // console.log('animal_id', animal.id);
              // console.log('updated_animal', { ...animal, data: res.data });

              return { ...animal, data: res.data };
            }
            else
              return animal;
          });
          animalDataTemp = updatedData;
          // console.log("updatedData", updatedData);         

        } catch (err) {
          console.log(err);
        }
      }

      for (let i = 0; i < animalDataTemp.length; i++) {
        // console.log(`animalDataTemp${i}`, animalDataTemp[i].id);
        CntArray[i] = CntArray[i] + 1;
        // console.log(`$i`, CntArray[i]);
        if (animalDataTemp[i].data[animalDataTemp[i].data.length - 1].temperature < 39.0) {

          if (CntArray[i] == 40) {
            console.log("++++++++++++++++++++++++++++++++++");
            axios.get("http://localhost:3001/twilio/sendSMS");
            CntArray[i] = 0;
          }
        }
        else if (animalDataTemp[i].data[animalDataTemp[i].data.length - 1].temperature < 41.0) {
          console.log("++++++++++++++++++++++++++++++++++");
          if (CntArray[i] > 20) CntArray[i] = 20;
          if (CntArray[i] == 20) {
            const postData = {
              id: animalDataTemp[i].id,
              temperature: animalDataTemp[i].data[animalDataTemp[i].data.length - 1].temperature
            }
            axios.post("http://localhost:3001/twilio/sendSMS", postData);
            CntArray[i] = 0;
          }
        }
      }




      // 
      setAnimalData(animalDataTemp);

      const w_res = await axios.get("http://52.53.137.46:8881/api/getAllWeatherData", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setWeatherData(w_res.data);

      const date_res = await axios.get("http://52.53.137.46:8881/api/getAnimalDataDate", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setAnimalDataDate(date_res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      CntArray[i] = 0;
    }
    if (localStorage.getItem("login") !== "success") {
      navigate("/login");
    }



    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <MainMenu />
      {/* <h1 className="title2">{ranchId}</h1> */}
      <div className="container1">
        <div className="title-container">
          <h1 className="title3">{ranchId}</h1>
        </div>
        {/* <div className="logo-container">
          <img src={logo1} alt="Logo" className="logo1" />
        </div> */}
      </div>
      <div className="row">
        {animalData?.map((animal) => (
          <div className="col-12" key={`temp_panel${animal.id}`} style={{ width: `${100 / animalData.length}%` }}>
            <Link className="origin-style" to={`/detail/${ranchId.replace(/ /g, "_")}/${animal.id}`}>
              <PanelChrome title={animal.id} height={172}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        height: innerheight,
                        fontSize: "18px",
                      }}
                    >
                      <AnimalTempGauge value={animal.data[animal.data.length - 1]?.temperature} height={innerheight} max={70} />
                    </div>
                  );
                }}
              </PanelChrome>
            </Link>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "14px" }}>
        <CollapsableSection label="Local Weather Conditions" isOpen="true">
          <div className="row">
            <div className="col-12" style={{ width: "50%" }}>
              <div className="row">
                <div className="col-12" style={{ width: "33%" }}>
                  <PanelChrome title="Temperature" height={106}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "38px",
                            fontWeight: "500",
                          }}
                        >
                          {weatherData[0]?.temperature.toFixed(1)}
                          <span className="unit-wrapper"> °C</span>
                        </div>
                      );
                    }}
                  </PanelChrome>
                  <div style={{ marginTop: "8px" }}>
                    <PanelChrome title="Humidity" height={106}>
                      {(innerwidth, innerheight) => {
                        return (
                          <div
                            style={{
                              height: innerheight,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "38px",
                              fontWeight: "500",
                            }}
                          >
                            {weatherData[0]?.humidity.toFixed(1)}
                            <span className="unit-wrapper"> %H</span>
                          </div>
                        );
                      }}
                    </PanelChrome>
                  </div>
                </div>
                <div className="col-12" style={{ width: "33%" }}>
                  <PanelChrome title="Wind Speed" height={106}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "38px",
                            fontWeight: "500",
                          }}
                        >
                          {weatherData[0]?.windspeed.toFixed(2)}
                          <span className="unit-wrapper"> km/h</span>
                        </div>
                      );
                    }}
                  </PanelChrome>
                  <div style={{ marginTop: "8px" }}>
                    <PanelChrome title="Pressure" height={106}>
                      {(innerwidth, innerheight) => {
                        return (
                          <div
                            style={{
                              height: innerheight,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "38px",
                              fontWeight: "500",
                            }}
                          >
                            {Math.round(weatherData[0]?.sealevelpressure)}
                            <span className="unit-wrapper"> hPa</span>
                          </div>
                        );
                      }}
                    </PanelChrome>
                  </div>
                </div>
                <div className="col-12" style={{ width: "33%" }}>
                  <PanelChrome title="Heat Stress" height={220}>
                    {(innerwidth, innerheight) => {
                      return (
                        <div
                          style={{
                            height: innerheight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "38px",
                          }}
                        >
                          <HeatStressGauge
                            id="heatStressGauge"
                            value={calcTHI(weatherData[0]?.temperature, weatherData[0]?.humidity).toFixed(1)}
                            width="100%"
                            height={`${innerheight}px`}
                          />
                        </div>
                      );
                    }}
                  </PanelChrome>
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <PanelChrome title="Temperature & Humidity" height={334}>
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
                        <TempAndHumidity id="tempAndHumidity" value={getTempHumiByTime(weatherData)} width="100%" height="284px" />
                      </div>
                    );
                  }}
                </PanelChrome>
              </div>
            </div>
            <div className="col-12" style={{ width: "50%" }}>
              <PanelChrome title="Geo-Fence" height={562}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight + 16,
                        margin: "-8px",
                        fontSize: "24px",
                      }}
                    >
                      <GeoFence value={getAnimalGeoData(animalData)} height={innerheight + 100} showRanch={true} ranchID={ranchId} />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
          </div>
        </CollapsableSection>
      </div>
      <CollapsableSection label="Status" isOpen="true">
        <div className="row">
          <div className="col-12 w-50">
            <PanelChrome title="Heat Stress History" height={334}>
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
                    <HeatStressHistory id="heatStressHistory" value={getHeatStressByTime(weatherData)} xAxisInterval={24} width="100%" height="170px" />
                  </div>
                );
              }}
            </PanelChrome>
          </div>
          <div className="col-12 w-50">
            <PanelChrome title="Pressure & Wind Speed" height={334}>
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
                    <PressureWindSpeed id="pressureWindSpeed" value={getPressWSpeedByTime(weatherData)} width="100%" height="220px" />
                  </div>
                );
              }}
            </PanelChrome>
          </div>

        </div>
        <div className="row" style={{ marginTop: '16px' }}>
          <div className="col-12 w-50">
            <PanelChrome title="Max Temperatures" height={334}>
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
                    <ScatterChart
                      id="maxTemperature"
                      value={getAnimalTempData(animalData)}
                      date={getAnimalDataDate(animalDataDate)}
                      showThreshold={true}
                      threshold={40.4}
                      min={0}
                      max={60}
                      yLabel={"°C"}
                      inverse={true}
                      xAxisInterval={48}
                      width="100%"
                      height="284px"
                    />
                  </div>
                );
              }}
            </PanelChrome>
            <div style={{ marginTop: "8px" }}>
              <PanelChrome title="Min Battery" height={334}>
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
                      <ScatterChart
                        id="minBattery"
                        value={getAnimalBatteryData(animalData)}
                        date={getAnimalDataDate(animalDataDate)}
                        showThreshold={false}
                        threshold={0}
                        min={0}
                        max={100}
                        yLabel={"%"}
                        inverse={false}
                        xAxisInterval={48}
                        width="100%"
                        height="284px"
                      />
                    </div>
                  );
                }}
              </PanelChrome>
            </div>
          </div>
          <div className="col-12 w-50">
            <PanelChrome title="Min Temperatures" height={334}>
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
                    <ScatterChart
                      id="minTemperature"
                      value={getAnimalTempData(animalData)}
                      date={getAnimalDataDate(animalDataDate)}
                      showThreshold={true}
                      threshold={30}
                      min={0}
                      max={50}
                      yLabel={"°C"}
                      inverse={false}
                      xAxisInterval={48}
                      width="100%"
                      height="284px"
                    />
                  </div>
                );
              }}
            </PanelChrome>
            {/* <div style={{ marginTop: "8px" }}>
              <PanelChrome title="Geo-Fence" height={334}>
                {(innerwidth, innerheight) => {
                  return (
                    <div
                      style={{
                        height: innerheight + 16,
                        margin: "-8px",
                        fontSize: "24px",
                      }}
                    >
                      <GeoFence value={getAnimalGeoData(animalData)} height={innerheight + 16} showRanch={true} ranchID={ranchId} />
                    </div>
                  );
                }}
              </PanelChrome>
            </div> */}
          </div>
        </div>
      </CollapsableSection>
    </div>
  );
};

export default CattleDashboard;
