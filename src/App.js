import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { Nav, Navbar} from "react-bootstrap";
import Kereses from "./sajatosztalyok/Kereses"
import Osszes from "./sajatosztalyok/Osszes"
import Torles from "./sajatosztalyok/Torles"
import { View } from "react-native-web";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <View>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/Osszes">

            KönyvtárGO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

              <div className="navbar-nav mr-auto">


                <li className="nav-item">
                  <Link to={"/Osszes"} className="nav-link">
                    Könyvek
                  </Link>
                </li>


                {/*--------------------------------------------Admin board */}
                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/Torles"} className="nav-link">
                      Törlés
                    </Link>
                  </li>
                )}
              </div>

            </Nav>
            <Nav>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      Kijelentkezés
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Bejelentkezés
                    </Link>
                  </li>
                </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Kereses" component={Kereses} />
            <Route path="/Osszes" component={Osszes} />
            <Route path="/Torles" component={Torles} />
          </Switch>
        </div>
      </div>
      </View>
    );
  }
}

export default App;
