import React, { useState, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Types
interface SignupFormValues {
    fullName: string;
    email: string;
    password: string;
    rollNo: string;
    batch: string;
    branch: string;
    course: string;
    phone: string;
    gender: string;
    collegeName: string;
}

interface InputFieldProps {
    id: keyof SignupFormValues;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Reusable Input Field
const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange }) => {
    const collegeOptions = ["SRMS CET & R", "SRMS CET", "SRMS IMS", "SRMS Nursing", "SRMS IPS", "SSVGI", "KCMT", "ANA", "RIMI", "RBMI"];

    return (
        <div className="mt-4 w-full">
            <label htmlFor={id} className="text-white font-semibold block mb-1">{label}</label>
            {id === "collegeName" ? (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-slate-900 text-white p-2 rounded-lg outline-none"
                    required
                >
                    <option value="">Select your college</option>
                    {collegeOptions.map(college => (
                        <option key={college} value={college}>{college}</option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    required
                    placeholder={`Enter your ${label}`}
                    className="w-full mt-1 bg-slate-900 text-white p-2 rounded-lg outline-none"
                />
            )}
        </div>
    );
};

const Signup: React.FC = () => {
    const [values, setValues] = useState<SignupFormValues>({
        fullName: "",
        email: "",
        password: "",
        rollNo: "",
        batch: "",
        branch: "",
        course: "",
        phone: "",
        gender: "",
        collegeName: ""
    });

    const navigate = useNavigate();

    const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const submit = async () => {
        try {
            const isEmpty = Object.values(values).some(val => val.trim() === "");
            if (isEmpty) {
                toast("All fields are mandatory", {
                    type: "error",
                    position: "top-center",
                    autoClose: 4000,
                });
                return;
            }

            // Perform the API call
            const res = await axios.post(
                "http://localhost:3000/api/v2/user/signup",
                values,
                { withCredentials: true }
            );

            // Check the response to ensure message is coming through
            if (res.data && res.data.message) {
                toast(res.data.message, {
                    type: "success",
                    position: "top-center",
                    autoClose: 4000,
                });
            } else {
                toast("Signup successful!", {
                    type: "success",
                    position: "top-center",
                    autoClose: 4000,
                });
            }

            // Navigate to events page
            navigate("/login");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "Signup error";
            toast(errorMessage, {
                type: "error",
                position: "top-center",
                autoClose: 4000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Navbar */}
            <nav className="bg-black/80 backdrop-blur-sm fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <h1 className="text-3xl font-serif font-bold tracking-wider text-white">
                            SPANDAN'25
                        </h1>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-[#ff7559] hover:text-white font-bold text-sm uppercase tracking-widest hover:scale-110 transition-transform">Home</Link>
                            <a href="#theme" className="text-[#ff7559] hover:text-white font-bold text-sm uppercase tracking-widest hover:scale-110 transition-transform">Theme</a>
                            <a href="#events" className="text-[#ff7559] hover:text-white font-bold text-sm uppercase tracking-widest hover:scale-110 transition-transform">Events</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-20" />

            {/* Form Section */}
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-slate-800 w-full max-w-xl rounded-lg p-6 sm:p-8 mt-6 mb-12 shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
                    <hr className="border-slate-700" />
                    <hr className="border-slate-700 my-1" />

                    <InputField id="fullName" label="Full Name" value={values.fullName} onChange={change} />
                    <InputField id="email" label="Email" value={values.email} onChange={change} />
                    <InputField id="rollNo" label="Roll Number" value={values.rollNo} onChange={change} />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputField id="batch" label="Batch" value={values.batch} onChange={change} />
                        <InputField id="branch" label="Branch" value={values.branch} onChange={change} />
                    </div>

                    <InputField id="phone" label="Phone Number" value={values.phone} onChange={change} />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputField id="course" label="Course" value={values.course} onChange={change} />
                        <InputField id="gender" label="Gender" value={values.gender} onChange={change} />
                    </div>

                    <InputField id="password" label="Password" value={values.password} onChange={change} />
                    <InputField id="collegeName" label="College Name" value={values.collegeName} onChange={change} />

                    <button
                        type="button" // Prevents form submission
                        className="w-full bg-[#a22a40] hover:bg-[#ff7559] text-white font-bold py-2 mt-6 rounded transition-all duration-300"
                        onClick={submit}
                    >
                        Sign Up
                    </button>

                    <div className="mt-4 text-center">
                        <span>Already have an account? </span>
                        <Link to="/Login" className="text-blue-400 hover:text-blue-600 font-semibold underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-6 mt-auto border-t border-white/10">
                <p className="text-sm tracking-wide">
                    © {new Date().getFullYear()} SPANDAN'25. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Signup;
