import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { ApiService } from "../../services/ApiService";
import FilmCard from "../../components/FilmCard/FilmCard";
import { Grid } from "@mui/material";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

const Films = () => {
    const [films, setFilms] = useState([]);
    const skeletons = [1, 2, 3, 4, 5, 6];
    useEffect(() => {
        async function fetchData() {
            const data = await ApiService.getAllFilms(1);
            setFilms(data.data.results);
        }

        fetchData();
    }, []);

    console.log(films);

    return (
        <Layout>
            <Grid
                container
                spacing={3}
                sx={{
                    // marginTop: "100px",
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
                              sx={{ display: "flex", justifyContent: "center" }}
                          >
                              <FilmCard film={film}></FilmCard>
                          </Grid>
                      ))
                    : skeletons.map((skeleton) => (
                          <Grid
                              key={skeleton}
                              item
                              xs={12}
                              md={4}
                              sx={{ display: "flex", justifyContent: "center" }}
                          >
                              <SkeletonCard></SkeletonCard>
                          </Grid>
                      ))}
            </Grid>
        </Layout>
    );
};

export default Films;
