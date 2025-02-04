import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issues in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ coordinates }) => {
  return (
    <MapContainer
      center={[40.7128, -74.0060]} // Default to New York City coordinates
      zoom={5}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.latitude, coord.longitude]}>
          <Popup>
            Latitude: {coord.latitude}, Longitude: {coord.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
