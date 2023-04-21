import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PhotoTable from "./components/PhotoTable";
import { Counter } from "./redux/Counter";

function App() {
  return (
    <div className="App">
      <PhotoTable />
      <Counter />
    </div>
  );
}

export default App;
