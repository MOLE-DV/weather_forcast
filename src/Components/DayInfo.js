import React, { useState, useEffect } from "react";

function Info(props) {
  return <div id="info">{props.data}</div>;
}

function DayInfo(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getPropData = async () => {
      setData(await props.data);
    };
    getPropData();
  });

  if (!data || !data.current) {
    return null;
  }

  const dataSchema = {
    "🌡️Temperature": `${data.current.temp_c} °C`,
    "🌀Pressure": `${data.current.pressure_mb} mBar`,
    "🌤️Weather": `${data.current.condition.text}`,
    "🍃Wind Speed": `${data.current.wind_kph} km/h`,
    "💦Humidity": `${data.current.humidity} %`,
    "☁️Cloudiness": `${data.current.cloud} %`,
  };

  return (
    <div
      id="dayInfo"
      className="infoWindow"
      style={{
        width: props.width,
        height: props.height,
        left: props.positionX,
        backgroundColor: `rgba(0, 0, 0, ${props.opacity})`,
      }}
    >
      <h1 className="infoTitle">
        {data.location.name !== undefined
          ? `${data.location.name} ${data.location.region} ${data.location.country}`
          : data.current.condition.text == "debug"
          ? "Test City"
          : "Error"}
      </h1>
      {data &&
        data.current &&
        Object.entries(dataSchema).map((key) => {
          return <Info data={`${key.toString().replace(",", ": ")}`} />;
        })}
    </div>
  );
}

export default DayInfo;
