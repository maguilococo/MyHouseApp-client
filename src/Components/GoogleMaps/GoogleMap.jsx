import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

  const MyMapComponent = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.allowAddress  === false  ?
       <Circle
        radius={250}
        center={{ lat: props.lat, lng: props.lng }}
      />
      :
      <Marker
        position={{ lat: props.lat, lng: props.lng }} />
       }
    </GoogleMap>
  
  )
  );
  
  

export default MyMapComponent;