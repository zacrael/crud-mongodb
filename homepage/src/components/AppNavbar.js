import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import ItemModal from "./itemModal";
import Home from "./Room";
import Logout from "./auth/Logout";
import { loadUSer } from "../action/authAction";
import { getUsers } from "../action/userAction";
import MapContainer from "./map";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };
  componentDidMount() {
    // this.props.getUsers();
    if (this.props.isAuthenticated) {
    }
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  static propTypes = {
    // user: PropTypes.object.isRequired,
    // login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  // componentDidMount() {
  //   this.props.getUsers();
  // }
  render() {
    // const { isAuthenticated, user } = this.props.auth;
    const email = localStorage.getItem("email");
    // console.log("wew", user);
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{email ? `Welcome ${email}` : ""}</strong>
          </span>
          {/* <NavItem>
            <ItemModal />
          </NavItem> */}
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">RoomHub</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {email ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers }
)(AppNavbar);
