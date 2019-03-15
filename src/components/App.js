import React, { Component} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {blue, green, orange, pink, purple, red, yellow} from './Icons'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const ICONS = [blue, green, orange, pink, purple, red, yellow];
const COLORS = ['#3279E7', '#60BB25', 'orange', '#D54189', 'purple', '#EC857F', '#F0E962'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      country_info: []
    };
    this.addMarker = this.addMarker.bind(this);

    this.props.socket.on('country_info', (data) => {
        var country_info = this.state.country_info;
        country_info.push([data.country_info, data.location_info]);
        this.setState({country_info: country_info})
    })
  }

  addMarker(e) {
    var markers = this.state.markers;
    const location = {'lat': e.latlng.lat, 'lng': e.latlng.lng};

    if (markers.length >= 7){
      markers.shift();
    }

    markers.push(location);
    this.setState({markers: markers})

    this.props.socket.emit('handleLatLng', location)
  }

  render() {
    const markers = this.state.markers.map((marker, idx) => {
      return (<Marker position={marker} key={idx} icon={ICONS[idx]}>
        <Popup>
          <span>{"{lat: " + marker.lat + ", lng: " + marker.lng + "}"}</span>
        </Popup>
      </Marker>)
    })
    const country_info = this.state.country_info.map((info, index) =>{
      const country = info[0];
      const location = info[1];
      const flag_style = {width: '10%', height:'10%',  display: 'flex',
              justifyContent: 'center', alignItems: 'center'};

      if (country !== 'Unknow Country'){
        return (
          <div key={index} style={{backgroundColor: COLORS[index]}}>
            <h1>{location.city}, {location.country}</h1>
            <img src={country.flag} style={flag_style} alt='flag'/>
            <div>
              <p>Country Name: <b>{country.name}</b></p>
              <p>Native Name: <b>{country.nativeName}</b></p>
              <p>Capital: <b>{country.capital}</b></p>
              <p>Population: <b>{country.population}</b></p>
              <p>Area: <b>{country.area}</b></p>
              <p>Provinces: <b>{country.provinces.join(', ')}</b></p>
              <p>Region: <b>{country.region}</b></p>
              <p>Languages: <b>{country.languages.join(', ')}</b></p>
              <p>Currencies: <b>{country.currencies.join(', ')}</b></p>
              <p>Calling Codes: <b>{country.callingCodes.join(', ')}</b></p>
              <p>Time Zones: <b>{country.timezones.join(', ')}</b></p>
              <p>Borders: <b>{country.borders.join(', ')}</b></p>
              <p>Wiki: <a href={country.wiki}>
                <font style={{color:"white"}}>{country.name}</font>
                </a></p>
            </div>
          </div>
        )
      }else{
        return (
          <div key={index} style={{backgroundColor: COLORS[index]}}>
            <h1>{location.city}, {location.country}</h1>
          </div>
        )
      }
    })

    return (
      <div className="container">
        <div className='row'>
          <Map center={[40.476, 44.746]} onClick={this.addMarker} zoom={8}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
            {markers}
          </Map>
        </div>
        <div className='row'>
        <Slider>
          {country_info}
        </Slider>
        </div>
      </div>
    );
  }
}

export default App;
