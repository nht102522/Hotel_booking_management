import { Navigate } from "react-router-dom";

import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-grey-50">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
