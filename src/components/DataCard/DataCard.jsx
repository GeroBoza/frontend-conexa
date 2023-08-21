import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Avatar, Grid, Rating } from "@mui/material";

import "./styles.scss";

function DataCard({
    item,
    favouriteList,
    favListName,
    setFavouriteList,
    handleClick,
    children,
    peopleId,
    hasAvatar = false,
}) {
    const checkIfIsFavourite = () => {
        const isFav = favouriteList.findIndex(
            (favItem) => favItem.url === item.url
        );
        if (isFav > -1) {
            return 1;
        }
        return 0;
    };

    const handleAddFavourite = () => {
        const exists = localStorage.getItem(favListName);
        let favs = [];
        if (exists) {
            favs = JSON.parse(exists);
            const isFavouriteIndex = favs.findIndex(
                (it) => it.url === item.url
            );
            if (isFavouriteIndex > -1) {
                favs.splice(isFavouriteIndex, 1);
                setFavouriteList(favs);
                localStorage.setItem(favListName, JSON.stringify(favs));
                return;
            }
        }
        favs.push(item);
        setFavouriteList(favs);
        localStorage.setItem(favListName, JSON.stringify(favs));
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography
                            fontWeight={"bold"}
                            color="text.primary"
                            gutterBottom
                        >
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        display={"flex"}
                        justifyContent={"flex-end"}
                    >
                        <Rating
                            max={1}
                            onChange={handleAddFavourite}
                            value={checkIfIsFavourite()}
                            emptyIcon={
                                <StarBorderIcon
                                    fontSize="inherit"
                                    sx={{ color: "grey" }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={hasAvatar ? 6 : 12}>
                        {children}
                    </Grid>
                    {hasAvatar && (
                        <Grid item xs={6}>
                            <Avatar
                                alt={item.name}
                                src={`${process.env.REACT_APP_IMAGES_URL}/${peopleId}.png`}
                                sx={{
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        </Grid>
                    )}
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleClick(item)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default DataCard;
