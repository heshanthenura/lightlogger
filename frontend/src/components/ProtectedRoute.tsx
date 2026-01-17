import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "../pages/LoadingPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) return <LoadingPage />;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
