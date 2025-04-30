import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { z } from "zod";

import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../GlobalState/AuthContext";
import Login from "./Login";
import Signup from "./SignUp";

const fullNameSchema = z.string()
    .min(5, "Full Name must include at least first and last name")
    .regex(/\s+/, "Full Name must include at least a space between first and last name");

const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

const signUpSchema = z.object({
    name: fullNameSchema,
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: passwordSchema,
});

const signInSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: passwordSchema,
});

const AuthForm = () => {
    const api = `${import.meta.env.VITE_API_BASE_URL}/auth`
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const notify = (error) => toast(`${error}`);

    const validateField = (name, value) => {
        const schema = isSignUp ? signUpSchema : signInSchema;
        const result = schema.safeParse({ ...formData, [name]: value });
        if (result.success) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        } else {
            const formattedErrors = result.error.format();
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: formattedErrors[name]?._errors[0] || "",
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();

        const schema = type === "Sign Up" ? signUpSchema : signInSchema;

        // Clear previous confirm password error
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));

        // Check password and confirmPassword match on Sign Up
        if (type === "Sign Up" && formData.confirmPassword !== formData.password) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            setTouched((prev) => ({
                ...prev,
                confirmPassword: true,
            }));
            return; // Stop submission
        }

        const result = schema.safeParse(formData);
        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0] || "",
                username: formattedErrors.username?._errors[0] || "",
                email: formattedErrors.email?._errors[0] || "",
                password: formattedErrors.password?._errors[0] || "",
            });
            setTouched({ name: true, username: true, email: true, password: true });
        } else {
            setErrors({});
            try {
                const dataToSend = formData;
                const endpoint = type === "Sign Up" ? `${api}/signup/` : `${api}/login/`;
                const response = await axios.post(endpoint, dataToSend);
                const data = await response.data;
                console.log("Response data:", response);
                if (type === "Sign Up" && response.status === 201) {
                    setIsSignUp(false);
                    notify("Account created successfully! Please log in.");
                } else if (type === "Sign In" && response.status === 200) {
                    const authToken = data?.tokens?.access || null;
                    const authUser = { name: formData.username };
                    login(authUser, authToken);
                    navigate("/");
                }
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.username?.[0] ||
                    error?.response?.data?.email?.[0] ||
                    error?.response?.data?.message ||
                    error?.message;

                notify(errorMessage);
                console.error("Error:", errorMessage);
            }
        }
    };

    const eyeclass = "text-[13px] sm:text-[15px]"

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
    return (
        <>
            <div className="authbody">
                <div className={`container ${isSignUp ? "active" : ""}`}>

                    {/* SIGN UP FORM */}
                    <div className="auth-container">
                        {isSignUp ? (
                            <Signup
                                handleSubmit={handleSubmit}
                                formData={formData}
                                handleBlur={handleBlur}
                                handleInputChange={handleInputChange}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setIsSignUp={setIsSignUp}
                                errors={errors}
                                touched={touched}
                                eyeclass={eyeclass}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                            />
                        ) : (
                            <Login
                                handleSubmit={handleSubmit}
                                formData={formData}
                                handleBlur={handleBlur}
                                handleInputChange={handleInputChange}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                setIsSignUp={setIsSignUp}
                                errors={errors}
                                touched={touched}
                                eyeclass={eyeclass}
                            />
                        )}
                    </div>

                    {/* TOGGLE SECTION */}
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left text-white">
                                <h1>Welcome Back!</h1>
                                <p className="text">Enter your personal details to use all site features</p>
                                <button onClick={() => setIsSignUp(false)}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right text-white">
                                <h1>Hello, Friend!</h1>
                                <p className="text">Register with your personal details to use all site features</p>
                                <button onClick={() => setIsSignUp(true)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );

};
export default AuthForm;