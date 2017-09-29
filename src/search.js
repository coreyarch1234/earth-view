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
                <button type="submit">{this.props.label}</button>
            </form>
            </div>
        );
    }
}


const styles = {
      form: {
         display: 'flex',
         justifyContent: 'center'
     },
     input: {
         color: '#2d4'
     }
}

export default Search;
