import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TinyDag from './components/tinydag';
import { Drawer } from 'antd';
import { WifiOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
const GraphCard = (props) => {

  return <div className="GraphCard"><div className={`state ${props.state}`}></div><div className="text">{props.name}</div></div>
}
ReactDOM.render(
  // <React.StrictMode>
  <div><TinyDag /><Drawer
    title={<div><WifiOutlined className="connected"/>GraphHistory</div>}
    className="GraphHistory"
    placement="right"
    closable={true}
    mask={false}
    width={300}
    // onClose={onClose}
    visible={true}
  >
    <p><b>Waiting</b></p>
    <GraphCard name="测试任务" state="waiting" />
    <GraphCard name="测试任务" state="waiting" />
    <p><b>Running</b></p>
    <GraphCard name="测试任务" state="running" />
    <GraphCard name="测试任务" state="running" />
    <p><b>Failure</b></p>
    <GraphCard name="测试任务" state="failure" />
    <GraphCard name="测试任务" state="failure" />
    <p><b>Success</b></p>
    <GraphCard name="测试任务" state="success" />
    <GraphCard name="测试任务" state="success" />
  </Drawer></div>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
