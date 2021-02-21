import React from 'react'
import './key.css'

class button extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.element = props.kwargs;
        this.process = this.process.bind(this)
        this.addlisteners = this.addlisteners.bind(this);
        this.listener = this.listener.bind(this)
    }

    componentDidMount(){
        this.DOMelement = document.getElementById(this.element.id);
        this.addlisteners();
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.listener)
    }

    addlisteners(){
        window.addEventListener('keydown', this.listener)
    }

    listener(e){
        const a = this.DOMelement;
        const b = this.element;
        if(b.key === e.key || b.alterKey === e.key){a.click()};
    }

    process(){
        console.count('Default')
    }

    render (){
        const classes = `calc-key ${this.element.double?'double':''}`;
        return <>
            <button className={classes} id={this.element.id} onClick={this.process}>{this.element.text}</button>
        </>
    }
}

export class NumberKey extends button{
    constructor(props){
        super(props);
        this.p = "";
    }
    process(e){
        console.log('Number key pressed: ', this.element.text)
    }
}

export class OperatorKey extends button{
    constructor(props){
        super(props);
        this.p = '';
    }
    process(){
        console.log('Utility Key: ', this.element.text)
    }
}

export default NumberKey;
