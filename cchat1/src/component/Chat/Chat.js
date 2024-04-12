    import React, { useEffect, useState } from 'react'
    import { user } from "../Join/Join";// Assuming user is imported from the Join component
    import socketIo from "socket.io-client";
    import "./Chat.css";
    import sendLogo from "../../images/send.png";
    import Message from "../Message/Message";
    import ReactScrollToBottom from "react-scroll-to-bottom";
    import closeIcon from "../../images/closeIcon.png";

    // Declare a global variable for the socket
    let socket;
    
    // Define the server endpoint for the socket connection
    const ENDPOINT = "http://localhost:4500";

    // State to store the user's socket ID and chat messages
    const Chat = () => {
        const [id, setid] = useState("");
        const [messages, setMessages] = useState([])

        // Function to send a message to the server
        const send = () => {
            const message = document.getElementById('chatInput').value;
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = "";
        }

        // Log the current state of messages to the console
        console.log(messages);

        // Effect hook for setting up and cleaning up socket connections
        useEffect(() => {
            // Create a socket connection when the component mounts
            socket = socketIo(ENDPOINT, { transports: ['websocket'] });

            // Event listener for the socket connection
            socket.on('connect', () => {
                setid(socket.id);// Set the user's socket ID in the state

            })
            console.log(socket);

            // Emit a 'joined' event to the server when a user joins the chat
            socket.emit('joined', { user })

            // Event listeners for different server-sent events
            socket.on('welcome', (data) => {
                setMessages([...messages, data]);// Update the state with the received message
                console.log(data.user, data.message);
            })

            socket.on('userJoined', (data) => {
                setMessages([...messages, data]);// Update the state with the received message
                console.log(data.user, data.message);
            })

            socket.on('leave', (data) => {
                setMessages([...messages, data]);// Update the state with the received message
                console.log(data.user, data.message)
            })

            // Cleanup function to disconnect the socket when the component unmounts
            return () => {
                socket.emit('disconnect');// Emit a disconnect event to the server
                socket.off();// Turn off socket event listeners
            }
        }, [])// Empty dependency array ensures this effect runs once when the component mounts
           

let data;

// Effect hook for handling incoming messages
useEffect(() => {
    // Event listener for the 'sendMessage' event from the server
    socket.on('sendMessage', (data) => {
        console.log(data.user, data.message, data.id);
        // Update the state with the received message
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup function to turn off the 'sendMessage' event listener
    return () => {
        socket.off();//Turn off the 'sendMessage' event listener
    }
}, [messages]);// Re-run this effect when the 'messages' state changes


        //setMessages((prevMessages) => [...prevMessages, data]);
        return (
            <div className="chatPage">
                <div className="chatContainer">
                    <div className="header">
                        <h2>Yuppy...!!!</h2>
                        <a href="/"> <img src={closeIcon} alt="Close" /></a>
                    </div>

                     {/* Scrollable container for displaying chat messages */}
                    <ReactScrollToBottom className="chatBox">

    {/* Map over messages and render each as a Message component */}

    {messages.map((item, i) => (
        <Message
        key={i}
        user={item?.id === id ? '' : item?.user}
        message={item?.message}
        classs={item?.id === id ? 'right' : 'left'}
        />
    ))}
    </ReactScrollToBottom>

                    {/* Input box for typing messages */}
                    <div className="inputBox">
                        <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                        {/* Button to send messages */}
                        <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                    </div>
                </div>

            </div>
        )
    }
export default Chat
