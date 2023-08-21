import React, { useEffect, useState } from "react";
import AppLayout from "../AppLayout/AppLayout";
import { ApiService } from "../../services/ApiService";
import FilmCard from "../../components/FilmCard/FilmCard";
import { Grid, Typography } from "@mui/material";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import GenericModal from "../../components/GenericModal/GenericModal";

import "./styles.scss";

const Films = () => {
    const [films, setFilms] = useState([]);
    const [openLoader, setOpenLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const skeletons = [1, 2, 3, 4, 5, 6];
    useEffect(() => {
        async function fetchData() {
            setOpenLoader(true);
            const data = await ApiService.getAllFilms();
            setFilms(data.data.results);
            setOpenLoader(false);
        }

        fetchData();
    }, []);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSelectFilm = (film) => {
        setSelectedFilm(film);
        setOpenModal(true);
    };

    return (
        <AppLayout openLoader={openLoader}>
            <Grid
                container
                spacing={3}
                sx={{
                    padding: "100px 30px 50px",
                }}
            >
                {films.length > 0
                    ? films.map((film) => (
                          <Grid
                              item
                              xs={12}
                              md={6}
                              lg={4}
                              key={film.episode_id}
                              className="filmCard"
                          >
                              <FilmCard
                                  film={film}
                                  handleSelectFilm={handleSelectFilm}
                              ></FilmCard>
                          </Grid>
                      ))
                    : skeletons.map((skeleton) => (
                          <Grid
                              key={skeleton}
                              item
                              xs={12}
                              md={4}
                              className="filmCard"
                          >
                              <SkeletonCard></SkeletonCard>
                          </Grid>
                      ))}
            </Grid>
            {selectedFilm && (
                <GenericModal
                    item={selectedFilm}
                    title={`Episode ${selectedFilm.episode_id} - ${selectedFilm.title}`}
                    open={openModal}
                    handleClose={handleClose}
                >
                    <Grid container>
                        <Grid item xs={12} lg={5} className="modalContent">
                            <img
                                src={`covers/episode_${selectedFilm.episode_id}.jpeg`}
                                alt={selectedFilm.name}
                            />
                        </Grid>
                        <Grid item xs={12} lg={7} xl={6}>
                            <Grid container>
                                <Typography variant="h5" color="initial">
                                    <strong>SYNOPSIS</strong>
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="initial"
                                    sx={{ textAlign: "justify" }}
                                >
                                    {selectedFilm.opening_crawl}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericModal>
            )}
        </AppLayout>
    );
};

export default Films;
