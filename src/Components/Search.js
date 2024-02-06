import Underline from "./Underline";

function SearchButton(){
    return (
        <div id="srchButton" onClick={() => {
            localStorage.setItem("cityName", document.getElementById("input").value);
            window.location.reload();
        }}></div>
    );
}

window.onload = ()=>{
    document.getElementById("input").addEventListener('keyup', (e)=>{
        if(e.key === "Enter"){
            localStorage.setItem("cityName", document.getElementById("input").value);
            window.location.reload();
        }
    });
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