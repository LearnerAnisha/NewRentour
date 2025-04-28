import React from 'react';

// ContactUs component for the Rentour website
const ContactUs = () => {
    return (
        // Container with padding and centered content (max-width: 3xl)
        <div className="p-8 max-w-3xl mx-auto">

            {/* Page title */}
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

            {/* Introductory paragraph encouraging users to get in touch */}
            <p className="mb-6">
                We'd love to hear from you! Whether you have a question about a device,
                need help with the rental process, or just want to share feedback — feel free to reach out.
            </p>

            {/* Contact form for collecting user messages */}
            <form className="space-y-6">

                {/* Full Name input field */}
                <div>
                    <label className="block text-base font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Email input field */}
                <div>
                    <label className="block text-base font-medium mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Message textarea for longer user input */}
                <div>
                    <label className="block text-base font-medium mb-1">Message</label>
                    <textarea
                        rows="5"
                        placeholder="Write your message here..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-black"
                    ></textarea>
                </div>

                {/* Submit button with custom styling and hover effects */}
                <div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-md transition duration-300 
                       hover:bg-white hover:text-black hover:border hover:border-black"
                    >
                        Send Message
                    </button>
                </div>
            </form>

            {/* Additional contact details section */}
            <div className="mt-10">
                {/* Subheading */}
                <h2 className="text-2xl font-semibold mb-2">Contact Details</h2>

                {/* Address line */}
                <p className="mb-1">📍 Kathmandu, Nepal</p>

                {/* Phone number */}
                <p className="mb-1">📞 +977-9812345678</p>

                {/* Email address */}
                <p>📧 support@rentour.com</p>
            </div>
        </div>
    );
};

export default ContactUs;