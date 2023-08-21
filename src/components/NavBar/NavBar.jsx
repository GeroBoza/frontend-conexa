import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import "./styles.scss";

const pages = [
    { label: "Films", url: "/films" },
    { label: "People", url: "/people" },
    { label: "Starships", url: "/starships" },
    { label: "Planets", url: "/planets" },
];

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClickMenuItem = (url) => {
        navigate(url);
        handleCloseNavMenu();
    };

    const [navBarStyle, setNavBarStyle] = useState("app-bar");
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY.current) {
                setNavBarStyle("app-bar-background");
            } else if (currentScrollY === 0) {
                setNavBarStyle("app-bar");
            }

            prevScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AppBar position="fixed" className={navBarStyle}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {
                                    xs: "block",
                                    md: "none",
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    onClick={() =>
                                        handleClickMenuItem(page.url)
                                    }
                                >
                                    <Typography
                                        textAlign="center"
                                        className="menu-item-text"
                                        textTransform={"uppercase"}
                                    >
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleClickMenuItem(page.url)}
                                className={page.url === url ? "selected" : ""}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
