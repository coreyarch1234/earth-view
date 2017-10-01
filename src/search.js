import React, {Component} from 'react';

class Search extends Component{
    constructor(props){
        super(props); //for props to get set on this object

        this.state = {
            searchTerm: ""
        }
    }

    render(){
        return (
            <div>
                <h1 style={styles.title}>Earth View</h1>
                <form onSubmit={(e) =>{
                    e.preventDefault(); //so page does not refresh after submission
                    this.props.onSubmit(this.state.searchTerm);
                }} style={styles.form}>

                    <input
                        type="text"
                        placeholder = {this.props.placeholder}
                        value = {this.state.searchTerm}
                        onChange={(e) => { //What you are typing in
                            this.setState({
                                searchTerm: e.target.value
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
    // form: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     height: '3em',
    //     marginTop: '6em',
    //     textAlign: 'center'
    // },
    form: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%,0%)',
        textAlign: 'center'
    },
    input: {
        color: 'white',
        border: '1px solid white',
        borderRadius: 4,
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'block'
    },
    button: {
        backgroundColor: 'transparent',
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
