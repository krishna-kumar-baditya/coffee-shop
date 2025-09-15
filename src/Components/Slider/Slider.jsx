
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";

import "./Slider.css";
import slide1 from "../../assets/slide-1.png"
import slide2 from "../../assets/slide-2.png"
import { Box, Typography } from "@mui/material";

export default function Slider() {
    return (
        <>
            <Box className="home-slider">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation, ]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Box className="slide slide1">
                            <Box className="slide_content">
                                <Typography variant="body1">
                                    Black coffee is awesome.
                                </Typography>
                                <Typography variant="h2">
                                    TIME TO DISCOVER COFFEE HOUSE
                                </Typography>
                                <Typography variant="body1">
                                    Experience the decibels like your ears
                                    deserve to.Safe for the ears,very for the
                                    heart.A treat of your ears.
                                </Typography>
                            </Box>

                            <Box className="silde_img">
                                <img
                                    src={slide1}
                                    alt="slide1img"
                                />
                            </Box>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box className="slide slide1">
                            <Box className="slide_content">
                                <Typography variant="body1">
                                    Black coffee is awesome.
                                </Typography>
                                <Typography variant="h2">
                                    TIME TO DISCOVER COFFEE HOUSE
                                </Typography>
                                <Typography variant="body1">
                                    Experience the decibels like your ears
                                    deserve to.Safe for the ears,very for the
                                    heart.A treat of your ears.
                                </Typography>
                            </Box>

                            <Box className="silde_img">
                                <img
                                    src={slide2}
                                    alt="slide1img"
                                />
                            </Box>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </>
    );
}