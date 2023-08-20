import React, { useEffect, useState } from "react";

import { Avatar, DialogContentText, Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import DataModal from "../../components/DataModal/DataModal";

const People = () => {
    const [people, setPeople] = useState([]);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [openLoader, setOpenLoader] = useState(false);
    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("peopleFavs")) || []
    );

    const getData = async (page = 1) => {
        setOpenLoader(true);
        const res = await ApiService.getAllPeople(page);
        setPeople(res.data.results);
        console.log(res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setOpenLoader(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleClickCard = (evt) => {
        setSelectedItem(evt);
        setOpenModal(true);
        console.log(evt);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onChangeSearch = async (name) => {
        setOpenLoader(true);
        const res = await ApiService.getPeopleByName(name);

        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setPeople(res.data.results);
        setOpenLoader(false);
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
                            handleClick={handleClickCard}
                            favListName={"peopleFavs"}
                            setFavouriteList={setFavouriteList}
                            favouriteList={favouriteList}
                            hasAvatar={true}
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
            {selectedItem && (
                <DataModal
                    item={selectedItem}
                    open={openModal}
                    handleClose={handleCloseModal}
                >
                    <DialogContentText>
                        Birth year: <strong>{selectedItem.birth_year}</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Eye color: <strong>{selectedItem.eye_color}</strong>
                    </DialogContentText>
                    <DialogContentText>
                        Skin color: <strong>{selectedItem.skin_color}</strong>
                    </DialogContentText>
                </DataModal>
            )}
        </ListLayout>
    );
};

export default People;
