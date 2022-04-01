import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.scss";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import MyHeader from "./components/layout/header/header";
import MyBody from "./components/layout/body/body";
import MyFooter from "./components/layout/footer/footer";

import Home from "./pages/home/home";
import MainMenu from "./pages/main-menu/main-menu";
import ShowPoints from "./pages/showPoints/show-points";
import NotFound from "./pages/not-found/not-found";

import Login from "./pages/authentication/login/login";
import Logout from "./pages/authentication/logout/logout";
import Register from "./pages/authentication/register/register";
import NewPassword from "./pages/authentication/new-password/new-password";
import AddPoints from "./pages/addPoints/add-points";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <MyHeader />
        </Header>
        <Content>
          <MyBody>
            <Router>
              <Switch>
                <Route path="/:troop_id/show_points" component={ShowPoints} />
                <Route path="/:troop_id/navigation" component={MainMenu} />
                <Route path="/:troop_id/add_points" component={AddPoints} />

                {/*<Route path="/changeRoles" component={ChangeRoles} />*/}

                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />
                <Route path="/new_password" component={NewPassword} />

                <Route path="/home" component={Home} />
                <Route path="" component={NotFound} />
              </Switch>
            </Router>
          </MyBody>
        </Content>
        <Footer>
          <MyFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
