import React, { Component } from 'react';
import SigninFirst from './SigninFirst.js';
import SigninSecond from './SigninSecond.js';

class SigninRoot extends Component{
    state = {
        step: 1,
        email: '',
        password: '',
    }

    nextStep = () => {
        var { step } = this.state;
        this.setState({
            step: step + 1
        })
    } 

    prevStep = () => {
        var { step } = this.state;
        this.setState({
            step: step - 1
        })
    } 

    handleChange = input => e => {
        
        this.setState({[input]: e.target.value})
    }

    render(){
        var { step, email, password } = this.state;
        var values = { step, email, password };
        switch(step) {
            case 1:
                return (
                    <SigninFirst
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />    
                )
            case 2:
                return (
                    <SigninSecond
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />    
            )

        } 
        return(
            <div>Hello Surefit</div>
        );
    }
}
export default SigninRoot