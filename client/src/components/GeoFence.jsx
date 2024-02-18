import React, { useEffect, useState } from "react";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import { calculateAverage } from "../service/utility-service";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Button } from "@grafana/ui";

const GeoFence = (props) => {
  const [averageCenter, setAverageCenter] = useState([53.029, -111.188]);
  const [showControl, setShowControl] = useState(false);
  const [geoRadius, setGeoRadius] = useState(props.showRanch ? 4500 : 70);
  const colorArray = [
    { color: "#F2495C", label: "< 29" },
    { color: "#73BF69", label: "29+" },
    { color: "#E0B400", label: "40.4+" },
    { color: "#FA6400", label: "< 41.4" },
  ];
  const fillBlueOptions = { color: "#1F60C4", fillOpacity: 0.1, weight: 1 };
  const getfillOption = (temp) => {
    const fillRedOptions = { color: colorArray[0].color, fillOpacity: 0.3, weight: 1 };
    const fillGreenOptions = { color: colorArray[1].color, fillOpacity: 0.3, weight: 1 };
    const fillYellowOptions = { color: colorArray[2].color, fillOpacity: 0.3, weight: 1 };
    const fillOrangeOptions = { color: colorArray[3].color, fillOpacity: 0.3, weight: 1 };
    if (temp > 41.4) {
      return fillOrangeOptions;
    } else if (temp > 40.4) {
      return fillYellowOptions;
    } else if (temp > 29) {
      return fillGreenOptions;
    } else {
      return fillRedOptions;
    }
  };

  useEffect(() => {
    setAverageCenter([calculateAverage(props.value.map((item) => item?.latitude)), calculateAverage(props.value.map((item) => item?.longitude))]);
  }, [props.value]);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer center={averageCenter} zoom={11} scrollWheelZoom={true} style={{ height: props.height, width: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {props.showRanch ? (
          <Circle center={averageCenter} pathOptions={fillBlueOptions} radius={geoRadius}>
            <Tooltip direction="bottom" offset={[0, 80]} opacity={1}>
              {props.ranchID}
            </Tooltip>
            <Popup>
              <Link to={`/dashboard/${props.ranchID.replace(/ /g, "_")}`}>{props.ranchID} dashboard</Link>
            </Popup>
          </Circle>
        ) : (
          <CircleMarker center={averageCenter} pathOptions={fillBlueOptions} radius={geoRadius}>
            <Tooltip direction="bottom" offset={[0, 50]} opacity={1}>
              {props.ranchID}
            </Tooltip>
            <Popup>
              <Link to={`/dashboard/${props.ranchID.replace(/ /g, "_")}`}>{props.ranchID} dashboard</Link>
            </Popup>
          </CircleMarker>
        )}
        {props.value.map((item) => (
          <CircleMarker center={[item?.latitude, item?.longitude]} pathOptions={getfillOption(item?.temperature)} radius={6} key={`circle-maker-${item?.id}`}>
            <Tooltip direction="bottom" offset={[10, 10]} opacity={1}>
              Animal ID: {item?.id}
              <br />
              Temperature: {item?.temperature} °C
              <br />
              Latitude: {item?.latitude}
              <br />
              Longitude: {item?.longitude}
            </Tooltip>
            <Popup>
              <Link to={`/detail/${props.ranchID.replace(/ /g, "_")}/${item?.id}`}>
                {props.ranchID}: Animal {item?.id}
              </Link>
            </Popup>
          </CircleMarker>
        ))}
        <div style={{ position: "fixed", bottom: "8px", left: "8px", zIndex: "1000" }}>
          {props.showRanch && (
            <div className="mapReferBox">
              <div>{props.ranchID}</div>
              <div className="mapReferInnerBox">
                <div className="circleSymbol" style={{ backgroundColor: "#1F60C4", opacity: "0.1" }}></div>
              </div>
            </div>
          )}
          <div className="mapReferBox">
            <div>Temperature</div>
            <div className="mapReferInnerBox d-flex" style={{ flexDirection: "column" }}>
              {colorArray.map((item, idx) => (
                <div className="d-flex align-items-center" style={{ fontSize: "12px" }} key={`symbol_container_${idx}`}>
                  <div className="circleSymbol" style={{ backgroundColor: item.color, marginRight: "8px" }}></div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </MapContainer>
      <div style={{ position: "fixed", top: "10px", right: "8px", width: "32px", height: "32px", zIndex: "1000" }}>
        <Button
          fill="text"
          icon="sliders-v-alt"
          variant="secondary"
          tooltip="Adjust geo-fence size"
          onClick={() => {
            setShowControl(!showControl);
          }}
        />
      </div>
      <div
        style={{
          height: props.height - 64,
          maxHeight: "300px",
          position: "fixed",
          top: "52px",
          right: "10px",
          zIndex: "1000",
          visibility: showControl ? "visible" : "hidden",
        }}
      >
        <Slider
          className="geo-fence-slider"
          size="small"
          defaultValue={props.showRanch ? 4500 : 70}
          min={0}
          max={props.showRanch ? 10000 : 100}
          aria-label="Small"
          valueLabelDisplay="auto"
          orientation="vertical"
          onChange={(event, value) => {
            event.preventDefault();
            setGeoRadius(value);
          }}
        />
      </div>
    </div>
  );
};

export default GeoFence;
