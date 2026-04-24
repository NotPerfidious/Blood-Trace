import LoadingPulse from "./LoadingPulse";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoute() {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    // console.log(isAuthenticated, loading);

    if (loading) {
        return (<LoadingPulse />)
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;