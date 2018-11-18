import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class SignupSecond extends Component{
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        var { values, handleChange } = this.props;
        require('./Signup.css')
        return(
        
            <div className="wrapper">
            <p id="prod-name">
		            	<span className="prod-blue">Sure</span>
		            	<span className="prod-green">Fit</span>
	            	</p>
            <div className="inputContainer">
            <label for="Email">Email
                        <input className="inputField" value={values.email} onChange={handleChange('email')} />
                        </label>
                    </div>
                    <div className="button">

                    <Button className="buttonSpacing" variant="contained" color="default" onClick={this.continue}>
                    <i className="fas fa-arrow-right"></i>
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
export default SignupSecond