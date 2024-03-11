import Underline from "./Underline";
import cities from '../cities.json';

function SearchButton(){
    return (
        <div id="srchButton" onClick={() => {
            localStorage.setItem("cityName", document.getElementById("input").value);
            window.location.reload();
        }}></div>
    );
}

async function sleep(s){
    return new Promise(resolve=>setTimeout(resolve, s * 1000));
}

window.onload = ()=>{
    document.getElementById("input").addEventListener('keypress', async (e)=>{
        let hm = 0, cm = 0;
        let input  = document.getElementById("input").value;
        cities.forEach((city) =>{
            input.split('').forEach((letter) =>{
                console.log(city.name.split('').find((l)=>{
                    return l == letter;
                }));
            })
            console.log(`Highest ${hm}, Current ${cm}`);
            if(cm > hm) hm = cm;
        })
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
            <input id="input" placeholder={props.placeholder}/>
            <SearchButton />
            <div id="srch_underline"></div>
        </div>
    );
}

export default Search;