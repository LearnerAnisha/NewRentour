import { useEffect } from "react";
import {
    FiCheckCircle,
    FiUsers,
    FiGlobe,
    FiShield,
    FiSmartphone,
    FiDollarSign,
    FiClock
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="bg-white text-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About <span className="text-gray-700">Rentour</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Revolutionizing electronics rental for students, travelers, and tech enthusiasts
                    </p>
                </div>

                {/* Mission Section with Image */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div data-aos="fade-right">
                        <img 
                            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=987&q=80"
                            alt="Electronics Rental"
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </div>
                    <div data-aos="fade-left">
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            At <span className="font-semibold text-gray-800">Rentour</span>, we're transforming how people access premium electronics. Our mission is to make high-end devices affordable and accessible through our innovative rental platform.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FiCheckCircle className="text-gray-800 text-xl mt-1 mr-3 flex-shrink-0" />
                                <p>Sustainable tech consumption model</p>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-gray-800 text-xl mt-1 mr-3 flex-shrink-0" />
                                <p>Affordable access to latest devices</p>
                            </div>
                            <div className="flex items-start">
                                <FiCheckCircle className="text-gray-800 text-xl mt-1 mr-3 flex-shrink-0" />
                                <p>Flexible rental periods for every need</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div 
                        className="bg-gray-100 p-6 rounded-xl shadow text-center"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <FiUsers className="text-3xl text-gray-800 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">10,000+</h3>
                        <p className="text-gray-600">Happy Customers</p>
                    </div>
                    <div 
                        className="bg-gray-100 p-6 rounded-xl shadow text-center"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <FiSmartphone className="text-3xl text-gray-800 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">500+</h3>
                        <p className="text-gray-600">Devices Available</p>
                    </div>
                    <div 
                        className="bg-gray-100 p-6 rounded-xl shadow text-center"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <FiGlobe className="text-3xl text-gray-800 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">15+</h3>
                        <p className="text-gray-600">Cities Covered</p>
                    </div>
                    <div 
                        className="bg-gray-100 p-6 rounded-xl shadow text-center"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <FiShield className="text-3xl text-gray-800 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">100%</h3>
                        <p className="text-gray-600">Verified Devices</p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-16">
                    <h2 
                        className="text-3xl font-semibold mb-8 text-center"
                        data-aos="fade-up"
                    >
                        Why Choose Rentour?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div 
                            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <FiDollarSign className="text-gray-800 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Cost Effective</h3>
                            <p className="text-gray-700">
                                Save up to 70% compared to buying new. Pay only for the time you actually need the device.
                            </p>
                        </div>
                        <div 
                            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <FiShield className="text-gray-800 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                            <p className="text-gray-700">
                                All devices are professionally inspected, cleaned, and come with warranty coverage.
                            </p>
                        </div>
                        <div 
                            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <FiClock className="text-gray-800 text-xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Flexible Rental</h3>
                            <p className="text-gray-700">
                                Rent for a day, week, or month - with options to extend or return early.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div 
                    className="bg-gray-900 rounded-xl p-8 md:p-12 text-center text-white"
                    data-aos="fade-up"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Smart Renting?</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Join thousands of satisfied customers enjoying premium electronics without the premium price.
                    </p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Browse Available Devices
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
