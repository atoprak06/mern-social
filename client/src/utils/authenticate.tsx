import { useSelector } from "react-redux";
import { useVerifyTokenQuery } from "@/api/index";
import { Route, Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ element, ...rest }) {
  const user = useSelector((state) => state.persistedReducer.user);
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess } = useVerifyTokenQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !isSuccess) {
    // redirect to login page if token verification fails
    navigate("/login");
    return null;
  }

  // render the protected route if the user is authenticated
  return (
    <Route {...rest} element={user ? element : <Navigate to="/login" />} />
  );
}

export default PrivateRoute;
