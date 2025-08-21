import { useEffect, useRef, useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { HomeCard } from "./Homes/HomeCard";

export const NashvilleMap = ({ homes }) => {
  return (
    <APIProvider apiKey={"AIzaSyA_96q3aTcBnEpKLDLQZbwLPp2r-Q6EaZg"}>
      <Map
        defaultZoom={12}
        defaultCenter={{ lat: 36.1627, lng: -86.7816 }}
        mapId="bc2feeb66a6551d31a34d97c"
        style={{ width: "100%", height: "100%" }}
      >
        <HomeMarkers homes={homes} />
      </Map>
    </APIProvider>
  );
};

const HomeMarkers = ({ homes }) => {
  const [selectedHome, setSelectedHome] = useState(null);
  const map = useMap();
  const markersRef = useRef({});
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }

    const handleMapClick = () => {
      setSelectedHome(null);
    };

    map.addListener("click", handleMapClick);

    return () => {
      google.maps.event.clearListeners(map, "click");
    };
  }, [map]);

  useEffect(() => {
    if (!clusterer.current) return;

    clusterer.current.clearMarkers();

    const markerObjs = Object.values(markersRef.current);
    if (markerObjs.length > 0) {
      clusterer.current.addMarkers(markerObjs);
    }
  }, [homes]);

  const setMarkerRef = (marker, key) => {
    if (!marker) {
      delete markersRef.current[key];
    } else {
      markersRef.current[key] = marker;
    }

    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(Object.values(markersRef.current));
    }
  };

  const handleMarkerClick = useCallback(
    (ev, home) => {
      ev.stop();

      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);

      setSelectedHome(home);
    },
    [map]
  );

  return (
    <>
      {homes.map((home) => (
        <AdvancedMarker
          key={home.id}
          position={{ lat: home.lat, lng: home.lng }}
          clickable={true}
          onClick={(ev) => handleMarkerClick(ev, home)}
          ref={(marker) => setMarkerRef(marker, home.id)}
        >
          <Pin
            background={"#03a1fc"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
      {selectedHome && (
        <div
          className="absolute top-4 right-6 left-4 z-50 w-fit"
          onClick={(ev) => ev.stopPropagation()}
        >
          <HomeCard home={selectedHome} size="small" />
        </div>
      )}
    </>
  );
};
