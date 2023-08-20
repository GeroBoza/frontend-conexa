import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Rating } from "@mui/material";

import "./styles.scss";

function DataCard({
    item,
    favouriteList,
    favListName,
    setFavouriteList,
    handleClick,
    children,
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

    function getPeopleId(url) {
        const regex = /\/(\d+)\/$/;
        const matches = url.match(regex);

        if (matches && matches.length > 1) {
            return parseInt(matches[1]);
        }

        return null;
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{
                        fontSize: 17,
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    color="text.primary"
                    gutterBottom
                >
                    {item.name}
                    <Rating
                        max={1}
                        onChange={handleAddFavourite}
                        value={checkIfIsFavourite()}
                    />
                </Typography>
                <Grid container>
                    <Grid item xs={hasAvatar ? 6 : 12}>
                        {children}
                    </Grid>
                    {hasAvatar && (
                        <Grid item xs={6}>
                            <Avatar
                                alt={item.name}
                                src={`https://geroboza-bucket.s3.sa-east-1.amazonaws.com/sw/${getPeopleId(
                                    item.url
                                )}.png`}
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
