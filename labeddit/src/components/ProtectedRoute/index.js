import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const ProtectedRoute = (props) => {
  const { path, component } = props;
  const history = useHistory();
  const { userData } = useContext(UserContext);

  !userData && history.push("/login");
  return userData ? <Route exact path={path} component={component} /> : null;
};

export default ProtectedRoute;
