import React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

import "./skeletonCard.scss";

const SkeletonCard = ({ width = 400, height = 400 }) => {
    return (
        <Box sx={{ marginBottom: "30px" }}>
            <Skeleton
                variant="rectangular"
                width={width}
                height={height}
                sx={{ borderRadius: "1%" }}
            />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Box>
    );
};

export default SkeletonCard;
