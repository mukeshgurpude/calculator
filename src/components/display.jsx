import React from 'react'
import './display.css'

class Display extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return <>
            <div id="display">{this.props.text}</div>
        </>
    }
}

export default Display;
