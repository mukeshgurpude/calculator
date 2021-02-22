import React from 'react'
import './error.css'

class CalcError extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    render(){
        return <>
                <div id="error_block" style={{display: this.props.display?'flex':'none'}}>
                    <p>{this.props.e}</p>
                    <span className="close" onClick={this.props.remove}>×</span>
                </div>
            </>
    }
}

export default CalcError;
