import React from 'react';
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { GoEye, GoEyeClosed } from 'react-icons/go';

const Login = ({ handleSubmit, formData, handleBlur, handleInputChange, showPassword, setShowPassword, setIsSignUp, errors, touched, eyeclass }) => {
    return (
        <div className="form-container sign-in">
            <form onSubmit={(e) => handleSubmit(e, 'Sign In')}>
                <h1 className='text-[14px] md:text-[18px] mt-[20px] sm:mt-[0px]'>Sign In</h1>
                <div className="social-icons">
                    <a href="http://127.0.0.1:8000/accounts/google/login/" className="icon" aria-label="Sign in with Google"><FaGooglePlusG /></a>
                    {/* <a href="#" className="icon" aria-label="Sign in with Facebook"><FaFacebookF /></a> */}
                    <a href="http://127.0.0.1:8000/social/login/github/" className="icon" aria-label="Sign in with GitHub"><FaGithub /></a>
                    {/* <a href="#" className="icon" aria-label="Sign in with LinkedIn"><FaLinkedinIn /></a> */}
                </div>
                <span>or use your email and password</span>

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

                <div className="relative password-wrapper w-full flex items-center">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="current-password"
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

                <button type="submit">Sign In</button>
                <p className="md:hidden py-4">Don't have an Account yet?
                    <span
                        className='text-blue-500 underline cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSignUp(true);
                        }}>Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
