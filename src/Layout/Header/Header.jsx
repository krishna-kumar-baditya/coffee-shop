import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import { ListItem, ListItemText } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useState } from "react";

import "./Header.css";
import header_logo from "../../assets/white_on_trans.png";

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const [fix, setFix] = useState(false);

    const pages = [
        {
            name: "Home",
            route: "/",
        },
        {
            name: "Products",
            route: "/products",
        },
        {
            name: "AboutUs",
            route: "/aboutus",
        },
        {
            name: "ContactUs",
            route: "/contact",
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    function navbarFix() {
        if (window.scrollY > 300) {
            setFix(true);
        } else {
            setFix(false);
        }
    }
    window.addEventListener("scroll", navbarFix);

    return (
        <header>
            <AppBar className={fix ? "header fixed" : "header"}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters className="navbar-container">
                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                            }}
                            className="sidebar"
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
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
                                sx={{ display: { xs: "block", md: "none" } }}
                                className=" p-3"
                            >
                                {pages.map((page) => (
                                    <NavLink
                                        key={page.route}
                                        to={page.route}
                                        className="font-semibold text-base  px-3 py-2 no-underline"
                                    >
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography >
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>

                        <Box className="navabr-img-container">
                            <NavLink to="/">
                                <img
                                    src={header_logo}
                                    alt="logo"
                                    className="navbar-img"
                                />
                            </NavLink>
                        </Box>
                        <Box className="navbar-link-container">
                            <Box className="navbar-links">
                                {pages.map((page) => (
                                    <NavLink
                                        key={page?.route}
                                        to={page?.route}
                                        className=" no-underline font-semibold text-base text-[#fff] px-3 py-2"
                                    >
                                        {page?.name}
                                    </NavLink>
                                ))}
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    );
}
