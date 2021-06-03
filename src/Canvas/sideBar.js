import React from "react";
import './sideBar.css';
class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount = ()=>{
        this.props.sidebarWidth(document.getElementById("sidebar-wrapper").clientWidth);
        console.log(document.getElementById("sidebar-wrapper").clientWidth," = width");
    }

    render(){
        return(
            <div id="wrapper" class="toggled">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand"> <a href="#"> Start Bootstrap </a> </li>
                    <li> <a href="#">Dashboard</a> </li>
                    <li> <a href="#">Shortcuts</a> </li>
                    <li> <a href="#">Overview</a> </li>
                    <li> <a href="#">Events</a> </li>
                    <li> <a href="#">About</a> </li>
                    <li> <a href="#">Services</a> </li>
                    <li> <a href="#">Contact</a> </li>
                </ul>
            </div> 
        </div> 
        );
    };
}

export default Sidebar;