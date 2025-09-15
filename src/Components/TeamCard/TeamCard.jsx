import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./TeamCard.css";
export default function TeamCard({image,title,position}) {
    return (
        <>
            <Card className="teamcardContainer">
                <Box className="card-wrapper">
                    <CardMedia
                        className="team-cardmedia"
                        component="img"
                        image={image}
                        alt="blog card"
                    />
                </Box>
                <Box className="card-icon">
                    <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                    </a>{" "}
                </Box>
                <CardContent className="team-content">
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{position}</Typography>
                </CardContent>
            </Card>
        </>
    );
}
