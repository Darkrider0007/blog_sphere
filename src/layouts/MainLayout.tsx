import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="bg-gray-100 text-gray-800">
            <Navbar />
            <main className="pt-40 bg-gray-100 p-8 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
