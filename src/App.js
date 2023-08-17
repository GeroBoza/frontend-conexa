import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Films from "./pages/Films/Films";

function App() {
    return (
        <Router>
            {/* <div style={{ display: "block", height: "80px" }}></div> */}

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/films" element={<Films />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
