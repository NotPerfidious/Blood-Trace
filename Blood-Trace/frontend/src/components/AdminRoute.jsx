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