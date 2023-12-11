    import React, { useEffect, useState } from 'react'
    import { user } from "../Join/Join";
    import socketIo from "socket.io-client";
    import "./Chat.css";
    import sendLogo from "../../images/send.png";
    import Message from "../Message/Message";
    import ReactScrollToBottom from "react-scroll-to-bottom";
    import closeIcon from "../../images/closeIcon.png";

    let socket;

    const ENDPOINT = "http://localhost:4500";

    const Chat = () => {
        const [id, setid] = useState("");
        const [messages, setMessages] = useState([])

        const send = () => {
            const message = document.getElementById('chatInput').value;
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = "";
        }

        console.log(messages);
        useEffect(() => {
            socket = socketIo(ENDPOINT, { transports: ['websocket'] });

            socket.on('connect', () => {
                alert('Connected');
                setid(socket.id);

            })
            console.log(socket);
            socket.emit('joined', { user })

            socket.on('welcome', (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message);
            })

            socket.on('userJoined', (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message);
            })

            socket.on('leave', (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message)
            })

            return () => {
                socket.emit('disconnect');
                socket.off();
            }
        }, [])
           // ...

let data;
useEffect(() => {
    socket.on('sendMessage', (data) => {
        console.log(data.user, data.message, data.id);
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
        socket.off();
    }
}, [messages]);

        //setMessages((prevMessages) => [...prevMessages, data]);
        return (
            <div className="chatPage">
                <div className="chatContainer">
                    <div className="header">
                        <h2>Yuppy!!</h2>
                        <a href="/"> <img src={closeIcon} alt="Close" /></a>
                    </div>
                    <ReactScrollToBottom className="chatBox">
    {messages.map((item, i) => (
        <Message
        key={i}
        user={item?.id === id ? '' : item?.user}
        message={item?.message}
        classs={item?.id === id ? 'right' : 'left'}
        />
    ))}
    </ReactScrollToBottom>


                    <div className="inputBox">
                        <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                        <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                    </div>
                </div>

            </div>
        )
    }

    export default Chat
