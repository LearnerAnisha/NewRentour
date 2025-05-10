import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Customer_name: '',
        Customer_email: '',
        Customer_number: '',
        Customer_subject: '',
        Customer_message: ''
    });

    const handleFAQClick = () => {
        navigate('/faqs');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/postreview/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Message sent successfully!");
                setFormData({
                    Customer_name: '',
                    Customer_email: '',
                    Customer_number: '',
                    Customer_subject: '',
                    Customer_message: ''
                });
            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error("Request error:", error);
            alert("Server error. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-800 p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Contact Rentour</h1>
                    <p className="text-gray-300">
                        Our team is here to assist you with any inquiries about our device rentals.
                    </p>
                </div>

                <div className="md:flex">
                    <div className="md:w-2/3 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                    <input
                                        type="text"
                                        name="Customer_name"
                                        value={formData.Customer_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                    <input
                                        type="email"
                                        name="Customer_email"
                                        value={formData.Customer_email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="Customer_number"
                                    value={formData.Customer_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                                    placeholder="+977 98 1234 5678"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                                <select
                                    name="Customer_subject"
                                    value={formData.Customer_subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="rental Inquiry">Rental Inquiry</option>
                                    <option value="technical Support">Technical Support</option>
                                    <option value="billing Question">Billing Question</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="others">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                                <textarea
                                    name="Customer_message"
                                    value={formData.Customer_message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Send Message
                                </button>
                                <p className="ml-4 text-sm text-gray-500">
                                    * Required fields
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="md:w-1/3 bg-gray-50 p-8 border-l border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-gray-200 p-2 rounded-lg">
                                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Our Location</h3>
                                    <p className="text-sm text-gray-600 mt-1">Kathmandu, Nepal</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-gray-200 p-2 rounded-lg">
                                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                                    <p className="text-sm text-gray-600 mt-1">+977 9812345678</p>
                                    <p className="text-xs text-gray-500">(9:00 AM - 6:00 PM, Sunday-Friday)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-gray-200 p-2 rounded-lg">
                                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                                    <p className="text-sm text-gray-600 mt-1">contact@rentour.com</p>
                                </div>
                            </div>

                            <button
                                onClick={handleFAQClick}
                                className="mt-6 inline-block text-sm font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                            >
                                FAQs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
