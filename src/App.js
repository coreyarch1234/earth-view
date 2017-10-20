import React from 'react';
import './App.css';
import Search from './search'
var axios = require('axios'); // to make Ajax requests


require('dotenv').config();
const geocode_api_key = process.env.REACT_APP_GEOCODE_API_KEY;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURL: null,     // holds the atellite image after it's found
            imageError: null,   // Will be false if API returns no image
            city: null,
            state: null
        }
    }

    geoCode(address, callback){
        const city = address.city.split(' ').join('+');
        // const state = address.state;
        console.log("the city is: " + city);
        // console.log("the state is: " + state);
        const query = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + geocode_api_key;
        // const query = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${geocode_api_key}`;

        axios.get(query)
        .then((response) => {
            console.log(response);
            console.log("lat: " + response.data.results[0].geometry.location.lat);
            console.log("lon: " + response.data.results[0].geometry.location.lng);
            const coordinates = {
                lat: response.data.results[0].geometry.location.lat,
                lon: response.data.results[0].geometry.location.lng
            }
            callback(coordinates);
        })
        .catch((error) => {
            console.log("error occurred");
            console.log(error);
        });


    }
    findSatelliteImage(address){
        //geocode function with this body as callback with lat,lon as parameter
        this.geoCode(address,(coordinates) => {
            const query = 'https://api.astrodigital.com/v2.0/search/?contains=' + coordinates.lat + ',' + coordinates.lon;
            axios.get(query)
            .then((response) => {
                console.log(response);
                this.setState({imageURL: response.data.results[0].thumbnail, imageError: false});
            })
            .catch((error) => {
                console.log("error occurred");
                this.setState({imageError: true})
                console.log(error);
            });
        });
    }

    showImage(){
        if (this.state.imageError === true){
            return <p style = {styles.errorText}>Location out of range. Enter a new one.</p>;
        }else{
            return <img src={this.state.imageURL} alt = "" style = {styles.image}/>;
        }
    }

    componentWillMount() {

    }

    render() {
        return(
            <div>
            <Search
                placeholderCity="Enter City or State"
                label = "Search"
                onSubmit={(address) => {
                    //keep JSX short. You can pass address into findSatelliteImage only
                    var addressObj = {
                        city: address.searchCity
                    }
                    console.log("api key: " + geocode_api_key);
                    console.log(addressObj);
                    this.findSatelliteImage(addressObj);
            }}/>
            {this.showImage()}
            </div>
        );
    }

}
var styles = {
    image: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%,50%)',
        paddingBottom: 5
    },
    errorText: {
        color: 'red',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%,1000%)',
        fontSize: 25
    }
}

export default App;
