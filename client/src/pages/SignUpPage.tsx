import React from 'react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import * as Yup from "yup";
import "../styles/loginpage.css";
import { useAuth } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {};

type RegisterFormInputs = {
    fname: string,
    lname: string,
    email: string,
    password: string,
}

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required."),
    fname: Yup.string().required("First Name is required."),
    lname: Yup.string().required("Last Name is required.")
})

const SignUpPage = (props: Props) => {
    const { registerUser, registrationError } = useAuth(); // Destructure registrationError
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: yupResolver(validation)
    });

    const handleRegister = async (form: RegisterFormInputs) => {
        await registerUser(form.fname, form.lname, form.email, form.password);
        // No need to handle the error here directly, as the registrationError
        // state in the context will be updated. The component will re-render.
    }

    return (
        <>
            <section className="custom-bg-login">
                <div className="flex flex-row items-start justify-between container mx-auto px-4 pt-10">
                    <div className="flex flex-col justify-between">
                        <div className="quanta-text mt-12 flex items-center">QUANTA</div>
                        <div className="tag-line flex items-center">
                            Your finances, your <br />
                            future—organized.
                        </div>
                    </div>

                    <div className="flex flex-col justify-between min-h-full mt-12 w-140 px-6 py-6 lg:px-8 border rounded-xl login-form-border">
                        <h1 className="text-3xl">Get Started with Quanta!</h1>
                        <form onSubmit={handleSubmit(handleRegister)} method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="fname" className="block text-sm/6 font-medium text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fname"
                                        placeholder="John"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                                        {...register('fname')}
                                    />
                                    {errors.fname && <p className="text-red-500 text-sm">{errors.fname.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lname" className="block text-sm/6 font-medium text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lname"
                                        placeholder="Doe"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                                        {...register('lname')}
                                    />
                                    {errors.lname && <p className="text-red-500 text-sm">{errors.lname.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="johndoe@email.com"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                                        {...register('email')}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                                        {...register('password')}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    {registrationError && <p className="text-red-500 text-sm">{registrationError}</p>} {/* Display the registration error here */}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-purple-500 bg-transparent hover:bg-violet-600 px-3 py-1.5 text-sm font-semibold text-violet-600 hover:text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6">
                            Already have an account?{' '}
                            <NavLink to="/login" className="text-purple-700 no-underline hover:underline">
                                Login.
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SignUpPage;