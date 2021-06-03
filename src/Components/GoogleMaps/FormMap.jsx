import React from 'react';
import { withGoogleMap, GoogleMap, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Descriptions } from 'antd';
import { connect } from 'react-redux';
import { addLocation } from '../../Redux/Actions/index';
import style from '../../Pages/NewPost/Form/Form.module.css'

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
Geocode.setApiKey(apiKey);
Geocode.enableDebug();

class LocationSearchModal extends React.Component {
    
    state = {
        stratum: this.props.location.stratum || 0,
        street_number: this.props.location.street_number || '',
        city: this.props.location.city || '',
        department: this.props.location.department || '',
        neighborhood: this.props.location.neighborhood || '',
        latitude: this.props.location.latitude || 0,
        longitude: this.props.location.longitude || 0,
        mapPosition: {
            lat: this.props.location.latitude || 0,
            lng: this.props.location.longitude || 0,
        },
        markerPosition: {
            lat: this.props.location.latitude || 0, 
            lng: this.props.location.longitude || 0,
        },
        zoom: 15,
        height: 400,
        allowAddress: this.props.location.allowAddress || true,
        confirmed: false,
        errors: '',
    }


    componentDidMount() {
        if (Object.values(this.props.location).length > 0) {
            this.setState({
                stratum: this.props.location.stratum || '',
                street_number: this.props.location.street_number,
                city: this.props.location.city,
                department: this.props.location.department,
                neighborhood: this.props.location.neighborhood,
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                mapPosition: {
                    lat: this.props.location.latitude,
                    lng: this.props.location.longitude,
                },
                markerPosition: {
                    lat: this.props.location.latitude, 
                    lng: this.props.location.longitude,
                },
                allowAddress: this.props.location.allowAddress,
            })
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                console.log(response)
                                const street_number = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    department = this.getDepartment(addressArray),
                                    neighborhood = this.getNeighborhood(addressArray);
                                console.log(city, department);
                                this.setState({
                                    street_number: (street_number) ? street_number : '',
                                    city: (city) ? city : '',
                                    department: (department) ? department : '',
                                    neighborhood: (neighborhood) ? neighborhood : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            })} else {
                console.error("Geolocation is not supported by this browser!");
            }
    };

    validate = (state) => {
        const errors = {};
        if (!state.stratum) errors.stratum = 'El campo es requerido';
        return errors;
    }

    displayAddress = (e) => {
        e.preventDefault();
        this.setState({ allowAddress: !this.state.allowAddress})
    }

