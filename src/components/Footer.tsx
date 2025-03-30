import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Logo from '/logo.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <img src={Logo} alt="BlogSphere" className="w-14 h-14" />
                        <h1 className="text-2xl font-bold">BlogSphere</h1>
                    </div>

                    <div className="flex space-x-8 text-lg">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <Link to="/blogs" className="hover:text-white">Blogs</Link>
                        <Link to="/authors" className="hover:text-white">Authors</Link>
                    </div>

                    <div className="flex space-x-6">
                        <Link to={{ pathname: "https://facebook.com" }} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook className="w-6 h-6 hover:text-white" />
                        </Link>
                        <Link to={{ pathname: "https://twitter.com" }} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter className="w-6 h-6 hover:text-white" />
                        </Link>
                        <Link to={{ pathname: "https://linkedin.com" }} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin className="w-6 h-6 hover:text-white" />
                        </Link>
                        <Link to={{ pathname: "https://instagram.com" }} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="w-6 h-6 hover:text-white" />
                        </Link>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-sm mt-6">
                    © {new Date().getFullYear()} BlogSphere. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
