import React from "react";
import { Button, Grid } from "@mui/material";

import "./styles.scss";

const PaginationButtons = ({
    previousUrl,
    nextUrl,
    handleButtonClick,
    newPage,
}) => {
    return (
        <Grid
            item
            xs={12}
            className="next-prev-buttons"
            display={"flex"}
            justifyContent={"center"}
        >
            <Grid item padding={2}>
                <Button
                    variant="contained"
                    disabled={!previousUrl}
                    onClick={() => handleButtonClick(newPage - 1)}
                >
                    Previous
                </Button>
            </Grid>
            <Grid item padding={2}>
                <Button
                    variant="contained"
                    disabled={!nextUrl}
                    onClick={() => handleButtonClick(newPage + 1)}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default PaginationButtons;
