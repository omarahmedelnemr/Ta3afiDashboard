import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component to handle authentication and authorization
 * @param {Object} props - Component props
 * @param {React.Component} props.children - Child components to render if authorized
 * @param {string} props.requiredRole - Required role to access the route (optional)
 */
function ProtectedRoute({ children, requiredRole }) {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/Login" replace />;
    }

    // If a specific role is required, check if user has it
    if (requiredRole && userRole !== requiredRole) {
        // User doesn't have required role, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // User is authenticated and authorized
    return children;
}

export default ProtectedRoute;
