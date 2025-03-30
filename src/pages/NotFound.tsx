import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h2 className="text-6xl font-bold text-red-500 mb-4">404</h2>
                <p className="text-2xl text-gray-700 mb-2">Page Not Found</p>
                <p className="text-gray-500 mb-8">Sorry, the page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    <AiOutlineHome className="text-xl" />
                    Go Back Home
                </Link>
            </div>
            <img
                src="https://illustrations.popsy.co/gray/error-page.svg"
                alt="Not Found Illustration"
                className="w-80 mt-8"
            />
        </div>
    );
};

export default NotFound;
