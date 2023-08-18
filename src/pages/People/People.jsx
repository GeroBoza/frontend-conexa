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
    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("peopleFavs")) || []
    );

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllPeople(page);
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

    const onChangeSearch = async (name) => {
        setOpenLoader(true);
        const res = await ApiService.getPeopleFromName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setPeople(res.data.results);
        setOpenLoader(false);
    };

    const handleAddFavourite = (item) => {
        const exists = localStorage.getItem("peopleFavs");
        let favs = [];
        if (exists) {
            favs = JSON.parse(exists);
            const isFavouriteIndex = favs.findIndex(
                (it) => it.url === item.url
            );
            if (isFavouriteIndex > -1) {
                favs.splice(isFavouriteIndex, 1);
                setFavouriteList(favs);
                localStorage.setItem("peopleFavs", JSON.stringify(favs));
                return;
            }
        }
        favs.push(item);
        setFavouriteList(favs);
        localStorage.setItem("peopleFavs", JSON.stringify(favs));
    };

    const handleFavouritesButton = (condition) => {
        if (condition === "favs") {
            setPeople(favouriteList);
        } else {
            getData();
        }
    };

    return (
        <ListLayout
            title={"People"}
            openLoader={openLoader}
            previousUrl={previousUrl}
            nextUrl={nextUrl}
            getData={getData}
            onChangeSearch={onChangeSearch}
            handleFavouritesButton={handleFavouritesButton}
        >
            {people &&
                people.map((p) => (
                    <Grid item xs={12} md={6} lg={3} key={p.name}>
                        <DataCard
                            item={p}
                            title={p.name}
                            handleClick={handleClickCard}
                            handleAddFavourite={handleAddFavourite}
                            favouriteList={favouriteList}
                        >
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
