import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class SignupFirst extends Component{
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render(){
        require('./Signup.css')
        var { values, handleChange } = this.props;
        return(
                
                <div className="wrapper">
                    <p id="prod-name">
		            	<span className="prod-blue">Sure</span>
		            	<span className="prod-green">Fit</span>
	            	</p>
                    <div className="inputContainer">
                    <label for="Name">Name
                        <input className="inputField" type="text" value={values.name} onChange={handleChange('name')} />
                    </label>    
                    </div>
                    
                    <div style={{marginTop:10}}>
                            <Button variant="contained" color="default" className="btn-link" onClick={this.continue}>
                            <i className="fas fa-arrow-right"></i>
                            </Button>

                    </div>
                </div>
                
        );
    }
}

export default SignupFirst