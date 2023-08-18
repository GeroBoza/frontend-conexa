import React, { useEffect, useState } from "react";

import DataCard from "../../components/DataCard/DataCard";

import { Grid, Typography } from "@mui/material";

import { ApiService } from "../../services/ApiService";
import ListLayout from "../ListLayout/ListLayout";

const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllPlanets(page);
        console.log(res.data);
        setPlanets(res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setOpenLoader(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleClickCard = (evt) => {
        console.log(evt);
    };

    const onChangeSearch = async (name) => {
        setOpenLoader(true);
        const res = await ApiService.getPlanetsFromName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setPlanets(res.data.results);
        setOpenLoader(false);
    };

    return (
        <ListLayout
            title={"Planets"}
            openLoader={openLoader}
            previousUrl={previousUrl}
            nextUrl={nextUrl}
            getData={getData}
            onChangeSearch={onChangeSearch}
        >
            {planets &&
                planets.map((p) => (
                    <Grid item xs={12} md={6} lg={3} key={p.name}>
                        <DataCard title={p.name} handleClick={handleClickCard}>
                            <Typography
                                variant="h5"
                                component="div"
                            ></Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Gender: {p.gender} <br />
                                Height: {p.height} <br />
                            </Typography>
                            <Typography variant="body2">
                                Films: {p.films.length}
                            </Typography>
                        </DataCard>
                    </Grid>
                ))}
        </ListLayout>
    );
};

export default Planets;
