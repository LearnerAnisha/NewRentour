import React, { useEffect } from "react";
import CollectionCard from "./Components/CollectionCard";
import NewArrivals from "./Components/NewArrivals";
import VideoBox from "./Components/VideoBox";
import AOS from "aos";  // Import AOS
import "aos/dist/aos.css";  // Import AOS styles

const HomePage = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000, // animation duration (in ms)
            once: true,     // animation happens only once
        });
    }, []);

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
                <div className="flex flex-col w-full">
                    <h2 className="text-xl sm:text-3xl underline font-semibold mb-6 sm:mb-12 tracking-wider text-center">COLLECTIONS</h2>
                    <CollectionCard />
                </div>
            </div>
        </>
    );
};

export default HomePage;
