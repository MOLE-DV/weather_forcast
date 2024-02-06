import React from "react";

function Circle(props){
    return (
        <div className="circle" style={{height: props.radius, width: props.radius, backgroundColor: props.color, left: props.x, top: props.y, zIndex: props.renderQueue}}></div>
    );
}

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
        <div className="sun" style={{height: props.radius, width: props.radius, backgroundColor: props.color, left: props.x, top: props.y, zIndex: props.renderQueue}}>
            {sunRays.slice(0, sunRays.length/2)}
        </div>
    );

}


function Cloud(props){
    return(
        <div className="cloud">
            <Box height={`calc(${props.scale} * calc(2.5vh + 2.5vw))`} width={`calc(${props.scale} * calc(10vh + 10vw))`} color={props.color} x={`calc(${props.x} * ${props.scale})`} y={`calc(${props.y} * ${props.scale})`} renderQueue="2"/>
            <Circle radius={`calc(${props.scale} * calc(5vh + 5vw))`} color={props.color} x={`calc((${props.x} - calc(2.5vh + 2.5vw)) * ${props.scale})`} y={`calc((${props.y} - calc(2.5vh + 2.5vw)) * ${props.scale})`} renderQueue="2"/>
            <Circle radius={`calc(${props.scale} * calc(8vh + 8vw))`} color={props.color} x={`calc((${props.x} + calc(1vh + 1vw)) * ${props.scale})`} y={`calc((${props.y} - calc(5.5vh + 5.5vw)) * ${props.scale})`} renderQueue="2"/>
            <Circle radius={`calc(${props.scale} * calc(5vh + 5vw))`} color={props.color} x={`calc((${props.x} + calc(7.5vh + 7.5vw)) * ${props.scale})`} y={`calc((${props.y} - calc(2.5vh + 2.5vw)) * ${props.scale})`} renderQueue="2"/>
        </div>
    );
}



let currentWeather = <Cloudy />;

function Sunny(){
    return(
        <div id="sunny">
            <Circle radius="calc(30vh + 30vw)" color="#00B706" x="calc(50vh + 50vw)" y="calc(25vh + 25vw)" renderQueue="2"/>
            <Circle radius="calc(20vh + 20vw)" color="#00A806" x="calc(45vh + 45vw)" y="calc(30vh + 30vw)" renderQueue="1"/>
            <Sun radius="calc(10vh + 10vw)" x="calc(40vh + 40vw)" y="calc(10vh + 10vw)" renderQueue="0" rays="10"/>
        </div>
    );
}

function Cloudy(){
    return(
        <div id="cloudy">
            <Circle radius="calc(30vh + 30vw)" color="#00B706" x="calc(50vh + 50vw)" y="calc(25vh + 25vw)" renderQueue="2"/>
            <Circle radius="calc(20vh + 20vw)" color="#00A806" x="calc(45vh + 45vw)" y="calc(30vh + 30vw)" renderQueue="1"/>
            <Sun radius="calc(10vh + 10vw)" x="calc(40vh + 40vw)" y="calc(10vh + 10vw)" renderQueue="0" rays="0"/>
            <Cloud x="calc(55.5vh + 55.5vw)" y="calc(22.5vh + 22.5vw)" color="#BDBDBD" scale=".8" />
            <Cloud x="calc(125vh + 125vw)" y="calc(22.5vh + 22.5vw)" color="#C7C2C2" scale=".3" />
            <Cloud x="calc(125vh + 125vw)" y="calc(22.5vh + 22.5vw)" color="#CDCCCC" scale=".5" />
        </div>
    )
}


function WeatherVisualizer(props){
    return (
        <div id="weatherVisualizer">
            {currentWeather}
        </div>
    );
}

export default WeatherVisualizer;