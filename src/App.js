import logo from './logo.svg';
import React from 'react'
import './App.css';
import {NumberKey, OperatorKey} from "./components/button"
import Display from './components/display'

const buttons = [
    {
      text: 7,
      keyCode: [103],
      double: false,
      id: 'seven',
      isNumber: true,
      key: '7'
    },
    {
      text: 8,
      keyCode: [104],
      double: false,
      id: 'eight',
      isNumber: true,
      key: '8'
    },
    {
      text: 9,
      keyCode: [105],
      double: false,
      id: 'nine',
      isNumber: true,
      key: '9'
    },
    {
      text: 'AC',
      keyCode: [8],
      double: true,
      id: 'clear',
      isNumber: false,
      key: 'Backspace'
    },
    {
      text: 4,
      keyCode: [100],
      double: false,
      id: 'four',
      isNumber: true,
      key: '4'
    },
    {
      text: 5,
      keyCode: [101],
      double: false,
      id: 'five',
      isNumber: true,
      key: '5'
    },
    {
      text: 6,
      keyCode: [102],
      double: false,
      id: 'six',
      isNumber: true,
      key: '6'
    },
    {
      text: '÷',
      keyCode: [111],
      shiftKey: 191,
      double: false,
      id: 'divide',
      isNumber: false,
      key: '/'
    },
    {
      text: 'x',
      keyCode: [106],
      shiftKey: 56,
      double: false,
      id: 'multiply',
      isNumber: false,
      key: '*'
    },
    {
      text: 1,
      keyCode: [97],
      double: false,
      id: 'one',
      isNumber: true,
      key: '1'
    },
    {
      text: 2,
      keyCode: [98],
      double: false,
      id: 'two',
      isNumber: true,
      key: '2'
    },
    {
      text: 3,
      keyCode: [99],
      double: false,
      id: 'three',
      isNumber: true,
      key: '3'
    },
    {
      text: '+',
      keyCode: [107],
      shiftKey: 187,
      double: false,
      id: 'add',
      isNumber: false,
      key: '+'
    },
    {
      text: '-',
      keyCode: [109, 189],
      double: false,
      id: 'subtract',
      isNumber: false,
      key: '-'
    },
    {
      text: 0,
      keyCode: [96],
      double: false,
      id: 'zero',
      isNumber: true,
      key: '0'
    },
    {
      text: '.',
      keyCode: [110, 190],
      double: false,
      id: 'decimal',
      isNumber: true,
      key: '.'
    },
    {
      text: '^',
      shiftKey: [54],
      double: false,
      id: 'power',
      isNumber: false,
      key: '^'
    },
    {
      text: '=',
      keyCode: [187, 13],
      double: true,
      id: 'equals',
      isNumber: false,
      key: '=',
      alterKey: 'Enter'
    }
  ];

/*
Layout:

|-------------------|
| Header |          |
| Header | Display  |
| Header |          |
|-------------------|
| 7 | 8 | 9 |  AC   |
| 4 | 5 | 6 | ÷ | x |
| 1 | 2 | 3 | + | - |
| . | 0 | ^ |   =   |
|-------------------|

*/

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        expression: "0",
      };
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  clearDisplay(){
    this.setState(state=>({
      ...state,
      expression: '0'
    }))
  }

  addToDisplay(ch){
    this.setState(state=>({
      ...state,
      expression: state.expression + ch
    }))
  }

  render() {
    return (
      <>
      <header className="display__wrapper">
        <div><img src={logo} alt="logo"/></div>
        <Display text={this.state.expression}/>
      </header>
      <div id="keys">
        {
          buttons.map(button=>{
            if(button.isNumber) return <NumberKey kwargs={button} key={button.id}/>
            return <OperatorKey kwargs={button} key={button.id} clear={this.clearDisplay}/>
          })
        }
      </div>
      </>
    );
  }
}

export default App;
