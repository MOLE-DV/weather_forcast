import react from "react";
import Search from "./Search";

function Menu(){
    return (
        <div id="menu" className="hoverable"></div>
    );
}

function Header(){
    return (
        <header id="header">
            <Menu/>
            <Search placeholder="Search"/>
        </header>
    );
}

export default Header;