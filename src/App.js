import React from 'react';
import './App.css';
import Search from './search'
var axios = require('axios'); //to make Ajax requests


require('dotenv').config();
const geocode_api_key = process.env.REACT_APP_GEOCODE_API_KEY;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: null,
            imageError: null,
            city: null,
            state: null
        }
    }
    // geoCode(address, callback){
    //
    // }
    findSatelliteImage(address){
        //geocode function with this body as callback with lat,lon as parameter
        const location = {
            lat: address.lat,
            lon: address.lon
        }
        const query = 'https://api.astrodigital.com/v2.0/search/?' + 'contains=' + location.lat + ',' + location.lon;
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
    }

    showImage(){
        if (this.state.imageError === true){
            return <p style = {styles.errorText}>Enter a new address</p>;
        }else{
            return <img src={this.state.imageURL} style = {styles.image}/>;
        }
    }

    componentWillMount() {
    }

    render() {
        return(
            <div>
            <Search
                placeholderCity="Enter City"
                placeholderState="Enter State"
                label = "Search"
                onSubmit={(address) => {
                    var addressArr = {
                        city: address.searchCity,
                        state: address.searchState
                    }
                    console.log("api key: " + geocode_api_key);
                    console.log(addressArr);
                    // console.log("city: ", city);
                    // this.findSatelliteImage(address);
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
        transform: 'translate(-50%,50%)'
    },
    errorText: {
        color: 'red',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%,500%)',
        fontSize: 25
    }
}
// AIzaSyDTz7r5lJisnMBK7AAHOFE_kM5RQ_aalpk




export default App;
