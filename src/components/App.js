import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { TextField } from "@material-ui/core";
import "../App.scss";

const socket = io.connect("http://localhost:4000");

function App() {
  return <div className="App">From React component</div>;
}

export default App;
