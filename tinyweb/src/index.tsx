import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TinyDag from './components/tinydag';
import { Drawer } from 'antd';
const GraphCard = (props) => {

  return <div className="GraphCard"><div className={`state ${props.state}`}></div><div className="text">{props.name}</div></div>
}
ReactDOM.render(
  // <React.StrictMode>
  <div><TinyDag /><Drawer
    title="Basic Drawer"
    placement="right"
    closable={true}
    mask={false}
    width={300}
    // onClose={onClose}
    visible={true}
  >
    <p><b>Waiting</b></p>
    <GraphCard name="asdfdsf" state="waiting" />
    <GraphCard name="asdfdsf" state="waiting" />
    <p><b>Running</b></p>
    <GraphCard name="asdfdsf" state="running" />
    <GraphCard name="asdfdsf" state="running" />
    <p><b>Failure</b></p>
    <GraphCard name="asdfdsf" state="failure" />
    <GraphCard name="asdfdsf" state="failure" />
    <p><b>Success</b></p>
    <GraphCard name="asdfdsf" state="success" />
    <GraphCard name="asdfdsf" state="success" />
  </Drawer></div>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
