import { isCursorAtEnd } from '@testing-library/user-event/dist/utils';
import './App.css';
import { useState, useEffect } from 'react';
import {NumberFormatBase, NumericFormat, PatternFormat, getNumericCaretBoundary, getPatternCaretBoundary, numericFormatter, patternFormatter, removeNumericFormat, removePatternFormat, useNumericFormat, usePatternFormat } from 'react-number-format';


function App() {
  const [preState, setPreState] = useState("")
  const [curState, setCurState] = useState("")
  const [input, setInput] = useState("0")
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)



  const inputnum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return
    if (total) {
      setPreState("")
    }
    curState ? setCurState(pre => pre + e.target.innerText) : setCurState(e.target.innerText)
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState)
  }, [curState])

  useEffect(() => {
    setInput("0");
  }, [])



  const operatorType = (e) => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (curState === "") return
    if (preState !== "") {
      equals()
    } else {
      setPreState(curState);
      setCurState("")
    }
  };



  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true)
    };

    let cal
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;

      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;

      case "+":
        // eslint-disable-next-line no-unused-vars
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;

      default:
        return
    }
    setInput("")
    setPreState(cal)
    setCurState("")
  }


  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };



  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 * preState)) : setCurState(String(parseFloat(curState)/ 100));
   };




  const plusMinus = () => { 
    if(curState.charAt(0) === "-"){
      setCurState(curState.substring(1));
    }
    else{
      setCurState("-" + curState);
    }
  };




  return (
    <div className="container">
      <div className='wrapper'>
        <div className='screen'>{input !== "" || input === "0" ? <NumberFormatBase value={input} displayType={'text'} thosandSeparator={true} /> : <NumberFormatBase value={preState} displayType={'text'} thousandSeparator={true} />}</div>
        <div className='btn lightgray' onClick={reset}>AC</div>
        <div className='btn lightgray' onClick={percent}>%</div>
        <div className='btn lightgray' onClick={plusMinus}>+/-</div>
        <div className='btn orange' onClick={operatorType}>/</div>
        <div className='btn' onClick={inputnum}>7</div>
        <div className='btn' onClick={inputnum}>8</div>
        <div className='btn' onClick={inputnum}>9</div>
        <div className='btn orange' onClick={operatorType}>x</div>
        <div className='btn' onClick={inputnum}>4</div>
        <div className='btn' onClick={inputnum}>5</div>
        <div className='btn' onClick={inputnum}>6</div>
        <div className='btn orange' onClick={operatorType}>+</div>
        <div className='btn' onClick={inputnum}>1</div>
        <div className='btn' onClick={inputnum}>2</div>
        <div className='btn' onClick={inputnum}>3</div>
        <div className='btn orange' onClick={operatorType}>-</div>
        <div className='btn zero' onClick={inputnum}>0</div>
        <div className='btn' onClick={inputnum}>.</div>
        <div className='btn orange' onClick={equals}>=</div>


      </div>
    </div>
  );
}

export default App;