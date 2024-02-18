import React, { useState } from "react";
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip, Popup } from "react-leaflet";
import { calculateAverage } from "../service/utility-service";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { Button } from "@grafana/ui";

const StatusMap = (props) => {
  const [showControl, setShowControl] = useState(false);
  const [geoRadius, setGeoRadius] = useState(150000);
  const center = [53.336691, -111.565955];
  const fillOptions = [
    { color: "#73BF69", fillOpacity: 0.3, weight: 1 },
    { color: "#5794F2", fillOpacity: 0.3, weight: 1 },
    { color: "#E0B400", fillOpacity: 0.3, weight: 1 },
    { color: "#FA6400", fillOpacity: 0.3, weight: 1 },
    { color: "#F2495C", fillOpacity: 0.3, weight: 1 },
    { color: "#8F3BB8", fillOpacity: 0.3, weight: 1 },
  ];
  const fillRanchOptions = [
    { color: "#73BF69", fillOpacity: 0.1, weight: 1 },
    { color: "#5794F2", fillOpacity: 0.1, weight: 1 },
    { color: "#E0B400", fillOpacity: 0.1, weight: 1 },
    { color: "#FA6400", fillOpacity: 0.1, weight: 1 },
    { color: "#F2495C", fillOpacity: 0.1, weight: 1 },
    { color: "#8F3BB8", fillOpacity: 0.1, weight: 1 },
  ];

  return (
    <div style={{ position: "relative" }}>
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} style={{ height: props.height, width: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {props.value.map((item, idx) => (
          <Circle
            center={[calculateAverage(item?.data.map((item) => item?.latitude)), calculateAverage(item?.data.map((item) => item?.longitude))]}
            pathOptions={fillRanchOptions[idx]}
            radius={geoRadius}
            key={`RanchCircle_${item?.id}`}
          >
            <Tooltip direction="bottom" offset={[0, 60]} opacity={1}>
              Ranch: {item?.id}
              <br />
              Total Animal Count: {item?.data?.length}
              <br />
              Latitude: {calculateAverage(item?.data.map((item) => item?.latitude))}
              <br />
              Longitude: {calculateAverage(item?.data.map((item) => item?.longitude))}
            </Tooltip>
            <Popup>
              <Link to={`/dashboard/${item?.id.replace(/ /g, "_")}`}>{item?.id} dashboard</Link>
            </Popup>
          </Circle>
        ))}
        {props.value.map((item, idx) =>
          item?.data.map((itemData) => (
            <CircleMarker
              center={[itemData?.latitude, itemData?.longitude]}
              pathOptions={fillOptions[idx]}
              radius={6}
              key={`circle-maker-${item?.id}-${itemData?.animal_id}`}
            >
              <Tooltip direction="bottom" offset={[10, 10]} opacity={1}>
                Ranch: {itemData?.ranch_id}
                <br />
                Animal ID: {itemData?.animal_id}
                <br />
                Latitude: {itemData?.latitude}
                <br />
                Longitude: {itemData?.longitude}
              </Tooltip>
              <Popup>
                <Link to={`/detail/${itemData?.ranch_id.replace(/ /g, "_")}/${itemData?.animal_id}`}>
                  {itemData?.ranch_id}: Animal {itemData?.animal_id}
                </Link>
              </Popup>
            </CircleMarker>
          ))
        )}
        <div style={{ position: "fixed", bottom: "8px", left: "8px", zIndex: "1000" }}>
          {props.value.map((item, idx) => (
            <div className="mapReferBox" key={`status_refer_${item?.id}`}>
              <div>{item?.id}</div>
              <div className="mapReferInnerBox">
                <div className="circleSymbol" style={{ backgroundColor: fillRanchOptions[idx].color, opacity: "0.1" }}></div>
              </div>
            </div>
          ))}
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
          defaultValue={150000}
          min={0}
          max={500000}
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

export default StatusMap;
