import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import PostPage from "./components/PostPage";
import FeedPage from "./components/FeedPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FourOFour from "./components/FourOFour";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <ProtectedRoute exact path="/posts" component={FeedPage} />
        <ProtectedRoute exact path="/posts/:postId" component={PostPage} />
        <Route path="/">
          <FourOFour />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
