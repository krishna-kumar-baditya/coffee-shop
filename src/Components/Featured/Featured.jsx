import { Box, Typography } from "@mui/material";
import "./Featured.css";
import feature_image from "../../assets/feature-image.png"

export default function Featured() {
    return (
        <>
            <section className="featured-section">
                <Box className="featured-container">
                    <Box className="featured-header">
                        <Typography variant="body1">Popular Item</Typography>
                        <Typography variant="h3">
                            COFFEE BUILD YOUR BASE.
                        </Typography>
                    </Box>
                    <Box className="featured-content-section">
                        <Box className="featured-1 reverse">
                            <Box className="featured-content">
                                <Typography variant="h4">CROISSANT</Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">FRENCH TOAST

                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">PANCAKES
                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">CHOCOLATE</Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="featured-2">
                            <img src={feature_image} alt="featured_image" />
                        </Box>
                        <Box className="featured-1">
                            <Box className="featured-content">
                                <Typography variant="h4">TURKISH COFFEE
                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">COFFEE TO GO
                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">MORNING COFFEE
                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                            <Box className="featured-content">
                                <Typography variant="h4">ESPRESSO
                                </Typography>
                                <Typography variant="body1">
                                    This is the perfect place to find a nice and
                                    cozy spot to sip some.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </section>
        </>
    );
}
