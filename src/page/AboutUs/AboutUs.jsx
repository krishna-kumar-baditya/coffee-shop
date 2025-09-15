import { Box, Typography } from "@mui/material";
import "./About.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {  Navigation,Autoplay } from "swiper/modules";


import TeamCard from "../../Components/TeamCard/TeamCard";
import TestimonialSlider from "../../Components/TestmonialSlider/TestimonialSlider";
import ShopGallery from "../../Components/ShopGallery/ShopGallery";
import team1 from "../../assets/team-1.png"
import team2 from "../../assets/team-2.png"
import team3 from "../../assets/team-3.png"
import team4 from "../../assets/team-4.png"

export default function About() {

    return (
        <>
            <Box className="about-container">
                <Box className="about-history">
                    <Box className="about-history-content">
                        <Typography variant="h3">
                            Serving <span>Mountain Coffee </span> Since 1922
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Praesentium dolor nam repudiandae perspiciatis
                            unde, reprehenderit culpa maxime laborum, deleniti
                            error repellendus doloribus delectus hic, voluptate
                            incidunt inventore velit accusantium! Adipisci sunt
                            dicta maxime laborum placeat optio quidem totam
                            impedit ipsum! Id dignissimos iste doloribus sequi
                            excepturi reiciendis saepe quaerat
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Praesentium dolor nam repudiandae perspiciatis
                            unde, reprehenderit culpa maxime laborum, deleniti
                            error repellendus doloribus delectus hic, voluptate
                            incidunt sunt dicta maxime laborum placeat optio
                            quidem totam impedit ipsum! Id dignissimos iste
                            doloribus sequi excepturi reiciendis saepe quaerat,
                            tenetur distinctio minima nostrum sit. Placeat
                            doloribus accusantium eius, eveniet quia sequi.
                        </Typography>
                    </Box>
                </Box>
                <Box className="client-feedback">
                    <TestimonialSlider />
                </Box>
                <Box className="our-team">
                    <Typography variant="h4">Our Awsome Team</Typography>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[ Navigation,]}
                        className="aboutSwiper"
                        breakpoints={{
                            
                            
                            768: {
                                slidesPerView: 2, 
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3, 
                                spaceBetween: 30,
                            },
                            
                        }}
                    >
                        <SwiperSlide>
                            <TeamCard image={team1} title='Mr. Krishna Kumar' position='Manager'/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <TeamCard image={team2} title='Mr. Peter Pan' position='Chairmen' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TeamCard image={team3} title='Mr. Rohit Kumar' position='Marketer' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TeamCard image={team4} title='Mrs. Harika Kumari' position='Head Chef'/>
                        </SwiperSlide>
                    </Swiper>
                </Box>
                <Box className='about-gallery'>
                    <ShopGallery/>
                </Box>
            </Box>
        </>
    );
}