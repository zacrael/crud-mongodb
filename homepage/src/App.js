import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadUSer } from "./action/authAction";
import { getUsers } from "./action/userAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Room";
import MapContainer from "./components/map";
import "antd/dist/antd.min.css";
import "antd/dist/antd.min.js";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);
const ProtectedRoute = props =>
  props.isAllowed ? <Route {...props} /> : <Redirect to="/AppNavbar" />;
const LoginRoute = props =>
  !localStorage.getItem("token") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/Home" />
  );
class App extends Component {
  // componentDidMount() {
  //   store.dispatch(getUsers());
  // }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <AppNavbar />
            <Home />
            <Switch>
              <LoginRoute path="/Home" component={Home} />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                path="/"
                component={Home}
              />
              <Redirect from="/" exact to="/Home" />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
{
  /* <Container>
              <ShoppingList />
              <ItemModal />
            </Container> */
}
