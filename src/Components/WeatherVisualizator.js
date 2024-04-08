import React from "react";
import Circle from "./Circle";

function Box(props){
    return (
        <div className="box" style={{height: props.height, width: props.width, backgroundColor: props.color, left: props.x, top: props.y, zIndex: props.renderQueue}}></div>
    );
}

let sunRays = []

function Sun(props){
    let degrees = 0;
    for(var i = 0; i < props.rays; i++){
        sunRays.push(
            <div id="pivot" style={{rotate: `${degrees}deg`}}>
                <div className="ray"></div>
            </div>
        );
        degrees += 360 / props.rays;
    }

    return (
        <div className="sun">
            <h1>{props.degrees}</h1>
            {sunRays.slice(0, sunRays.length)}
        </div>
    );

}

function Rain(props){
    return (
        <div className="rain">
            <div className="drop" style={{animation: "goDown 1s linear infinite"}}></div>
            <div className="drop" style={{animation: "goDown .8s linear infinite", marginLeft: "20%"}}></div>
            <div className="drop" style={{animation: "goDown .82s linear infinite", marginLeft: "72%"}}></div>
            <div className="drop" style={{animation: "goDown .78s linear infinite", marginLeft: "98%"}}></div>
        </div>
    );
}

function Cloud(props){
    let IsRaining = props.raining ?  <Rain/> : '';
    return(
        <div className={props.className} id="goLeft">
            <Box />
            <Circle className="cloudCircle one"/>
            <Circle className="cloudCircle two"/>
            <Circle className="cloudCircle three"/>
            {IsRaining}
        </div>
    );
}



let currentWeather = null;

function Sunny(props){
    return(
        <div id="sunny">
             <Sun rays="10" degrees={props.degrees}/>
        </div>
    );
}

function Cloudy(props){
    return(
        <div id="cloudy">
            <Sun rays="0" degrees={props.degrees}/>
            <Cloud className="cloud one" raining={false}/>
            <Cloud className="cloud two" raining={false}/>
        </div>
    )
}

function Rainy(props){
    return(
        <div id="rainy">
            <Sun rays="0" degrees={props.degrees}/>
            <Cloud className="cloud one" raining={true}/>
            <Cloud className="cloud two" raining={true}/>
            <Cloud className="cloud three" raining={true}/>
            <Cloud className="cloud four" raining={true}/>
            <Cloud className="cloud five"raining={true}/>
        </div>
    )
}
 

function WeatherVisualizer(props){
    let weather = props.data.weather && props.data.weather[0]?.main;


    switch(weather){
        case "Clouds":
            currentWeather = <Cloudy degrees={`${(props.data.main.temp - 274.15 + 1).toFixed(1)} °C`}/>;
            break;
        case "Clear":
            currentWeather = <Sunny degrees={`${(props.data.main.temp - 274.15 + 1).toFixed(1)} °C`}/>;
            break;
        case "Rain":
            currentWeather = <Rainy degrees={`${(props.data.main.temp - 274.15 + 1).toFixed(1)} °C`}/>;
            break;
        default:
            currentWeather = null;
            break;
        
    }

    return (
        <div id="weatherVisualizer">
            <Circle className="ground one"/>
            <Circle className="ground two"/>
            {currentWeather}
        </div>
    );
}

export default WeatherVisualizer;