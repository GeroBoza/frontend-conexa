import React from "react";
import NavBar from "../../components/NavBar/NavBar";

import { Backdrop, CircularProgress } from "@mui/material";
import "./styles.scss";

const AppLayout = ({ openLoader = false, children }) => {
    return (
        <div className="main">
            <NavBar></NavBar>
            {children}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: 3,
                }}
                open={openLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default AppLayout;
