import React, { useState } from "react";

import { Button, Grid, Typography } from "@mui/material";

import AppLayout from "../AppLayout/AppLayout";
import PaginationButtons from "../../components/PaginationButtons/PaginationButtons";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./styles.scss";

const ListLayout = ({
    title,
    openLoader,
    previousUrl,
    nextUrl,
    getData,
    onChangeSearch,
    handleFavouritesButton,
    children,
}) => {
    const [newPage, setNewPage] = useState(1);
    const [showFavouritesButton, setShowFavouritesButton] = useState(true);
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleButtonClick = (newPage) => {
        setNewPage(newPage);
        getData(newPage);
    };

    const handleChangeSearch = (name) => {
        setShowFavouritesButton(true);
        onChangeSearch(name);
    };

    const favButtons = (title, isFav = "") => {
        return (
            <Button
                variant="contained"
                color="warning"
                onClick={() => {
                    handleFavouritesButton(isFav);
                    setShowFavouritesButton(!showFavouritesButton);
                }}
            >
                {title}
            </Button>
        );
    };

    return (
        <AppLayout openLoader={openLoader}>
            <Grid
                container
                spacing={3}
                sx={{
                    padding: "100px 30px 50px",
                    justifyContent: "center",
                }}
            >
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        color="white"
                        fontFamily={"starjedi"}
                        textAlign={"center"}
                    >
                        {title}
                    </Typography>
                    <Grid item xs={12} md={4} sx={{ margin: "20px auto" }}>
                        <SearchBar
                            onChangeSearch={handleChangeSearch}
                        ></SearchBar>
                    </Grid>
                    <Grid item xs={12} className={"switch-container"} sx={{}}>
                        {showFavouritesButton === true
                            ? favButtons("Ver Favoritos", "favs")
                            : favButtons("Ver todo")}
                    </Grid>
                </Grid>
                {!openLoader
                    ? children
                    : skeletons.map((skeleton) => (
                          <Grid
                              key={skeleton}
                              item
                              xs={12}
                              md={3}
                              sx={{ display: "flex", justifyContent: "center" }}
                          >
                              <SkeletonCard width={345} height={200} />
                          </Grid>
                      ))}
                {showFavouritesButton && (
                    <PaginationButtons
                        previousUrl={previousUrl}
                        nextUrl={nextUrl}
                        handleButtonClick={handleButtonClick}
                        newPage={newPage}
                    />
                )}
            </Grid>
        </AppLayout>
    );
};

export default ListLayout;
