import Featured from "../../Components/Featured/Featured";
import MenuFeatured from "../../Components/MenuFeatured/MenuFeatured";
import ShopGallery from "../../Components/ShopGallery/ShopGallery";
import Slider from "../../Components/Slider/Slider";
import TestimonialSlider from "../../Components/TestmonialSlider/TestimonialSlider";

export default function Home() {
    return (
        <>
            <main>
                <Slider />
                <Featured />
                <MenuFeatured />
                <TestimonialSlider />
                <ShopGallery />
            </main>
        </>
    );
}