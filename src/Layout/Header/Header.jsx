import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Toolbar, Box } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slice/authSlice";
import toast from "react-hot-toast";

import "./Header.css";
import header_logo from "../../assets/white_on_trans.png";

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [fix, setFix] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* ✅ ADMIN AUTH STATE */
    const { isLogin } = useSelector((state) => state.authKey);
    /* ✅ USER AUTH STATE */
    // const { isUserLoggedIn } = useSelector((state) => state.userAuthKey);
    const cartItems = useSelector((state) => state.cartKey?.items || []);

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    /* ✅ SCROLL FIX */
    useEffect(() => {
        const navbarFix = () => {
            setFix(window.scrollY > 300);
        };

        window.addEventListener("scroll", navbarFix);
        return () => window.removeEventListener("scroll", navbarFix);
    }, []);

    const handleUserLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
    };

    const pages = [
        { name: "Home", route: "/" },
        { name: "Products", route: "/products" },
        { name: "AboutUs", route: "/aboutus" },
        { name: "ContactUs", route: "/contact" },
    ];

    return (
        <header>
            <AppBar className={fix ? "header fixed" : "header"}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters className="navbar-container">
                        {/* MOBILE MENU */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                onClick={(e) => setAnchorElNav(e.currentTarget)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={() => setAnchorElNav(null)}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                {pages.map((page) => (
                                    <NavLink key={page.route} to={page.route}>
                                        <MenuItem
                                            onClick={() => setAnchorElNav(null)}
                                        >
                                            {page.name}
                                        </MenuItem>
                                    </NavLink>
                                ))}

                                {!isLogin ? (
                                    <NavLink to="/user/signin">
                                        <MenuItem>Sign In</MenuItem>
                                    </NavLink>
                                ) : (
                                    <MenuItem onClick={handleUserLogout}>
                                        Logout
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>

                        {/* LOGO */}
                        <NavLink to="/" className="navabr-img-container">
                            <img
                                src={header_logo}
                                alt="logo"
                                className="navbar-img"
                            />
                        </NavLink>

                        {/* DESKTOP LINKS */}
                        <Box className="navbar-link-container">
                            {pages.map((page) => (
                                <NavLink
                                    key={page.route}
                                    to={page.route}
                                    className="no-underline font-semibold text-base text-white px-3 py-2"
                                >
                                    {page.name}
                                </NavLink>
                            ))}
                        </Box>
                        {/* CART ICON */}
                        <NavLink to="/cart" className="relative">
                            <IconButton sx={{ color: "#fff" }}>
                                <ShoppingCartIcon />

                                {cartCount > 0 && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "2px",
                                            right: "2px",
                                            backgroundColor: "#ef4444",
                                            color: "white",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            fontSize: "12px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {cartCount > 9 ? "9+" : cartCount}
                                    </span>
                                )}
                            </IconButton>
                        </NavLink>
                        {/* ✅ SIGN IN / LOGOUT */}
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {!isLogin ? (
                                <NavLink
                                    to="/user/signin"
                                    className="no-underline font-semibold text-white px-4 py-2 bg-amber-700 hover:bg-amber-800 rounded-lg"
                                >
                                    Sign In
                                </NavLink>
                            ) : (
                                <button
                                    onClick={handleUserLogout}
                                    className="font-semibold text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg border-none cursor-pointer"
                                >
                                    Logout
                                </button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    );
}
