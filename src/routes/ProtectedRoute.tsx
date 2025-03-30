import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";


const ProtectedRoute = ({ children }: any) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
