
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";

import "./TestimonialSlider.css";
import { Box, Typography } from "@mui/material";

import testimonial2 from "../../assets/testimonial-2.png"


export default function TestimonialSlider() {
    return (
        <>
            <Box className="testimonial_container">
                <Box className="testimonial_header">
                    <Typography variant="body1">What Client Says</Typography>
                    <Typography variant="h4">TESTIMONIALS</Typography>
                </Box>
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
                    modules={[Navigation,]}
                    className="testimonialSwiper"
                >
                    <SwiperSlide>
                        <Box className="testimonialslide ">
                            <Box className="testimonialsilde_img">
                                <img
                                    src={testimonial2}
                                    alt="testimonialslide1img"
                                />
                            </Box>
                            <Box className="testimonialslide_content">
                                <Typography variant="body1">
                                    I've been drinking coffee for years and I
                                    can honestly say that coffee is the best
                                    product out there. Coffee has a perfect
                                    taste and it wakes me up in the morning.
                                    It's also really affordable.
                                </Typography>
                                <Typography variant="h3">
                                    Krishna Kumar
                                </Typography>
                            </Box>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box className="testimonialslide ">
                            <Box className="silde_img">
                                <img
                                    src={testimonial2}
                                    alt="testimonialslide1img"
                                />
                            </Box>
                            <Box className="testimonialslide_content">
                                <Typography variant="body1">
                                    I've been drinking coffee for years and I
                                    can honestly say that coffee is the best
                                    product out there. Coffee has a perfect
                                    taste and it wakes me up in the morning.
                                    It's also really affordable.
                                </Typography>
                                <Typography variant="h3">
                                    Krishna Kumar
                                </Typography>
                            </Box>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </>
    );
}
