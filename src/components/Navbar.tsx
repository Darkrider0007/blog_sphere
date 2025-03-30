import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Logo from "../assets/logo/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl 
               rounded-full p-3 shadow-lg z-50 backdrop-blur-md bg-white">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-black px-6">
                    <img src={Logo} alt="Logo" className="w-36 md:w-48 inline-block mr-2" />
                </Link>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden text-2xl text-black cursor-pointer px-6" onClick={toggleMenu}>
                    {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div>

                {/* Menu Links */}
                <div className={`flex-col md:flex-row items-center space-x-4 md:space-x-8 text-lg flex 
                    ${isMenuOpen ? 'flex' : 'hidden'} md:flex bg-white md:bg-transparent absolute md:relative 
                    top-16 left-0 w-full md:w-auto md:top-0 p-4 md:p-0 rounded-lg`}>
                    <Link
                        to="/blogs"
                        className="text-black hover:text-primary transition duration-300 py-2"
                        onClick={toggleMenu}
                    >
                        Blogs
                    </Link>
                    <Link
                        to="/authors"
                        className="text-black hover:text-primary transition duration-300 py-2"
                        onClick={toggleMenu}
                    >
                        Authors
                    </Link>

                    {user ? (
                        <div
                            className="flex items-center space-x-3 px-6 mt-4 md:mt-0 py-2"
                            onClick={toggleMenu}
                        >
                            <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-xl hover:bg-gray-700 transition duration-300">
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/signup"
                            className="text-black hover:text-primary transition duration-300 text-lg px-6 mt-4 md:mt-0 py-2"
                            onClick={toggleMenu}
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
