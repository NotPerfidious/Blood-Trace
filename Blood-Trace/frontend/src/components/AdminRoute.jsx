/**
 * Admin Route Protection
 * A wrapper component for admin-only routes. Verifies both authentication
 * and admin role status before rendering nested routes.
 */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPulse from "./LoadingPulse";

function AdminRoute() {

    const { isAuthenticated, user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <LoadingPulse />
    }

    return (isAuthenticated && user.role === 'admin') ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute;