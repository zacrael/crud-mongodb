import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import gba from "../gba.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom } from "../action/roomAction";

class Home extends Component {
  state = {
    posts: []
  };
  static propTypes = {
    roomr: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getRoom();
  }
  maps = e => {
    e.preventDefault();
    window.location.href = "/map";
  };
  render() {
    const { rooms } = this.props.roomr;
    console.log(rooms);
    const postList = rooms.length ? (
      rooms.map(post => {
        return (
          <div className="post-card" key={post._id}>
            <img src={gba} className="img-card" alt="A gba" />
            {/* <span className="card-title red-text"> {post.name}</span> */}
            <div className="de-card">
              <p style={{ fontSize: 20 }}>{post.room}</p>
              <p style={{ fontSize: 12 }}>{post.description}</p>
              <p style={{ fontSize: 12 }}>{post.status}</p>
            </div>
            {/* <span className="card-body red-text"></span> */}
            <label className="card-body">
              6th Most Popular House / Apartment in Tagaytay City
            </label>
            <p>
              <p className="rate-card">price cash money</p>
            </p>
            <div className="card-content">
              <Link to={"/" + post._id}>
                <p className="rate-card">{post.room}</p>
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center "> no posts yet</div>
    );

    return (
      <div className="container home">
        {/* <h4 className="center">Home</h4> */}

        <div align="center">{postList}</div>
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
  { getRoom }
)(Home);
