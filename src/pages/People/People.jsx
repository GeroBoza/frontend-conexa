import React, { useEffect, useState } from "react";

import { Avatar, DialogContentText, Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import ListsModalContent from "../../components/ListsModalContent/ListsModalContent";

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

    function getPeopleId(url) {
        const regex = /\/(\d+)\/$/;
        const matches = url.match(regex);

        if (matches && matches.length > 1) {
            return parseInt(matches[1]);
        }

        return null;
    }

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
                                Gender: <strong>{p.gender}</strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Height: <strong>{p.height} cm</strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Films: <strong>{p.films.length}</strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Starships: <strong>{p.starships.length}</strong>
                            </Typography>
                            <Typography color="text.secondary">
                                Vehicles: <strong>{p.vehicles.length}</strong>
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
                    <Grid
                        container
                        // display={"flex"}
                        // justifyContent={"space-between"}
                    >
                        <Grid item xs={12} md={4}>
                            <DialogContentText>
                                Birth year:{" "}
                                <strong>{selectedItem.birth_year}</strong>
                            </DialogContentText>
                            <DialogContentText>
                                Eye color:{" "}
                                <strong>{selectedItem.eye_color}</strong>
                            </DialogContentText>
                            <DialogContentText>
                                Skin color:{" "}
                                <strong>{selectedItem.skin_color}</strong>
                            </DialogContentText>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={8}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Avatar
                                alt={selectedItem.name}
                                src={`https://geroboza-bucket.s3.sa-east-1.amazonaws.com/sw/${getPeopleId(
                                    selectedItem.url
                                )}.png`}
                                sx={{
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        </Grid>
                    </Grid>
                </ListsModalContent>
            )}
        </ListLayout>
    );
};

export default People;
