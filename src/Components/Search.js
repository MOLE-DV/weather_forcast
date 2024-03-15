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
        for(let i = 0; i < 5; i++){
            if(matches[i] != undefined) hints.push(`<div class="hint" onClick="localStorage.setItem('cityName', '`+ matches[i][0] + `, `+ matches[i][1] +`'); window.location.reload();">` + matches[i][0] + `, `+ countries[matches[i][1]] + `</div>`);
        }

        document.getElementById('hints').innerHTML = hints.join(' ');

        if(e.keyCode === 13){
            localStorage.setItem("cityName", document.getElementById("input").value);
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