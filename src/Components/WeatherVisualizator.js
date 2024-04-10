import React, { useEffect, useState } from "react";
import Circle from "./Circle";

function Box(props) {
    return (
        <div
            className="box"
            style={{
                height: props.height,
                width: props.width,
                backgroundColor: props.color,
                left: props.x,
                top: props.y,
                zIndex: props.renderQueue
            }}
        ></div>
    );
}

function Sun(props) {
    const { rays } = props;
    const [sunRays, setSunRays] = useState([]);

    useEffect(() => {
        const raysArray = [];
        let degrees = 0;
        for (let i = 0; i < rays; i++) {
            raysArray.push(
                <div key={i} style={{ transform: `rotate(${degrees}deg)` }}>
                    <div className="ray"></div>
                </div>
            );
            degrees += 360 / rays;
        }
        setSunRays(raysArray);
    }, [rays]);

    return (
        <div className="sun">
            <h1>{props.degrees}</h1>
            {sunRays}
        </div>
    );
}

function Rain() {
    return (
        <div className="rain">
            <div className="drop" style={{ animation: "goDown 1s linear infinite" }}></div>
            <div className="drop" style={{ animation: "goDown .8s linear infinite", marginLeft: "20%" }}></div>
            <div className="drop" style={{ animation: "goDown .82s linear infinite", marginLeft: "72%" }}></div>
            <div className="drop" style={{ animation: "goDown .78s linear infinite", marginLeft: "98%" }}></div>
        </div>
    );
}

function Cloud(props) {
    const { raining } = props;
    return (
        <div className={props.className} id="goLeft">
            <Box />
            <Circle className="cloudCircle one" />
            <Circle className="cloudCircle two" />
            <Circle className="cloudCircle three" />
            {raining && <Rain />}
        </div>
    );
}

function Sunny(props) {
    return (
        <div id="sunny">
            <Sun rays={10} degrees={props.degrees} />
        </div>
    );
}

function Cloudy(props) {
    return (
        <div id="cloudy">
            <Sun rays={0} degrees={props.degrees} />
            <Cloud className="cloud one" raining={false} />
            <Cloud className="cloud two" raining={false} />
        </div>
    );
}

function Rainy(props) {
    return (
        <div id="rainy">
            <Sun rays={0} degrees={props.degrees} />
            <Cloud className="cloud one" raining={true} />
            <Cloud className="cloud two" raining={true} />
        </div>
    );
}

function WeatherVisualizer(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getPropData = async () => {
            setData(await props.data);
        }
        getPropData();
    })

    if (!data) return null;

    return (
        <div id="weatherVisualizer">
            <Circle className="ground one"/>
            <Circle className="ground two"/>
            {
                data.weather &&
                
                data.weather.map((weather, index) => {
                    const temperature = data.main.temp;
                    const weatherMain = weather.main;

                    switch (weatherMain) {
                        case "Clouds":
                            return <Cloudy key={index} degrees={`${(temperature - 273.15 + 1).toFixed(1)} °C`} />;
                        case "Clear":
                            return <Sunny key={index} degrees={`${(temperature - 273.15 + 1).toFixed(1)} °C`} />;
                        case "Rain":
                            return <Rainy key={index} degrees={`${(temperature - 273.15 + 1).toFixed(1)} °C`} />;
                        default:
                            return null;
                    }
                })
            }
        </div>
    );
}

export default WeatherVisualizer;
