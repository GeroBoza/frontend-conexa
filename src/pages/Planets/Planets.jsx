import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import DataModal from "../../components/DataModal/DataModal";

const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);
    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("planetsFavs")) || []
    );

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllPlanets(page);
        setPlanets(res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setOpenLoader(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleClickCard = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const onChangeSearch = async (name) => {
        setOpenLoader(true);
        const res = await ApiService.getPlanetsByName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setPlanets(res.data.results);
        setOpenLoader(false);
    };

    const handleFavouritesButton = (condition) => {
        if (condition === "favs") {
            setPlanets(favouriteList);
        } else {
            getData();
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <ListLayout
            title={"Planets"}
            openLoader={openLoader}
            previousUrl={previousUrl}
            nextUrl={nextUrl}
            getData={getData}
            onChangeSearch={onChangeSearch}
            handleFavouritesButton={handleFavouritesButton}
        >
            {planets.length > 0 ? (
                planets.map((planet) => (
                    <Grid item xs={12} md={6} lg={3} key={planet.name}>
                        <DataCard
                            item={planet}
                            handleClick={handleClickCard}
                            favListName={"planetsFavs"}
                            setFavouriteList={setFavouriteList}
                            favouriteList={favouriteList}
                        >
                            <Typography color="text.secondary">
                                Population:{" "}
                                {parseInt(planet.population).toLocaleString(
                                    "it-IT"
                                )}
                            </Typography>
                            <Typography color="text.secondary">
                                Climate: {planet.climate}
                            </Typography>
                            <Typography color="text.secondary">
                                Terrain: {planet.terrain}
                            </Typography>
                            <Typography color="text.secondary">
                                Films: {planet.films.length}
                            </Typography>
                        </DataCard>
                    </Grid>
                ))
            ) : (
                <Typography
                    variant="h2"
                    color="white"
                    fontFamily={"starjedi"}
                    textAlign={"center"}
                    mt={5}
                >
                    No planets to show
                </Typography>
            )}
            {selectedItem && (
                <DataModal
                    item={selectedItem}
                    open={openModal}
                    handleClose={handleCloseModal}
                ></DataModal>
            )}
        </ListLayout>
    );
};

export default Planets;
