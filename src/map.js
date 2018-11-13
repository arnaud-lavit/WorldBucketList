let map;
let panorama;
const panoramaElement = document.querySelector("#pano");
const resetMapButton = document.querySelector("#reset-map");
const backToMapButton = document.querySelector("#back-to-map");

const resetMap = () => {
    map.setZoom(4);
    map.setCenter({lat: 43.290748, lng: 5.860984});
    map.setMapTypeId("roadmap");
}

const backToMap = () => {
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
    resetMapButton.style.display = "block";
}

const visitDreamOnMap = position => {
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
}

const addMapListerners = () => {
    resetMapButton.addEventListener('click', resetMap);
    backToMapButton.addEventListener('click', backToMap);
}


const initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.290748, lng: 5.860984},
        zoom: 4,
        streetViewControl: false
    });
    panorama = new google.maps.StreetViewPanorama(
        panoramaElement, {
          position: {lat: 43.290748, lng: 5.860984},
          pov: {
            heading: 34,
            pitch: 10
          }
        });
    // map.setStreetView(pano);
    addMapListerners();
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
}

const zoomOn = position => {
    map.setZoom(20);
    map.setCenter(position);
    map.setMapTypeId("satellite");
}

const addMarkerOnMap = dream => {
    const marker = new google.maps.Marker({
        position: dream.coordinates, 
        icon: dream.done ? "img/marker-done.png" : "img/marker.png",
        map: map
    });
    marker.addListener('click', () => {
        zoomOn(marker.getPosition());
    });
}

export {initMap, addMarkerOnMap, visitDreamOnMap};