import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

class Detailed extends Component{
    constructor(props){
        super(props)
        this.state={
            labels: ['Cholesterol', 'Fat', 'Fiber' ],
            labelsRemain: ['Carbohydrate', 'Sugars'],
        }
    }
    render(){
        require('./css/styles.css')
        console.log('indetailed');
        console.log(this.props);
        console.log('in detailed');
        var { data } = this.props;
        console.log(data)
        var graphData  = {
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
                        
                        data[0].nf_cholesterol,
                        data[0].nf_total_fat,
                        data[0].nf_dietary_fiber,
                    ]
                }
            ]
        }
        var dataRemain = {
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
                        data[0].nf_total_carbohydrate,
                        data[0].nf_sugars
                    ]
                }
            ]
        }
        return(
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center', marginTop: '20px'}}>
                    <img src={data[0].photo.thumb} />
                </div>
                
                <Button className="btn-search" variant="contained" color="primary" onClick={this.props.toggle}>
                    <i class="fas fa-search"></i>
                </Button>
               
                <div className="view-details-wrapper">
                    <div className="details-section">

                        <div className="details-top"> 
                            <p id="class-identify">{data[0].food_name}</p>
                            <p className="head"> was identfied</p>   
                        </div>
                        
                    </div>
                    
                    <div className="sec-detail">
                        <h4>Product Standards</h4>
                        <div className="flex">
                            <div className="flex-item">
                                <p className="text-dd">Quatity: </p>
                                <p className="content-dd">{data[0].serving_qty}</p>
                            </div>
                            <div className="flex-item">
                                <p className="text-dd">Unit: </p>
                                <p className="content-dd">{data[0].serving_unit}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-bar">
                    <div className="height-all">
                    <Bar data={graphData} width={100} height={20} options={{maintainAspectRatio: false}}/>
                    </div>
                    <div className="height-all">
                        <Bar data={dataRemain} width={100} height={20} options={{maintainAspectRatio: false}}/> 
                    </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
export default Detailed;