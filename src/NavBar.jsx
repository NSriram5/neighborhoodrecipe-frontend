import React from "react";
import { NavLink } from 'react-router-dom'
import "./Navigation.css"

//Accepts an array of objects called links. Each link has a string title, a string link, and an optional onClick function
function Navbar({links}) {
    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">NeighborhoodRecipe</NavLink>
            <ul className="navbar-nav ms-auto">
                {links.map(link=>{
                    return(
                        <li key={link.title} className="nav-item mr-4">
                            <NavLink className="nav-link" to={link.link} onClick={link.onClick?link.onClick:()=>0}>
                                {link.title}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            </div>
        </nav>
    );
}
export default Navbar;