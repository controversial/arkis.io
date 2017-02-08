/* global mapboxgl */

mapboxgl.accessToken = 'pk.eyJ1IjoiY29udHJvdmVyc2lhbCIsImEiOiJjaXMwaXEwYjUwM2l6MnpwOHdodTh6Y24xIn0.JOD0uX_n_KXqhJ7ERnK0Lg';

window.map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/controversial/ciyvz3bls00222rmu39mll67r',
  center: [-74.094, 41.764],
  zoom: 12.25,
  bearing: 71.5,
  pitch: 60,

  scrollZoom: false,
  doubleClickZoom: false,

  attributionControl: false,
}).addControl(
  new mapboxgl.AttributionControl({ compact: true }),
);
