import React, { Component } from 'react';
import PrimarySearchAppBar from './top-bar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Detailed from './Detailed';
class TextInput extends Component{
    constructor(props){
        super(props)
        this.state={
        query:'',
        empty:'',
        invalidItem:'',
        gotResults:false,
        data:[]
    }
    this.toggleResults = this.toggleResults.bind(this);
}
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submit = e => {
        e.preventDefault();
        console.log(this.state);
        if(this.state.query.trim() === '' || this.state.query.trim() === null){
            this.setState({empty:true,invalidItem:false});
            console.log('cannot be empty');
        }else{
            this.setState({empty:false})
        var appID = "35e05ce5";
        var appKey = "0a5905000234132f23635886b865cc48";
        var base = "https://trackapi.nutritionix.com/v2/natural/nutrients";

        var d = {
            "query": this.state.query,
            "timezone": "US/Eastern"
        }
        var headers = {
            'Content-Type': 'application/json',
            'x-app-id': appID,
            'x-app-key': appKey
        }
        axios.post(base, d, { headers: headers })
            .then((response) => {
                this.setState({invalidItem:false,gotResults:true,data:response.data.foods})
                console.log(response.data)
            })
            .catch((error) => {
                if(error.request.statusText === 'Not Found'){
                    this.setState({invalidItem:true,gotResults:false})
                }
                console.log(error.request.statusText);
            })
        }
    }
    toggleResults = () => {
        this.setState({gotResults:false})
    }
    render(){
        require('./SignUp/Signup.css')
        return(
            <div>
                <PrimarySearchAppBar />
                
                {this.state.gotResults
                ?
                <Detailed data={this.state.data} toggle={this.toggleResults}/>
                :
                
                <div className="wrapper">
                <div className="inputContainer">
                    <input placeholder="Food Item" className="inputField" name="query" type="text"  onChange={this.handleChange} />
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Button style={{marginTop:20,marginRight:20}} variant="contained" color="primary" onClick={this.submit}>
                        Submit
                    </Button> 
                </div> 
                {this.state.empty ? <p>Input field cannot be empty</p> : null}   
                {this.state.invalidItem ? <p>Please enter a valid food item</p> : null}   

                </div>
                }
            </div>
        );
    }
}

export default TextInput