    confirmAddress = (e) => {
        e.preventDefault();
        this.setState({ confirmed: true })
        this.props.addLocation(this.state)
    }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        city = addressArray[i].long_name;
                        return city;
                    }
                }
            }
        }
    };

    getDepartment = (addressArray) => {
        let department = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    department = addressArray[i].long_name;
                    return department;
                }
            };
        };
    };

    getNeighborhood = (addressArray) => {
        let neighborhood = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let j = 0; j < addressArray[i].types.length; j++) {
                if ('neighborhood' === addressArray[i].types[j] || 'political' === addressArray[i].types[j]) {
                    neighborhood = addressArray[i].long_name;
                    return neighborhood;
                }
            };
        };
    };

    onChange = (event) => {
        event.preventDefault();
        this.setState({ errors: this.validate({ [event.target.name]: event.target.value })})
        this.setState({ [event.target.name]: event.target.value });
    };

    onInfoWindowClose = (event) => { };

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const street_number = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    department = this.getDepartment(addressArray),
                    neighborhood = this.getNeighborhood(addressArray);
                this.setState({
                    street_number: (street_number) ? street_number : '',
                    city: (city) ? city : '',
                    department: (department) ? department : '',
                    neighborhood: (neighborhood) ? neighborhood : '',
                    latitude: newLat,
                    longitude: newLng,
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    onPlaceSelected = (place) => {
        console.log('plc', place);
        const street_number = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            department = this.getDepartment(addressArray),
            neighborhood = this.getNeighborhood(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)

        // Set these values in the state.
        this.setState({
            street_number: (street_number) ? street_number : '',
            city: (city) ? city : '',
            department: (department) ? department : '',
            neighborhood: (neighborhood) ? neighborhood : '',
            latitude: latValue,
            longitude: lngValue,
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    }

    render() {
        const AsyncMap = 
            withGoogleMap(
                props => (
                    // For Auto complete Search Box 
                    <div className={style.mapForm}>

                        <div className={style.autocomplete}>
                            <Autocomplete
                                style={{
                                    display: 'block',
                                    border: 'none',
                                    padding: '10px',
                                    fontSize: '1rem',
                                    fontWeight: '300',
                                    cursor: 'pointer',
                                    background: 'transparent',
                                    borderBottom: '2px solid rgba(255, 255, 255, .4)',
                                    transition: 'all .3s ease-in-out',
                                    color: 'var(--white)',
                                    fontFamily: 'Poppins',
                                    margin: '2% 0',
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '16px',
                                }}
                                onPlaceSelected={this.onPlaceSelected}
                                options={{
                                    types: ["address"],
                                    componentRestrictions: { country: "co" },
                                }}
                            />
                        </div>
                        <GoogleMap
                            defaultZoom={this.state.zoom}
                            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                        >

                            
                            {/* InfoWindow on top of marker */}
                            {/*Marker*/}
                            {this.state.allowAddress === true && 
                                <>
                                <Marker
                                    google={this.props.google}
                                    name={'Marker name'}
                                    draggable={true}
                                    onDragEnd={this.onMarkerDragEnd}
                                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                                />
                                    <InfoWindow
                                        onClose={this.onInfoWindowClose}
                                        position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                                    >
                                        <div>
                                            <span style={{ padding: 0, margin: 0 }}>{this.state.street_number}</span>
                                        </div>
                                    </InfoWindow>
                                <Marker />
                                </>
                            }

                            {/* Circle */}
                            {!this.state.allowAddress && 
                                <>
                                    <Circle
                                        google={this.props.google}
                                        name={'Circle name'}
                                        draggable={true}
                                        onDragEnd={this.onMarkerDragEnd}
                                        radius={400}
                                        center={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                                    />
                                </>
                            }
                        </GoogleMap>
                    </div>
                )
              )

        return (
            <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
             <div className={style.col}>
                <div className={style.field}>
                    <label>Ciudad</label>
                    <input disabled type='text' value={this.state.city} />
                </div>
                <div className={style.field}>
                    <label>Departamento</label>
                    <input disabled type='text' value={this.state.department} />
                </div>
                <div className={style.field}>
                    <label>Barrio</label>
                    <input disabled type='text' value={this.state.neighborhood} />
                </div>
                <div className={style.field}>
                    <label>Dirección</label>
                    <textarea disabled  type='text' value={this.state.street_number} />
                </div>
                <div className={style.field}>
                    <label>Stratum</label>
                    <input type='number' name="stratum" onChange={this.onChange} value={this.state.stratum} min="0" max="6" />
                    {this.state.errors.stratum && ( <p className={style.pdanger}>{this.state.errors.stratum}</p>)}
                </div>  
             </div>
            <div className={style.field}>
                <label htmlFor="allowAddress">Prefiero ocultar mi ubicación
                    <input type="checkbox" className={style.allowAddress} name="allowAddress"
                        checked = {!this.state.allowAddress}
                        onClick={() => {
                            this.setState({ allowAddress: !this.state.allowAddress})
                        }} 
                    />
                </label>
            </div>
            
                <div className={style.ctnMap}>
                    <AsyncMap                   
                        mapElement={
                            <div style={{ width: '100%', height: `100%` }} />
                        }
                        containerElement={
                            <div style={{ height: this.state.height, margin: '5% 0' }} />
                        }
                    />
                </div>
                <button className={style.confirm} onClick={this.confirmAddress}>Confirmar ubicación</button>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    location: state.location
  });
  
  
function mapDispatchToProps(dispatch) {
    return {
        addLocation: function (location) {
        dispatch(addLocation(location));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchModal);
