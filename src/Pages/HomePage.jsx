import React, { useEffect } from "react";
import CollectionCard from "./Components/CollectionCard";
import NewArrivals from "./Components/NewArrivals";
import VideoBox from "./Components/VideoBox";
import AOS from "aos";
import "aos/dist/aos.css";
import WhyUs from "./Components/WhyUs";
import Testimonials from "./Components/Testimonials";

const HomePage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    // updated
    return (
        <>
            {/* VideoBox component without scroll animation */}
            <div>

                <VideoBox />
            </div>

            {/* NewArrivals component with scroll animation */}
            <div data-aos="fade-up" data-aos-delay="200">
                <NewArrivals />
            </div>



            {/* CollectionCard component with scroll animation */}
            <div data-aos="fade-up" data-aos-delay="400">
                <CollectionCard />
            </div>

            {/* Why Choose RenTour Section */}
            <WhyUs />

            {/* Testimonials Section - Animations Removed */}
            <Testimonials />
        </>
    );
};

export default HomePage;