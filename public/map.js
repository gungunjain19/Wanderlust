
mapboxgl.accessToken = mapToken;
 const map = new mapboxgl.Map({
     container: 'map', // container ID
     center: mapCoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
     zoom: 9 // starting zoom
 });
 const marker = new mapboxgl.Marker({color:"red"})
 .setLngLat(mapCoordinates)
 .addTo(map);
 
