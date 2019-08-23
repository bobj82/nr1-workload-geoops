import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from "react-leaflet";
import { generateIcon } from "./utils";
import geoopsConfig from "../../geoopsConfig";

export default class PoSMap extends Component {
  static propTypes = {
    configId: PropTypes.any.isRequired,
    data: PropTypes.array.isRequired,
    callbacks: PropTypes.object.isRequired
  };

  render() {
    const { data, configId, callbacks } = this.props;
    const config = geoopsConfig.find(c => c.id == configId);
    return (
      <div className="leaflet-wrapper">
        <Map
          center={config.center}
          zoom={6}
          ref={ref => {
            this.mapRef = ref;
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map(row => {
            return (
              <Marker
                key={row.id}
                position={[row.lat, row.lng]}
                onClick={callbacks.onClick}
                _did={row.locationId}
                icon={generateIcon(row)}
              />
            );
          })}
        </Map>
      </div>
    )
  }
}
