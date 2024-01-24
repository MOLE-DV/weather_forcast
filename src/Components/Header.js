import react from "react";
import Search from "./Search";

function Header(){
    return (
        <header id="header">
            Weather Forcast
            <Search placeholder="Search"/>
        </header>
    );
}

export default Header;