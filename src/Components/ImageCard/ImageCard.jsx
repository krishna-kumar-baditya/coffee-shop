import { Box, Card, CardMedia } from "@mui/material";
import "./ImageCard.css";

export default function ImageCard({image}) {
    return (
        <>
            <Card className="cardContainer">
                <Box className="cardMediaWrapper">
                    <CardMedia
                        component="img"
                        className="cardMedia"
                        image={image}
                        alt="card image"
                    />
                </Box>
            </Card>
        </>
    );
}
