import React from "react";
import AppLayout from "../AppLayout/AppLayout";
import { Grid, Typography } from "@mui/material";
import "./styles.scss";

const Home = () => {
    return (
        <AppLayout>
            <Grid container className="home">
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                    <Typography
                        className={"home-title"}
                        color="white"
                        fontFamily={"starjedi"}
                    >
                        Welcome to Star Wars APP
                    </Typography>
                </Grid>
            </Grid>
        </AppLayout>
    );
};

export default Home;
