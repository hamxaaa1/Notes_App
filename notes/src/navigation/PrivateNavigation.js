import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateNavigation({children}) {
    const user = useSelector(store => store.authSlice.user)
    return user ? children : <Navigate to="/login" />;
}

export default PrivateNavigation