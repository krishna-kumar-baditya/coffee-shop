import { Box, Typography } from "@mui/material";
import "./MenuFeatured.css";
import Grid from '@mui/material/Grid';

import coffee1 from "../../assets/coffee-1.png"
import coffee2 from "../../assets/coffee-2.png"
import coffee3 from "../../assets/coffee-3.png"
import coffee4 from "../../assets/coffee-4.png"
import coffee5 from "../../assets/coffee-5.png"
import coffee6 from "../../assets/coffee-6.png"

export default function MenuFeatured() {
    return (
        <>
            <section className="menu-featured">
                <Box className="featured-menu-container">
                    <Box className="featured-menu-title">
                        <Typography variant="h4">OUR POPULAR MENU</Typography>
                    </Box>
                    <Box className='featured-menu-content'>
                        <Grid container spacing={{sm:0,md:8}} rowGap={{xs:7,sm:2,md:2}}>
                            <Grid size={{md:12,lg:6}} className='grid-wrapper'>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee1} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>
                                </Box>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee2} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>
                                </Box>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee3} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{md:12,lg:6}} className='grid-wrapper'>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee4} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>

                                </Box>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee5} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>

                                </Box>
                                <Box className="menu-content-section">
                                    <Box className="menu-icon">
                                        <img src={coffee6} alt="icon" />
                                    </Box>
                                    <Box className="menu-content">
                                        <Typography variant="body1">
                                            Grilled Cheese Sandwich
                                        </Typography>
                                        <Typography variant="body1">
                                            It is produced by grinding roasted
                                            coffee beans, then boiling them.
                                        </Typography>
                                    </Box>
                                    <Box className='menu-price'>
                                        <Typography variant="body1">$10.00</Typography>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </section>
        </>
    );
}
