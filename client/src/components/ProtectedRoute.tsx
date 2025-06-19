import { Navigate } from "react-router-dom";
import  AuthContext from '../contexts/AuthContext';
import { useContext } from "react";
import type { ReactElement } from "react";

{/* surrounds protected routes in app, if user checked and null, navigate to login ,else allow access to route */}
export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const user = useContext(AuthContext);

    if (!user?.checked) {
        return <div className="items-center justify-center font-sans font-semibold font-6x1">Loading...</div>
    }

    if (!user?.user) {
        return <Navigate to="/login" replace />
    }

    return children;
}