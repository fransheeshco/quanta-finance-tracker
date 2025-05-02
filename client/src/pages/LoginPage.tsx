import React from 'react'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom';
import * as Yup from "yup"
import "../styles/loginpage.css"
import { useAuth } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {};

type LoginFormInputs = {
    email: string,
    password: string,
}

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required.")
})

const LoginPage = (props: Props) => {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(validation)
    });

    const handleLogin = (form: LoginFormInputs) => {
        loginUser(form.email, form.password);
    }

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

                    <div className="flex flex-col justify-between min-h-full mt-12 w-140 px-6 py-12 lg:px-8 border rounded-xl login-form-border">
                        <h1 className="text-3xl">Login to your account</h1>
                        <form onSubmit={handleSubmit(handleLogin)} method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder='johndoe@email.com'
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder='********'
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        {...register("password")}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-purple-500 bg-transparent hover:bg-violet-600 px-3 py-1.5 text-sm font-semibold text-violet-600 hover:text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6">
                            Not a member?{' '}
                            <NavLink to="/signup" className={"text-purple-700 no-underline hover:underline"}>
                                Sign Up Now!
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default LoginPage;
