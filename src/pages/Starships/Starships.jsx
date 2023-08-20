import React, { useEffect, useState } from "react";

import { DialogContentText, Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import ListsModalContent from "../../components/ListsModalContent/ListsModalContent";

const Starships = () => {
    const [starships, setStarships] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);
    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("starshipsFavs")) || []
    );

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllStarships(page);
        setStarships(res.data.results);
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
        const res = await ApiService.getStarshipsByName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setStarships(res.data.results);
        setOpenLoader(false);
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
                            handleClick={handleClickCard}
                            favListName={"starshipsFavs"}
                            setFavouriteList={setFavouriteList}
                            favouriteList={favouriteList}
                        >
                            <Typography color="text.secondary">
                                Passengers:{" "}
                                <strong>{starship.passengers}</strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Cargo capacity:{" "}
                                <strong>
                                    {parseInt(
                                        starship.cargo_capacity
                                    ).toLocaleString("it-IT")}{" "}
                                    kg
                                </strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Max speed:{" "}
                                <strong>
                                    {parseInt(
                                        starship.max_atmosphering_speed
                                    ).toLocaleString("it-IT")}{" "}
                                    m/h
                                </strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Films: <strong>{starship.films.length}</strong>
                            </Typography>
                        </DataCard>
                    </Grid>
                ))}

            {selectedItem && (
                <ListsModalContent
                    item={selectedItem}
                    open={openModal}
                    handleClose={handleCloseModal}
                >
                    <DialogContentText>
                        Crew: <strong>{selectedItem.crew}</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Length: <strong>{selectedItem.length} mts</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Max speed:{" "}
                        <strong>
                            {parseInt(
                                selectedItem.max_atmosphering_speed
                            ).toLocaleString("it-IT")}{" "}
                            m/h
                        </strong>
                    </DialogContentText>
                    <Typography color="text.secondary">
                        Cargo capacity:{" "}
                        <strong>
                            {parseInt(
                                selectedItem.cargo_capacity
                            ).toLocaleString("it-IT")}{" "}
                            kg
                        </strong>
                    </Typography>
                </ListsModalContent>
            )}
        </ListLayout>
    );
};

export default Starships;
