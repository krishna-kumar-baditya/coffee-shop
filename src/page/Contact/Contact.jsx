import "./Contact.css";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import { useForm } from "react-hook-form";
import ContactImg  from "../../assets/contact.png"
import toast from "react-hot-toast";
export default function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        
        toast.success("Form submitted");
    };
    return (
        <>
            <Box className="contact-container">
                <Box className="contact">
                    <Box className="contact-address">
                        <Box className="contact-icon">
                            <img
                                src={ContactImg}
                                alt="hotel"
                                className="contact-img"
                            />
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnOutlinedIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="123 Pall Mall, London England" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <MailOutlineOutlinedIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="info@example.com" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocalPhoneSharpIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="+1 35 776 859 000" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box className="contact-form" >
                        <Box className="contact-heading">
                            <Typography variant="h4">
                                Enter Your Details
                            </Typography>
                            <Typography variant="body1">
                                Get In Touch
                            </Typography>
                        </Box>
                        <Box className="form" component={"form"} onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                type="text"
                                placeholder="Enter Your Name"
                                variant="outlined"
                                {...register("name", {
                                    required: "Enter your name",
                                })}
                            />
                                <span style={{ color: "red" }}>
                                    {errors.name?.message}
                                </span>
                            <TextField
                                type="email"
                                placeholder="Enter Your Email"
                                variant="outlined"
                                {...register("email", {
                                    required: "Enter your email",
                                })}
                            />
                            <span style={{ color: "red" }}>
                                {errors.email?.message}
                            </span>

                            <TextField
                                type="textarea"
                                multiline
                                rows={4}
                                placeholder="Write Your Message Here"
                                variant="outlined"
                                {...register("message", {
                                    required: "Enter your message",
                                })}
                            />
                                <span style={{ color: "red" }}>
                                    {errors.message?.message}
                                </span>
                            <Button
                                type="submit"
                                variant="contained"
                                className="btn"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className="contact-location">
                    <iframe
                        frameBorder="0"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d172153.33373691145!2d-122.33979800000002!3d47.608715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2sbd!4v1731235037921!5m2!1sen!2sbd"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="map"
                    ></iframe>
                </Box>
            </Box>
        </>
    );
}