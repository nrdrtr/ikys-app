import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.min.css"
  

function App() {
  return (
    <div className="App">
      <Dashboard />
       
     <Footer/>
    </div>
  );
}

export default App;
