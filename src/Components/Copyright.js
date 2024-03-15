import { Link } from "react-router-dom";
import Circle from "./Circle";
import '../Copyright.css'

function Copyright(){
    return(
        <div id="cop_info">
            <div id="information">
              ©Droplet 2024 created by Maksymilian Olejnik
              <br />
              <br />
              <a href="https://openweathermap.org/api" target="blank_">OpenWeatherApi</a> was used to create this project
              <br />
              <br />
              <Link to='/' id="button">Go Back</Link>
            </div>

            <Circle style={{height: "calc(30vh + 30vw)", width: "calc(30vh + 30vw)", backgroundColor: "#00B706", zIndex: 3, right: "calc(-10vh - 10vw)", bottom: "calc(-20vh - 20vw)"}}/>
            <Circle style={{height: "calc(20vh + 20vw)", width: "calc(20vh + 20vw)", backgroundColor: "#00A806", zIndex: 2, right: "calc(3vh + 3vw)", bottom: "calc(-12vh - 12vw)"}}/>
        </div>
    );
}

export default Copyright;