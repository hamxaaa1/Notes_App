import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicNavigation({children}) {
  const user = useSelector(store => store.authSlice.user)
  return user ? <Navigate to="/" /> : children;
}

export default PublicNavigation