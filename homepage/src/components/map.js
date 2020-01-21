import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
const mapStyles = {
  width: "30%",
  height: "30%"
};
class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "TOKEN HERE"
})(MapContainer);
