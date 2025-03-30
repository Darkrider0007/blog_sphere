import { useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo/logo.png"

const Navbar = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl 
               rounded-full p-3 shadow-lg z-50 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-center">

                <Link to="/" className="text-3xl font-bold text-black px-6 mb-4 md:mb-0">
                    <img src={Logo} alt="Logo" className="w-36 md:w-48 inline-block mr-2" />
                </Link>

                <div className="space-x-4 md:space-x-8 text-lg flex flex-col md:flex-row items-center">
                    <Link
                        to="/blogs"
                        className="text-black hover:text-primary transition duration-300"
                    >
                        Blogs
                    </Link>
                    <Link
                        to="/authors"
                        className="text-black hover:text-primary transition duration-300"
                    >
                        Authors
                    </Link>
                </div>

                {user ? (
                    <div className="flex items-center space-x-3 px-6 mt-4 md:mt-0">
                        <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-xl hover:bg-gray-700 transition duration-300">
                            {user.fullName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/signup"
                        className="text-black hover:text-primary transition duration-300 text-lg px-6 mt-4 md:mt-0"
                    >
                        Sign Up
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
