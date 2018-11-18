import React, { Component } from 'react';
import SignupFirst from './SignupFirst.js';
import SignupSecond from './SignupSecond.js';
import SignupThird from './SignupThird.js';


class SignupRoot extends Component{
    state = {
        step: 1,
        name:'',
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
        var { step, name, email, password } = this.state;
        var values = { name, step, email, password };
        switch(step) {
            case 1:
                return (
                    <SignupFirst
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />    
                )
            case 2:
                return (
                    <SignupSecond
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />    
            )
            case 3:
                return (
                    <SignupThird
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
export default SignupRoot