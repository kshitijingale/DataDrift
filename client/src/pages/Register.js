import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


import { errorMessage, isPasswordValid } from "../helper/helper";

import InputField from "../components/InputField";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: "",
        };

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is not valid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!isPasswordValid(formData.password)) {
            newErrors.password =
                "Password must be 4-15 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                setLoading(true);
                const res = await axios.post(process.env.REACT_APP_URL + 'register', formData);

                localStorage.setItem("loginStatus", true);
                localStorage.setItem("email", res.data?.email);

                toast.success("Login success");
                navigate("/");
            } catch (error) {
                // Handle login error
                console.error("Login failed:", error);
                toast.error(errorMessage(error));
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const status = localStorage.getItem("loginStatus");
        if (status) {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex h-full min-h-screen items-center justify-center">
            <div className="w-full rounded-lg border bg-white shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2 md:space-y-4">
                            <InputField
                                label="Your Name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name || ""}
                            />
                            <InputField
                                label="Your email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email || ""}
                            />
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="****"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password || ""}
                                type="password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                        <p className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account
                            <Link
                                to="/login"
                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;