import React, { useEffect, useState } from "react";

import { DialogContentText, Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import ListsModalContent from "../../components/ListsModalContent/ListsModalContent";

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

    const handleCloseModal = () => {
        setOpenModal(false);
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
                <ListsModalContent
                    item={selectedItem}
                    open={openModal}
                    handleClose={handleCloseModal}
                >
                    <DialogContentText>
                        Population:{" "}
                        <strong>
                            {parseInt(selectedItem.population).toLocaleString(
                                "it-IT"
                            )}
                        </strong>
                    </DialogContentText>
                    <DialogContentText>
                        Climate: <strong>{selectedItem.climate}</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Terrain: <strong>{selectedItem.terrain}</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Surface water:{" "}
                        <strong>{selectedItem.surface_water}%</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Rotation period:{" "}
                        <strong>{selectedItem.rotation_period} hs</strong>
                    </DialogContentText>
                </ListsModalContent>
            )}
        </ListLayout>
    );
};

export default Planets;
