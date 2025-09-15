import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./ShopGallery.css";
import ImageCard from "../ImageCard/ImageCard";
import gallery1 from "../../assets/gallery-1.jpg";
import gallery2 from "../../assets/gallery-2.jpg";
import gallery3 from "../../assets/gallery-3.jpg";
import gallery4 from "../../assets/gallery-4.jpg";
import gallery5 from "../../assets/gallery-5.jpg";
import gallery6 from "../../assets/gallery-6.jpg";
export default function ShopGallery() {
    return (
        <>
            <Box className="gallery">
                <Box className="gallery-heading">
                    <Typography variant="h3">Coffee Shop Gallery</Typography>
                </Box>
                <Box className="gallery-content">
                    <Grid container>
                        <Grid className="gallery-container">
                            <ImageCard image={gallery1} />
                            <ImageCard image={gallery2} />
                            <ImageCard image={gallery3} />
                            <ImageCard image={gallery4} />
                            <ImageCard image={gallery5} />
                            <ImageCard image={gallery6} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
