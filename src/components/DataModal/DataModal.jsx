import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";

import "./styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DataModal({ item, open, handleClose, children }) {
    function getFilmId(url) {
        const regex = /\/(\d+)\/$/;
        const matches = url.match(regex);

        if (matches && matches.length > 1) {
            return parseInt(matches[1]);
        }

        return null;
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{item.name}</DialogTitle>
                <DialogContent>
                    <Grid container display={"flex"} justifyContent={"center"}>
                        <Grid item xs={12}>
                            {children}
                            <DialogContentText>Movies:</DialogContentText>
                        </Grid>
                        {item.films.map((film) => (
                            <Grid
                                key={film}
                                item
                                lg={4}
                                md={6}
                                sm={12}
                                display={"flex"}
                                justifyContent={"center"}
                                mt={3}
                            >
                                <img
                                    width={"250px"}
                                    height={"350px"}
                                    style={{
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                    }}
                                    src={`covers/episode_${getFilmId(
                                        film
                                    )}.jpeg`}
                                    // src={`covers/episode_1.jpeg`}
                                    alt={film.name}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DataModal;
