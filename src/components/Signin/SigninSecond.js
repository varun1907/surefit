import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class SigninSecond extends Component{
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        require('../SignUp/Signup.css')
        var { values, handleChange } = this.props;
        return(
        
            <div className="wrapper">
            <p id="prod-name">
		            	<span className="prod-blue">Sure</span>
		            	<span className="prod-green">Fit</span>
	            	</p>
            <div className="inputContainer">
                <label for="Password">Password
                <input className="inputField" type="password" value={values.password} onChange={handleChange('password')} />
                </label>
            </div>
            <div className="button">
            <Button className="buttonSpacing" variant="contained" color="default" onClick={this.continue}>
                <i className="fas fa-sign-in-alt"></i>    
            </Button>
            <Button variant="contained" color="default" onClick={this.back}>
            <i className="fas fa-arrow-left"></i>
            </Button>
            </div>
        </div>
        );
    }
}
const styles = {
   
}
export default SigninSecond