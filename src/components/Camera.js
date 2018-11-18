import React, { Component } from 'react';
import * as ml5 from "ml5";
import PrimarySearchAppBar from './top-bar';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import banana from './css/banana.jpg';
import FoodClasses from '../FoodClasses.js';
import {Bar} from 'react-chartjs-2';
import './css/styles.css';
 import Loader from 'react-loader-spinner'


const TOGGLE_BACK = 'fa-toggle-on';
const TOGGLE_FRONT = 'fa-toggle-off';

const IMAGE_CAPTURE = 'take-image-btn';
const SHOW_CAMERA = 'show-camera'
const DETAILS = 'show-details';

class Cameras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictions: '',
            idealFacingMode: FACING_MODES.ENVIRONMENT,
            toggleStatus: TOGGLE_FRONT,
            view: IMAGE_CAPTURE,
            imageUri:"",
            recognized: [],
            labels: ['Cholesterol', 'Fat', 'Fiber' ],
            labelsRemain: ['Carbohydrate', 'Sugars'],
            showChart: false,
            notFood: false,
            item: 'default item',
            data: {},
            dataFetched: false,
            itemName: ''
        }
        this.renderButtons = this.renderButtons.bind(this);
    }
    componentDidMount() {
        this.classifyImg();
    }
    renderButtons() {
        if (this.state.view === SHOW_CAMERA)
            return (
                <div>
                    <button className="click-btn" onClick={(e) => {
                        this.setState({ 
                            idealFacingMode: this.state.idealFacingMode === FACING_MODES.USER ? FACING_MODES.ENVIRONMENT : FACING_MODES.USER,
                            toggleStatus: this.state.toggleStatus === TOGGLE_FRONT ? TOGGLE_BACK : TOGGLE_FRONT 
                        });
                    }}> <i className={"fas "+ this.state.toggleStatus}></i> </button>

                   
                </div>
        );
    } 

    classifyImg = () => {
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
        function modelLoaded() {
            console.log('Model Loaded!');
        }
        const image = document.getElementById('image');
        classifier.predict(image, 5, function (err, results) {
            return results;
        })
            .then((results) => {
                console.log(results[0].className);
                this.setState({
                    itemName: results[0].className.split(",")[0],
                    dataFetched: true
                })
                if (FoodClasses.includes(results[0].className.split(",")[0])) {
                    this.setState({ predictions: '' })
                    var appID = "35e05ce5";
                    var appKey = "0a5905000234132f23635886b865cc48";
                    var base = "https://trackapi.nutritionix.com/v2/natural/nutrients";

                    var d = {
                        "query": results[0].className,
                        "timezone": "US/Eastern"
                    }
                    var headers = {
                        'Content-Type': 'application/json',
                        'x-app-id': appID,
                        'x-app-key': appKey
                    }
                    axios.post(base, d, { headers: headers })
                        .then((response) => {
                            let dat = 
                            this.setState(
                                {
                                    recognized: response.data.foods,
                                    showChart: true,
                                    notFood: false,
                                    data : {
                                        labels: this.state.labels,
                                        datasets: [
                                            {
                                                label: 'Product Content',
                                                backgroundColor: 'rgba(255,99,132,0.2)',
                                                borderColor: 'rgba(255,99,132,1)',
                                                borderWidth: 1,
                                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                                hoverBorderColor: 'rgba(255,99,132,1)',
                                                data: [
                                                    
                                                    response.data.foods[0].nf_cholesterol,
                                                    response.data.foods[0].nf_total_fat,
                                                    response.data.foods[0].nf_dietary_fiber,
                                                ]
                                            }
                                        ]
                                    },
                                    dataRemain : {
                                        labels: this.state.labelsRemain,
                                        datasets: [
                                            {
                                                label: 'Product Content',
                                                backgroundColor: 'rgba(255,99,132,0.2)',
                                                borderColor: 'rgba(255,99,132,1)',
                                                borderWidth: 1,
                                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                                hoverBorderColor: 'rgba(255,99,132,1)',
                                                data: [
                                                    response.data.foods[0].nf_total_carbohydrate,
                                                    response.data.foods[0].nf_sugars
                                                ]
                                            }
                                        ]
                                    }
                                }
                            )
                        
                            console.log(this.state.data)
                            console.log(response.data.foods)
                            console.log(this.state.recognized.length)

                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
                else {
                    console.log('not known')
                    this.setState({
                        notFood: true,
                        item: results[0].className.split(",")[0],
                        recognized: []
                    })
                }
            })
    }
    onTakePhoto(dataUri) {
        
        this.setState({
            view: DETAILS,
            imageUri: dataUri
        })
        this.classifyImg();
    }
    render() {
        require('./css/styles.css');
        let section, sectionP
        

        if (this.state.view === SHOW_CAMERA){
            section = <Camera
                    idealFacingMode={this.state.idealFacingMode}
                    isImageMirror={true}
                    onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                />;
        }
        else if(this.state.view === IMAGE_CAPTURE){
            section = <div className="camera-btn-wrapper">
                <div className="camera-contain">
                    <button className="camera-btn" onClick={() => {this.setState({view: SHOW_CAMERA})}} >
                        <i className="fas fa-camera"></i>
                    </button>
                </div>
                  <div className="click-text"><p>Press to click</p></div>
            </div>
        }
        else if(this.state.view === DETAILS) {
            if (this.state.dataFetched){
            sectionP = 
            <div className="view-details-wrapper">
            <div className="view-image">
                        <img src={this.state.imageUri} id="image-object" alt=""/>

                    </div>
            <div className="camera-contain">
                <button className="camera-btn small" onClick={()=>{window.location.reload()}}>
                <i className="fas fa-camera"></i>
                </button>
            </div>
                    <div className="details-section">

                        <div className="details-top"> 
                            <p id="class-identify">{this.state.itemName}</p>
                            <p className="head"> was identfied</p>   
                        </div>
                    </div>
                    </div>;
                }
            if (this.state.recognized.length > 0 ){
                
                    section = <div>
                    <div className="sec-detail">
                        <h4>Product Standards</h4>
                        <div className="flex">
                            <div className="flex-item">
                                <p className="text-dd">Quatity: </p>
                                <p className="content-dd">{this.state.recognized[0].serving_qty}</p>
                            </div>
                            <div className="flex-item">
                                <p className="text-dd">Unit: </p>
                                <p className="content-dd">{this.state.recognized[0].serving_unit}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-bar">
                    <div className="height-all">
                        <Bar data={this.state.data} width={100} height={20} options={{maintainAspectRatio: false}}/>
                    </div>
                    <div className="height-all">
                        <Bar data={this.state.dataRemain} width={100} height={20} options={{maintainAspectRatio: false}}/> 
                    </div>
                    </div>
                    </div>
                
            }
            else if(!this.state.dataFetched) {
                section = <div className="loader-wrapper">
                    <div className="load-er">
                    <Loader 
                     type="ThreeDots"
                     color="#00BFFF"
                     height="100"   
                     width="100"
                  />   
                  </div>
                  </div>
            }

        }


        return (
            <div className="App">
                <PrimarySearchAppBar />
                {this.renderButtons()}
                  
                    { sectionP }
                { section }
                <img src={this.state.imageUri} id="image" width="400" alt="" style={{display: "none"}}/>

                {/* {predictions} */}

             

            </div>
        );
    }
}

export default Cameras;