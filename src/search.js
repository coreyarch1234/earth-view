import React, {Component} from 'react';

class Search extends Component{
    constructor(props){
        super(props); //for props to get set on this object

        this.state = {
            searchCity: "",
            searchState: ""
        }
    }

    render(){
        return (
            <div>
                <h1 style={styles.title}>Earth View</h1>
                <form onSubmit={(e) =>{
                    e.preventDefault(); //so page does not refresh after submission
                    var searchObj = {
                        searchCity: this.state.searchCity,
                        searchState: this.state.searchState
                    }
                    this.props.onSubmit(searchObj);
                }} style={styles.form}>

                    <input
                        type="text"
                        placeholder = {this.props.placeholderCity}
                        value = {this.state.searchTerm}
                        onChange={(e) => { //What you are typing in
                            this.setState({
                                searchCity: e.target.value
                            })
                        }} style={styles.input}/>

                        <input
                            type="text"
                            placeholder = {this.props.placeholderState}
                            value = {this.state.searchTerm}
                            onChange={(e) => { //What you are typing in
                                this.setState({
                                    searchState: e.target.value
                                })
                            }} style={styles.input}/>

                    <button type="submit" style={styles.button}>{this.props.label}</button>
                </form>
            </div>
        );
    }
}


const styles = {
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: '#212F3C',
        fontSize: '6em'
    },
    form: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%,25%)',
        textAlign: 'center'
    },
    input: {
        color: 'black',
        border: '2px solid white',
        borderRadius: 4,
        width: 300,
        height: 50,
        fontSize: 25,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'block',
        textAlign: 'center',
        marginBottom: 50
    },
    button: {
        // backgroundColor: 'transparent',
        backgroundColor: 'lightskyblue',
        color: 'white',
        border: '1px solid white',
        borderRadius: 4,
        height: 40,
        lineHeight: 2.5,
        paddingLeft: 25,
        paddingRight: 25,
        outline: 'none',
        cursor: 'pointer',
        marginTop: 10

    }
}

export default Search;
