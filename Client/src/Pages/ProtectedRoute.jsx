import { Navigate, Outlet, useParams } from "react-router-dom";

const ProtectedRoute = () => {
  const { secureHash } = useParams();
  const token = localStorage.getItem("token");

  if (!secureHash || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
