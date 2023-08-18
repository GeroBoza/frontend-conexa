import React, { useEffect, useState } from "react";

import DataCard from "../../components/DataCard/DataCard";

import { Grid, Typography } from "@mui/material";

import { ApiService } from "../../services/ApiService";
import ListLayout from "../ListLayout/ListLayout";
import SearchBar from "../../components/SearchBar/SearchBar";

const Starships = () => {
    const [starships, setStarships] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);
    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("starshipsFavs")) || []
    );

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllStarships(page);
        console.log(res.data);
        setStarships(res.data.results);
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
        const res = await ApiService.getStarshipsFromName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setStarships(res.data.results);
        setOpenLoader(false);
    };

    const handleAddFavourite = (item) => {
        const exists = localStorage.getItem("starshipFavs");
        let favs = [];
        if (exists) {
            favs = JSON.parse(exists);
            const isFavouriteIndex = favs.findIndex(
                (it) => it.url === item.url
            );
            if (isFavouriteIndex > -1) {
                favs.splice(isFavouriteIndex, 1);
                setFavouriteList(favs);
                localStorage.setItem("starshipFavs", JSON.stringify(favs));
                return;
            }
        }
        favs.push(item);
        setFavouriteList(favs);
        localStorage.setItem("starshipFavs", JSON.stringify(favs));
    };

    const handleFavouritesButton = (condition) => {
        if (condition === "favs") {
            setStarships(favouriteList);
        } else {
            getData();
        }
    };

    return (
        <ListLayout
            title={"Starships"}
            openLoader={openLoader}
            previousUrl={previousUrl}
            nextUrl={nextUrl}
            getData={getData}
            onChangeSearch={onChangeSearch}
            handleFavouritesButton={handleFavouritesButton}
        >
            {starships &&
                starships.map((starship) => (
                    <Grid item xs={12} md={6} lg={3} key={starship.name}>
                        <DataCard
                            item={starship}
                            title={starship.name}
                            handleClick={handleClickCard}
                            handleAddFavourite={handleAddFavourite}
                            favouriteList={favouriteList}
                        >
                            <Typography color="text.secondary">
                                Passengers: {starship.passengers}
                            </Typography>
                            <Typography color="text.secondary">
                                Cargo capacity: {starship.cargo_capacity}
                            </Typography>
                            <Typography color="text.secondary">
                                Max speed: {starship.max_atmosphering_speed}
                            </Typography>
                            <Typography color="text.secondary">
                                Films: {starship.films.length}
                            </Typography>
                        </DataCard>
                    </Grid>
                ))}
        </ListLayout>
    );
};

export default Starships;
