import logo from './logo.svg';
import React from 'react'
// import './App.css';
import {NumberKey, OperatorKey} from "./components/button"
import Display from './components/display'
import CalcError from './components/error_block'

const buttons = [
    { text: 7,
      keyCode: [103],
      double: false,
      id: 'seven',
      isNumber: true,
      key: '7'
    },
    { text: 8,
      keyCode: [104],
      double: false,
      id: 'eight',
      isNumber: true,
      key: '8'
    },
    { text: 9,
      keyCode: [105],
      double: false,
      id: 'nine',
      isNumber: true,
      key: '9'
    },
    { text: 'AC',
      keyCode: [8],
      double: true,
      id: 'clear',
      isNumber: false,
      key: 'Backspace'
    },
    { text: 4,
      keyCode: [100],
      double: false,
      id: 'four',
      isNumber: true,
      key: '4'
    },
    { text: 5,
      keyCode: [101],
      double: false,
      id: 'five',
      isNumber: true,
      key: '5'
    },
    { text: 6,
      keyCode: [102],
      double: false,
      id: 'six',
      isNumber: true,
      key: '6'
    },
    { text: '÷',
      keyCode: [111],
      shiftKey: 191,
      double: false,
      id: 'divide',
      isNumber: false,
      key: '/'
    },
    { text: 'x',
      keyCode: [106],
      shiftKey: 56,
      double: false,
      id: 'multiply',
      isNumber: false,
      key: '*'
    },
    { text: 1,
      keyCode: [97],
      double: false,
      id: 'one',
      isNumber: true,
      key: '1'
    },
    { text: 2,
      keyCode: [98],
      double: false,
      id: 'two',
      isNumber: true,
      key: '2'
    },
    { text: 3,
      keyCode: [99],
      double: false,
      id: 'three',
      isNumber: true,
      key: '3'
    },
    { text: '+',
      keyCode: [107],
      shiftKey: 187,
      double: false,
      id: 'add',
      isNumber: false,
      key: '+'
    },
    { text: '-',
      keyCode: [109, 189],
      double: false,
      id: 'subtract',
      isNumber: false,
      key: '-'
    },
    { text: 0,
      keyCode: [96],
      double: false,
      id: 'zero',
      isNumber: true,
      key: '0'
    },
    { text: '.',
      keyCode: [110, 190],
      double: false,
      id: 'decimal',
      isNumber: true,
      key: '.'
    },
    { text: '^',
      shiftKey: [54],
      double: false,
      id: 'power',
      isNumber: false,
      key: '^'
    },
    { text: '=',
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
        lastOp: false,
        error: null,
        showError: false
    };

    this.clearDisplay = this.clearDisplay.bind(this);
    this.addToDisplay = this.addToDisplay.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.displayError = this.displayError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  clearDisplay(){
    this.setState(state=>({
      ...state,
      expression: '0',
      lastOp: false
    }))
  }

  addToDisplay(ch, replace=false){

    const inte = (a, b) =>{
      a = String(a);
      a = a.replace(/^0*/, '');
      b = String(b);
      const last = /[\d.]+$/
      const c = String(this.state.expression).slice(-2);


      if(this.state.lastOp && isNaN(b)){
        if(c.length === 2 && isNaN(c[0])){
          const p = a.slice(0, -2) || '';
          // if(a[-1]) p.concat(a.slice(-1))
          // return p.concat(b).concat(a.slice(-1));
          return p.concat(b);
        }
        if(b === '-') return a.concat(b)
        return a.slice(0, -1).concat(b)
      }
      
      if(a.match(last) && a.match(last)[0].includes('.') && ch ==='.') return a;
      if (!isNaN(b)) return a.concat(b)
      return a.concat(b)
    }
    
    this.setState(state=>({
      ...state,
      expression: inte(state.expression, ch),
      lastOp: '+-x÷'.includes(ch)
    }))
  }

  evaluate(){
    let result;
    try{
      const nonSafe = /[a-wyz;]/;
      if(String(this.state.expression).match(nonSafe)){
        throw new Error('Dangerous input, kindly check your input..');
      }
      result = eval(String(this.state.expression).replace('x', '*').replace('÷', '/').replace('^', '**'));
    }catch(err){
      console.warn(err)
      result = this.state.expression;
      this.displayError(err.message);
    }

    this.setState(state=>({
      ...state,
      expression: result
    }))

  }

  // Extension
  displayError(m){
    this.setState(state=>({
      ...state,
      error: m,
      showError: true
    }))

    setTimeout(_=>{
      this.setState(state=>({...state, error: null, showError: false}))
    }, 5000);
  }

  hideError(){
    this.setState(state=>({...state, error: null, showError: false}))
  }

  render() {
    return (
      <>
      <header className="display__wrapper">
        <div><img src={logo} alt="logo"/></div>
        <Display text={this.state.expression} add={this.addToDisplay}/>
      </header>
      <div id="keys">
        {
          buttons.map(button=>{
            if(button.isNumber) return <NumberKey kwargs={button} key={button.id} add={this.addToDisplay}/>
            return <OperatorKey kwargs={button} key={button.id} clear={this.clearDisplay} add={this.addToDisplay} evaluate={this.evaluate} q={this.state.lastOp}/>
          })
        }
      </div>
      <CalcError e={this.state.error} display={this.state.showError} remove={this.hideError}></CalcError>
      </>
    );
  }
}

export default App;
