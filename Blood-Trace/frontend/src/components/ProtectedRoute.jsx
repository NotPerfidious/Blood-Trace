/**
 * Protected Route Wrapper
 * Ensures that only authenticated users can access certain parts of the application.
 * Redirects unauthenticated users to the login page while handling loading states.
 */
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