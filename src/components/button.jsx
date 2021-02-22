import React from 'react'
import './key.css'

class button extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.element = props.kwargs;
        this.x = props.clear;
        this.a = props.add;
        this.e = props.evaluate;
        this.state = {last: props.q};
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
        this.a(this.element.text);
    }
}

export class OperatorKey extends button{
    constructor(props){
        super(props);
        this.p = props;
    }
    process(){
        switch(this.element.key){
            case 'Backspace':
                this.x();
                break;
            case '=':
                this.e()
                break;
            default:
                // this.a(this.element.text, this.state.last);
                this.a(this.element.key, this.state.last);
       }
    }
}

export default NumberKey;
