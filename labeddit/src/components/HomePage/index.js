import React from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  localStorage.getItem("labeddit")
    ? history.push("/posts")
    : history.push("/login");

  return <div />;
};

export default HomePage;
