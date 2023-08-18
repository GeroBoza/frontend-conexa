import React, { useState } from "react";
import AppLayout from "../AppLayout/AppLayout";
import { Grid, Typography } from "@mui/material";
import PaginationButtons from "../../components/PaginationButtons/PaginationButtons";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

const ListLayout = ({
    title,
    openLoader,
    previousUrl,
    nextUrl,
    getData,
    children,
}) => {
    const [newPage, setNewPage] = useState(1);
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleButtonClick = (newPage) => {
        setNewPage(newPage);
        getData(newPage);
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
                </Grid>
                {/* {children} */}
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
                              <SkeletonCard width={400} height={200}>
                                  {" "}
                              </SkeletonCard>
                          </Grid>
                      ))}
                <PaginationButtons
                    previousUrl={previousUrl}
                    nextUrl={nextUrl}
                    handleButtonClick={handleButtonClick}
                    newPage={newPage}
                />
            </Grid>
        </AppLayout>
    );
};

export default ListLayout;
