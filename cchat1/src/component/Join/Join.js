import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

// Declaring a global variable to store the user name
let user;

// Function to handle the user input and store it in the global variable
const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

// Join component function
const Join = () => {
    // State to manage the user's name
    const [name, setname] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                {/* Logo */}
                <img src={logo} alt="logo" />                
                {/* Heading */}
                <h1>Yuppy!!</h1>
                {/* Input for entering the user's name */}
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                {/* Link to navigate to the chat page */}
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat"> 
                {/* Button to initiate login */}
                <button onClick={sendUser} className="joinbtn">Login In</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }//Export: Exporting the global user variable for use in other parts of the application.
