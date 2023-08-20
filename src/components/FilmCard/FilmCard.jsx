import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./styles.scss";

function FilmCard({ film }) {
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="600"
                    image={`covers/episode_${film.episode_id}.jpeg`}
                    alt={film.title}
                    className="card-image"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="card-title"
                    >
                        Episode {film.episode_id} <br></br> {film.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="description"
                    >
                        {film.opening_crawl.substring(0, 250)}...
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default FilmCard;
