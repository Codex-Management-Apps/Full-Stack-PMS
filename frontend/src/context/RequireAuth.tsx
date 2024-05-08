import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { string } from 'zod';

type Props = {
    allowedRoles: string
}
export default function RequireAuth({allowedRoles} : Props) {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth)
    return (
        auth?.roles === allowedRoles
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}
