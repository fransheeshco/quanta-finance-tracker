import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from '../contexts/authContext';

const HomePageNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useAuth();


    return (
        <section className="h-[45vh] bg-gradient-to-r from-[#A64DFF] to-[#642E99] relative">
            <header className="relative z-10">
                <div className="mx-auto px-4 py-4 flex justify-between items-center relative">
                    <div className="flex items-center">
                        <NavLink to="/home" className="text-white text-4xl ml-24">
                            QUANTA
                        </NavLink>
                    </div>

                    {/* Dropdown */}
                    <div className="relative mr-24">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2 w-[140px] h-[50px] flex justify-center items-center rounded-2xl border border-white hover:bg-[#6A0DAD]"
                        >
                            Menu
                            <svg
                                className="ml-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-100">
                                <div className="px-4 py-3 text-gray-700 text-sm font-semibold border-b">
                                    {user?.email}
                                </div>
                                <div className="py-1">
                                    <NavLink
                                        to="/home"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/accounts"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Accounts
                                    </NavLink>
                                    <NavLink
                                        to="/savings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Savings
                                    </NavLink>
                                    <NavLink
                                        to="/income"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Incomes
                                    </NavLink>
                                    <NavLink
                                        to="/budgets"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Budgets
                                    </NavLink>
                                    <NavLink
                                        to="/categories"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Categories
                                    </NavLink>
                                    <NavLink
                                        to="/expenses"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Expenses
                                    </NavLink>
                                    <NavLink
                                        to="/transactions"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Transactions
                                    </NavLink>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className='container mx-[100px] my-2 px-4 py-4'>
                    <h1 className='text-5xl text-white'>
                        Welcome back, {user?.fname}!
                    </h1>
                    <h5 className='text-2xl text-gray-300'>
                        This is your Financial Overview Report
                    </h5>
                </div>
            </header>
        </section>
    );
};

export default HomePageNavBar;
