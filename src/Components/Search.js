import Underline from "./Underline";
import cities from '../cities.json';
import countries from '../countries.json';


async function sleep(s){
    return new Promise(resolve=>setTimeout(resolve, s * 1000));
}


function SearchButton(){
    return (
        <div id="srchButton" onClick={() => {
            localStorage.setItem("cityName", document.getElementById("input").value);
            window.location.reload();
        }}></div>
    );
}


function SearchHints(props){
    return (
        <div className="hint">
            {props.text}
        </div>
    )
}



window.onload = ()=>{
    if(localStorage.getItem('cityName') === null || localStorage.getItem('cityName') === undefined) {localStorage.setItem('cityName', 'Rome,it'); window.location.reload();};
    
    if(document.getElementById("input") != undefined){
        document.getElementById("input").addEventListener('keyup', async (e)=>{
       
            let input = document.getElementById("input").value;
            let matches = [];
    

            
    
            if(input != ""){
                cities.forEach((city)=>{
                    if(city.name.toLowerCase().search(input.toLowerCase()) == 0){
                        matches.push([city.name, city.country]);
                    }
                })
            }
    
            let hints = []
    
            document.getElementById('hints').innerHTML = '';
            for(let i = 0; i < 10; i++){
                if(matches[i] != undefined) hints.push(`<button class="hint" onClick="localStorage.setItem('cityName', '`+ matches[i][0] + `, `+ matches[i][1] +`'); window.location.reload();">` + matches[i][0] + `, `+ countries[matches[i][1]] + `</button>`);
            }
    
            document.getElementById('hints').innerHTML = hints.join(' ');
    
            if(e.keyCode === 13){
                let country_code = '';

                switch(input != 'debug_weather'){
                    case true:
                        Object.keys(countries).forEach((country) => {
                            if(input.toLowerCase().includes(countries[country].toLowerCase()) === true) {
                                input = input.toLowerCase().replace(countries[country].toLowerCase(), '').trim();
                                country_code = ', ' + country
                            }
                        })
                        break;
                    default: break;
                }
    
                localStorage.setItem("cityName", input + '' + country_code);
                let weather = document.getElementById("cur_weather").innerText;
                switch(weather){
                    case "Clouds":
                        cloudsGoRight();
                        break;
                    case "Rain":
                        cloudsGoRight();
                        break;
                    default: window.location.reload(); break;
                }
                await sleep(.5);
                window.location.reload();
            }
        });
    }
}




function cloudsGoRight(){
    document.querySelectorAll('.cloud').forEach((e)=>{
        e.setAttribute('id', 'goRight'); 
    })
}

function Search(props){
    return (
        <div id="searchBar">
            <div id="top">
                <input id="input" placeholder={props.placeholder} autoComplete="off"/>
                <SearchButton />
                <div id="srch_underline"></div>
            </div>
            <div id="hints"></div>
        </div>
    );
}

export default Search;