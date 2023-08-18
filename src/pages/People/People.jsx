import React, { useEffect, useState } from "react";

import DataCard from "../../components/DataCard/DataCard";

import { Grid, Typography } from "@mui/material";

import { ApiService } from "../../services/ApiService";
import ListLayout from "../ListLayout/ListLayout";

const People = () => {
    const [people, setPeople] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllPeople(page);
        console.log(res.data);
        setPeople(res.data.results);
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

    return (
        <ListLayout
            title={"People"}
            openLoader={openLoader}
            previousUrl={previousUrl}
            nextUrl={nextUrl}
            getData={getData}
        >
            {people &&
                people.map((p) => (
                    <Grid item xs={12} md={6} lg={3} key={p.name}>
                        <DataCard title={p.name} handleClick={handleClickCard}>
                            <Typography color="text.secondary">
                                Gender: {p.gender}
                            </Typography>
                            <Typography color="text.secondary">
                                Height: {p.height}
                            </Typography>
                            <Typography color="text.secondary">
                                Films: {p.films.length}
                            </Typography>
                            <Typography color="text.secondary">
                                Starships: {p.starships.length}
                            </Typography>
                            <Typography color="text.secondary">
                                Vehicles: {p.vehicles.length}
                            </Typography>
                        </DataCard>
                    </Grid>
                ))}
        </ListLayout>
    );
};

export default People;
