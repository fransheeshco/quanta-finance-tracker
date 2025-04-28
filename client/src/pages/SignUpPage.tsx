import React from 'react'
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer'
import "../styles/signup.css"

function SignUpPage() {
    return (
        <>
            <section className="custom-bg-login">
                <div className="flex flex-row items-start justify-between container mx-auto px-4 pt-10">
                    <div className="flex flex-col justify-between">
                        <div className="quanta-text mt-12 flex items-center">
                            QUANTA
                        </div>
                        <div className="tag-line flex items-center">
                            Your finances, your <br />
                            future—organized.
                        </div>
                    </div>

                    <div className="flex flex-col justify-between min-h-full mt-12 w-140 px-6 py-6 lg:px-8 border rounded-xl login-form-border">
                        <h1 className="text-3xl">Get Started with Quanta!</h1>
                        <form action="#" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="firstname" className="block text-sm/6 font-medium text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="firstname"
                                        required
                                        autoComplete="firstname"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="lastname"
                                        required
                                        autoComplete="lastname"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
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

                        <div>
                            <p className="mt-10 text-center text-sm/6">
                            Already have an account?{" "}
                            <NavLink to="/login" className={"text-purple-700 no-underline hover:underline"}>
                                Login.
                            </NavLink>
                            </p>                        
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>

        </>


    )
}

export default SignUpPage