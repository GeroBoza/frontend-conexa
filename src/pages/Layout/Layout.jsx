import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./layout.scss";

const Layout = ({ children }) => {
    return (
        <div className="main">
            <NavBar></NavBar>
            {children}
        </div>
    );
};

export default Layout;
