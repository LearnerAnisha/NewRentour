import React, { useEffect } from 'react';
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { GoEye, GoEyeClosed } from 'react-icons/go';

const Signup = ({
    handleSubmit,
    formData,
    handleBlur,
    handleInputChange,
    showPassword,
    setShowPassword,
    setIsSignUp,
    errors,
    touched,
    eyeclass,
    showConfirmPassword,
    setShowConfirmPassword,
}) => {
    // Handle Google Sign-In initialization
    useEffect(() => {
        // Load Google's JavaScript SDK
        const loadGoogleScript = () => {
            // Check if the script is already there
            if (document.getElementById('google-client-script')) {
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.id = 'google-client-script';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = initializeGoogleSignIn;
        };

        // Initialize Google Sign-In button
        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
                    callback: handleGoogleSignIn,
                    auto_select: false,
                });
                
                // Render the Sign In button
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'), 
                    { 
                        type: 'icon', 
                        shape: 'circle',
                        theme: 'outline',
                        size: 'large',
                    }
                );
            }
        };

        loadGoogleScript();

        // Clean up
        return () => {
            const script = document.getElementById('google-client-script');
            if (script) {
                script.remove();
            }
        };
    }, []);

    // Handle the Google Sign-In response
    const handleGoogleSignIn = (response) => {
        // Get the ID token from the response
        const idToken = response.credential;
        
        // Send the token to your backend for verification
        sendTokenToBackend(idToken);
    };

    // Function to send the token to your backend
    const sendTokenToBackend = async (idToken) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/google/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Google authentication successful', data);
            } else {
                console.error('Google authentication failed');
            }
        } catch (error) {
            console.error('Error during Google authentication:', error);
        }
    };

    return (
        <div className="form-container sign-up">
            <form onSubmit={(e) => handleSubmit(e, 'Sign Up')} className=''>
                <h1 className='text-[14px] md:text-[18px]'>Create Account</h1>
                <div className="social-icons">
                    {/* Replace the Google link with a div for Google Sign-In button */}
                    {/* <div id="google-signin-button" className="icon"></div> */}
                    <a href="http://127.0.0.1:8000/accounts/google/login/" className="icon" aria-label="Sign up with Google"><FaGooglePlusG /></a>
                    {/* <a href="#" className="icon" aria-label="Sign up with Facebook"><FaFacebookF /></a> */}
                    <a href="http://127.0.0.1:8000/social/login/github/" className="icon" aria-label="Sign up with GitHub"><FaGithub /></a>
                    {/* <a href="#" className="icon" aria-label="Sign up with LinkedIn"><FaLinkedinIn /></a> */}
                </div>
                <span>or use your email for registration</span>

                <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
                {touched.name && errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
                {touched.username && errors.username && <p className="error">{errors.username}</p>}

                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}

                {/* Password Field */}
                <div className="relative password-wrapper w-full flex items-center">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    <span
                        className="absolute right-2 toggle-password cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <GoEyeClosed className={eyeclass} /> : <GoEye className={eyeclass} />}
                    </span>
                </div>
                {touched.password && errors.password && <p className="error">{errors.password}</p>}

                {/* Confirm Password Field */}
                <div className="relative password-wrapper w-full flex items-center">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    <span
                        className="absolute right-2 toggle-password cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        role="button"
                        tabIndex={0}
                    >
                        {showConfirmPassword ? <GoEyeClosed className={eyeclass} /> : <GoEye className={eyeclass} />}
                    </span>
                </div>
                {touched.confirmPassword && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Sign Up</button>
                <p className="md:hidden py-4"> Already have an Account?
                    <span
                        className='text-blue-500 underline cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSignUp(false);
                        }}>
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;