import React from 'react'
import "./Message.css";

// Destructure the props directly in the function parameters
const Message = ({ user, message, classs }) => {
    // Use a ternary operator to conditionally render the user name
    if (user) {
        return (
             <div className={`messageBox ${classs}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    //Ternary OperatorUsed a ternary operator to conditionally render the user name. 
    //If user is truthy, it displays "user: message", otherwise, it displays "You: message".
    else {
     return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}
export default Message