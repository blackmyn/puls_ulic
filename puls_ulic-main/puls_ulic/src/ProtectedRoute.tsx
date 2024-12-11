import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //  Теперь проверка ролей происходит внутри каждого маршрута
  return <Outlet />;
};

export default ProtectedRoute;