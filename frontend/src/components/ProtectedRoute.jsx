import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login', { 
                state: { 
                    message: 'Please log in to access this page.' 
                } 
            });
        }
    }, [navigate]);

    // If not authenticated, don't render children
    if (!isAuthenticated()) {
        return null;
    }

    return children;
};

export default ProtectedRoute;