import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Films from "./pages/Films/Films";
import People from "./pages/People/People";
import Starships from "./pages/Starships/Starships";
import Planets from "./pages/Planets/Planets";

function App() {
    return (
        <Router>
            {/* <div style={{ display: "block", height: "80px" }}></div> */}

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/films" element={<Films />}></Route>
                <Route path="/people" element={<People />}></Route>
                <Route path="/starships" element={<Starships />}></Route>
                <Route path="/planets" element={<Planets />}></Route>

                <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
