import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

function DataCard({
    title,
    item,
    favouriteList,
    handleAddFavourite,
    handleClick,
    children,
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

    checkIfIsFavourite();
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
                    {title}
                    <Rating
                        max={1}
                        onChange={() => handleAddFavourite(item)}
                        value={checkIfIsFavourite()}
                    />
                </Typography>
                {children}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClick}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default DataCard;
