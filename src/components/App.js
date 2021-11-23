import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import "../App.scss";

const username = prompt("What is your username?");

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

export default function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      
    })
  })

  const submit = (e) => {
    e.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };
  return <div>Test</div>;
}
