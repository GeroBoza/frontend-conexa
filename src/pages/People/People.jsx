import React, { useState } from "react";

import { Avatar, DialogContentText, Grid, Typography } from "@mui/material";
import { ApiService } from "../../services/ApiService";

import ListLayout from "../ListLayout/ListLayout";
import DataCard from "../../components/DataCard/DataCard";
import ListsModalContent from "../../components/ListsModalContent/ListsModalContent";

const People = () => {
    const [people, setPeople] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [favouriteList, setFavouriteList] = useState(
        JSON.parse(localStorage.getItem("peopleFavs")) || []
    );

    const handleClickCard = (evt) => {
        setSelectedItem(evt);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
            setItems={setPeople}
            getDataFunction={ApiService.getAllPeople}
            getDataByNameFunction={ApiService.getPeopleByName}
            favouriteList={favouriteList}
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
                            peopleId={getPeopleId(p.url)}
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
