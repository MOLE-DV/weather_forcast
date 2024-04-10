import Underline from "./Underline";
import React, { useState } from "react";
import codes from '../countries.json';

function Info(props){
    return(
        <div id="info">
            {props.data}
        </div>
    );
}

let infoStack = [];

function addToStack(data){
    infoStack.push(<Info data={data} />)
}

function DayInfo(props){
    if(props.data != undefined && props.data != '' && props.data != 'not_found' && props.data != 'debug'){
        try{
            console.log("⚙️Displaying data...")
            switch(document.querySelectorAll('#info').length == 0){
                case true:
                    addToStack(`Temperature ${(props.data.main.temp - 274.15 + 1).toFixed(1)} °C`);
                    addToStack(`Minimum Temperature ${(props.data.main.temp_min - 274.15 + 1).toFixed(1)} °C`)
                    addToStack(`Maximum Temperature ${(props.data.main.temp_max - 274.15 + 1).toFixed(1)} °C`)
                    addToStack(`Pressure ${props.data.main.pressure} hPa`);
            
                    let rise_hours = new Date(props.data.sys.sunrise * 1000).getHours()
                    let rise_minutes = new Date(props.data.sys.sunrise * 1000).getMinutes()  
            
                    let set_hours = new Date(props.data.sys.sunset * 1000).getHours()
                    let set_minutes = new Date(props.data.sys.sunset * 1000).getMinutes()  
            
                    addToStack(`☀️Sunrise ${rise_hours < 10 ? "0" + rise_hours : rise_hours} : ${rise_minutes < 10 ? "0" + rise_minutes : rise_minutes} `)
                    addToStack(`🌚Sunset ${set_hours < 10 ? "0" + set_hours : set_hours} : ${set_minutes < 10 ? "0" + set_minutes : set_minutes} `)
            
                    addToStack(`Weather: ${props.data.weather[0].main}`);
                    break;
                default: break;
            }

            console.log('✅Displaying succesful!');
        }catch(error){
            console.error(`Coulnd't display weather data ${error}`)
        }
    }

    if(props.data == 'debug'){
        addToStack(<button onClick={() => {localStorage.setItem('debug_weather', 'Clear'); window.location.reload();}}>Set sunny</button>)
        addToStack(<button onClick={() => {localStorage.setItem('debug_weather', 'Clouds'); window.location.reload()}}>Set clouds</button>)
        addToStack(<button onClick={() => {localStorage.setItem('debug_weather', 'Rain'); window.location.reload()}}>Set rain</button>)
    }
   

    return(
        <div id="dayInfo" className="infoWindow" style={{width: props.width, height: props.height, left: props.positionX, backgroundColor: `rgba(0, 0, 0, ${props.opacity})`}}>
            <h1 className="infoTitle" >{
            props.data.name == undefined && props.data != 'debug' ? `"${localStorage.getItem('cityName')}" doesn't exist`
            : props.data == 'debug' ? 'Test City' : `${props.data.name}, ${codes[props.data.sys.country]}`
            }</h1>
            {infoStack.slice(0,infoStack.length)}
        </div>
    );
}

export default DayInfo;