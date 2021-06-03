/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import style from './Map.module.css';
import MAP_STYLE from './map-style-basic-v8.json';

export default function Map({ lat, lon }) {
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 15,
    width: window.innerWidth / 2,
    height: window.innerHeight / 2.5,
    pitch: 50,
  });
  return (
    <div className={style.container}>
      <ReactMapGL
        mapStyle={MAP_STYLE}
        mapboxApiAccessToken="pk.eyJ1IjoibWxvY29jbyIsImEiOiJja29pbmo0YjIxaHJ2MnpzOTV3M3NqczYxIn0.ab6G9p9ZpGK3EJFB7YfYNw"
        {...viewport}
        onViewportChange={(newView) => setViewport(newView)}
      >
        <Marker
          latitude={lat}
          longitude={lon}
          offsetTop={-viewport.zoom * 5 / 3}
        >
          <span
            className={style.marker}
            styles={{ width: viewport.zoom * 6, height: viewport.zoom * 6 }}
          >
            <FaMapMarkerAlt />
          </span>
        </Marker>
      </ReactMapGL>
    </div>
  );
}
