import * as React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";

import GenericModal from "../GenericModal/GenericModal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ListsModalContent({ item, open, handleClose, children }) {
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
            <GenericModal
                item={item}
                title={item.name}
                open={open}
                handleClose={handleClose}
            >
                <Grid container display={"flex"} justifyContent={"center"}>
                    <Grid item xs={12}>
                        {children}
                        <DialogContentText>Films:</DialogContentText>
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
                                src={`covers/episode_${getFilmId(film)}.jpeg`}
                                // src={`covers/episode_1.jpeg`}
                                alt={film.name}
                            />
                        </Grid>
                    ))}
                </Grid>
            </GenericModal>
        </div>
    );
}

export default ListsModalContent;
