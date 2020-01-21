import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../action/itemAction";
import { addRoom } from "../action/authAction";
import PropTypes from "prop-types";
class ItemModal extends Component {
  state = {
    modal: false,
    status: "",
    room: "",
    description: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    const { status, room, description } = this.state;

    // Create user object
    const newUser = {
      status,
      room,
      description
    };

    // Attempt to register
    this.props.addRoom(newUser);
  };
  render() {
    return (
      <div>
        <Container top="50%">
          <br />
          {this.props.isAuthenticated ? (
            <Button
              color="dark"
              style={{ marginBotton: "2rem" }}
              onClick={this.toggle}
            >
              Add Room
            </Button>
          ) : null /* null(<h4 className="mb-3 ml-4">Please Log in</h4>) */}
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Room</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="roomr">Item</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  placeholder="status"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="room"
                  id="room"
                  placeholder="room"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  onChange={this.onChange}
                />

                <Input
                  type="file"
                  onChange={this.fileSelectHandle}
                  name="image"
                  id="image"
                  placeholder="image"
                  className="mb-3"
                />
                <br />
                <br />
                <Button
                  color="dark"
                  className="mb-5"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Add Room
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  roomr: state.roomr,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { addItem, addRoom }
)(ItemModal);
