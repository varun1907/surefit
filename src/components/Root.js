import React, { Component } from 'react';
class Root extends Component{

    render(){
    	require('./css/index.css')
        return(
        	<div className="screen-wrap">
	            <div className="prod-wrapper">
	            	<p id="prod-name">
		            	<span className="prod-blue">Sure</span>
		            	<span className="prod-green">Fit</span>
	            	</p>
	            	<p class="text-desc">
	            		It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of 
	            	</p>
	            	<div className="btn-container">
	            		<div className="btn-item">
	            			<a href="/camera" className="btn-link">
	            			    <i class="fas fa-camera-retro"></i>
	            			Click</a>
	            		</div>
	            		<div className="btn-item">
	            			<a href="/text" className="btn-link">
	            				Type<i class="far fa-keyboard"></i>
			            		</a>
			            	</div>
	            	</div>
	            </div>
	        </div>
        );
    }
}
export default Root