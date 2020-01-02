import React, { useState, useEffect } from "react";// import react
import {// imports to use google maps
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as stationData from "./data/dpr-facility-demo.json"; // import station data *********
import mapStyles from "./mapStyles"; // import map styles
import NewFacility from './components/newFacility'

function Map() {
  //console.log(stationData) //for debug
  const [selectedstation, setSelectedstation] = useState(null); // use react hooks to keep track of selected station

  /* CREATE A LISTENER TO CLEAR THE SELECTEDstation STATE TO NULL IF ESCAPE KEY IS PRESSED  */
  useEffect(() => {//use effect: to replace lifecycle methods
    const listener = e => {//define a listener
      if (e.key === "Escape") {//if escape key is pressed
        setSelectedstation(null);//clear selectedstation
      }
    };
    window.addEventListener("keydown", listener);//call the event listener

    return () => { //remove the listener on unmount
      window.removeEventListener("keydown", listener);
    };
  }, []);//empty array to keep track? ***see useEffect tutorials

/* RETURN JSX FOR MAP WITH MARKER AND INFOBOX FEATURES */

  return (// return the map
    <GoogleMap // google map JSX tag
      defaultZoom={13} //set default zoom
      defaultCenter={{ lat: 6.4603, lng: 3.5548 }} //set default location
      defaultOptions={{ styles: mapStyles }} //set default style
    > {/* end of for 1st of double-tag GoogleMap JSX*/}
    
    {/* MAP THE DATA IN stationData TO A MARKER WITH AN INFO WINDOW */}
      {stationData.stations.map(station => (// map each entry in station data to a JSX
        <Marker // tag for the icon (marker)
          key={station.station_ID} //prop1 = set key(name) as JSON field...key has to be used in 'map' function
          position={{ // prop2 = set positions as JSON fields read from the station data file
            lat: station.latitude,
            lng: station.longitude
          }}
          onClick={() => { // prop3 = define response to clicking the marker
            setSelectedstation(station);// set the selectedstation state to the station corresponding to the marker
          }}
          icon={{// prop4 = choose what to use as the icon
            url: `/stations.png`,// use a local image- skaeboard
            scaledSize: new window.google.maps.Size(25, 25) //scale the size??****************************
          }}
        />// closing tag for the <Marker> JSX
      ))}

      {/* IF A station'S MARKER IS SELECTED: OPEN UP ITS INFOWINDOW */}
      {selectedstation && (// if a station is selected then...
        <InfoWindow //render an infoWindow JSX
          onCloseClick={() => {// prop1= set action for close click 'x'
            setSelectedstation(null);// clear selectedstation state
          }}
          position={{// set position of infoWindow based on click
            lat: selectedstation.latitude,//set the latitude based on the details from the selectedstation state
            lng: selectedstation.longitude// set the longitude based on the details from the selectedstation state
          }}
        >{/* end of the opening InfoWindow JSX tag */}
        {/* set the details to display in the infoWIndow */}
          <div>
            <h2>{selectedstation.name}</h2> {/* display the station's name as a header*/}
            <p><b>Address: </b>{selectedstation.address}</p> {/* display the station's description as regular text*/}
            <p><b>Description: </b>{selectedstation.description}</p> {/* display the station's description as regular text*/}
            <button >Open full Details</button>
          </div>
        </InfoWindow>// closing tag for the infowindow JSX tag
      )}
    </GoogleMap>// closing tag for GoogleMap JSX tag
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map)); //make a new component: wrap the Map component with a withGoogleMap HOC and a withScriptjs HOC

export default function App() {//export function to make the app accessible i.e the app component is created and exported in one move
  return (//return JSX
    <div style={{ width: "100vw", height: "100vh" }}>
    {/* RETURN THE MAPWRAPPED COMPONENT */}
    <NewFacility />
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBLElYt7l1VCCCHI5l8nAlsWwYK6xe1KRk`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
