import { Graph, Edge, Shape, NodeView } from '@antv/x6'
import React from 'react';
import './tinydag.scss';
import { DagreLayout } from '@antv/layout';
import { ReactShape } from '@antv/x6-react-shape';
import '@antv/x6-react-shape';
import { Tooltip, Popover, Button } from 'antd';
import ReactDOM from 'react-dom';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { AlignRightOutlined, MinusCircleOutlined } from '@ant-design/icons';

// const data = {
//     "name": "cluster<__main__.DAG object at 0x7f3946f4e750>",
//     "nodes": {
//         "<__main__.Task object at 0x7f3946f4e810>add": {
//             "label": "<__main__.Task object at 0x7f3946f4e810>add",
//             "name": "<__main__.Task object at 0x7f3946f4e810>add",
//             "_type": "function",
//             "_id": "<__main__.Task object at 0x7f3946f4e810>add",
//             "_name": "add"
//         },
//         "<__main__.EndTask object at 0x7f3946f4e710>mul": {
//             "label": "<__main__.EndTask object at 0x7f3946f4e710>mul",
//             "name": "<__main__.EndTask object at 0x7f3946f4e710>mul",
//             "_type": "function",
//             "_id": "<__main__.EndTask object at 0x7f3946f4e710>mul",
//             "_name": "mul"
//         },
//         "<__main__.DAG object at 0x7f3946f4e750>add": {
//             "label": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "name": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "_type": "variable",
//             "_id": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "_name": "add"
//         },
//         "<__main__.DAG object at 0x7f3946f4e750>a": {
//             "label": "<__main__.DAG object at 0x7f3946f4e750>a",
//             "name": "<__main__.DAG object at 0x7f3946f4e750>a",
//             "_type": "variable",
//             "_id": "<__main__.DAG object at 0x7f3946f4e750>a",
//             "_name": "a"
//         },
//         "<__main__.DAG object at 0x7f3946f4e750>sub": {
//             "label": "<__main__.DAG object at 0x7f3946f4e750>sub",
//             "name": "<__main__.DAG object at 0x7f3946f4e750>sub",
//             "_type": "variable",
//             "_id": "<__main__.DAG object at 0x7f3946f4e750>sub",
//             "_name": "sub"
//         },
//         "<__main__.DAG object at 0x7f3946f4e750>mul": {
//             "label": "<__main__.DAG object at 0x7f3946f4e750>mul",
//             "name": "<__main__.DAG object at 0x7f3946f4e750>mul",
//             "_type": "variable",
//             "_id": "<__main__.DAG object at 0x7f3946f4e750>mul",
//             "_name": "mul"
//         }
//     },
//     "edges": [
//         {
//             "label": null,
//             "tail_name": "<__main__.Task object at 0x7f3946f4e810>add",
//             "head_name": "<__main__.DAG object at 0x7f3946f4e750>add"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f3946f4e750>a",
//             "head_name": "<__main__.Task object at 0x7f3946f4e810>add"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f39471cf150>mul",
//             "head_name": "<__main__.DAG object at 0x7f3946f4e750>sub"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "head_name": "<__main__.DAG object at 0x7f39471cf150>a"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "head_name": "<__main__.DAG object at 0x7f39471cf150>b"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.EndTask object at 0x7f3946f4e710>mul",
//             "head_name": "<__main__.DAG object at 0x7f3946f4e750>mul"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f3946f4e750>add",
//             "head_name": "<__main__.EndTask object at 0x7f3946f4e710>mul"
//         },
//         {
//             "label": null,
//             "tail_name": "<__main__.DAG object at 0x7f3946f4e750>sub",
//             "head_name": "<__main__.EndTask object at 0x7f3946f4e710>mul"
//         }
//     ],
//     "subgraph": [
//         {
//             "name": "cluster<__main__.DAG object at 0x7f39471cf150>",
//             "nodes": {
//                 "<__main__.Task object at 0x7f3946f4e590>sub": {
//                     "label": "<__main__.Task object at 0x7f3946f4e590>sub",
//                     "name": "<__main__.Task object at 0x7f3946f4e590>sub",
//                     "_type": "function",
//                     "_id": "<__main__.Task object at 0x7f3946f4e590>sub",
//                     "_name": "sub"
//                 },
//                 "<__main__.Task object at 0x7f3946f4e5d0>truediv": {
//                     "label": "<__main__.Task object at 0x7f3946f4e5d0>truediv",
//                     "name": "<__main__.Task object at 0x7f3946f4e5d0>truediv",
//                     "_type": "function",
//                     "_id": "<__main__.Task object at 0x7f3946f4e5d0>truediv",
//                     "_name": "truediv"
//                 },
//                 "<__main__.EndTask object at 0x7f39471cd750>mul": {
//                     "label": "<__main__.EndTask object at 0x7f39471cd750>mul",
//                     "name": "<__main__.EndTask object at 0x7f39471cd750>mul",
//                     "_type": "function",
//                     "_id": "<__main__.EndTask object at 0x7f39471cd750>mul",
//                     "_name": "mul"
//                 },
//                 "<__main__.DAG object at 0x7f39471cf150>sub": {
//                     "label": "<__main__.DAG object at 0x7f39471cf150>sub",
//                     "name": "<__main__.DAG object at 0x7f39471cf150>sub",
//                     "_type": "variable",
//                     "_id": "<__main__.DAG object at 0x7f39471cf150>sub",
//                     "_name": "sub"
//                 },
//                 "<__main__.DAG object at 0x7f39471cf150>a": {
//                     "label": "<__main__.DAG object at 0x7f39471cf150>a",
//                     "name": "<__main__.DAG object at 0x7f39471cf150>a",
//                     "_type": "variable",
//                     "_id": "<__main__.DAG object at 0x7f39471cf150>a",
//                     "_name": "a"
//                 },
//                 "<__main__.DAG object at 0x7f39471cf150>div": {
//                     "label": "<__main__.DAG object at 0x7f39471cf150>div",
//                     "name": "<__main__.DAG object at 0x7f39471cf150>div",
//                     "_type": "variable",
//                     "_id": "<__main__.DAG object at 0x7f39471cf150>div",
//                     "_name": "div"
//                 },
//                 "<__main__.DAG object at 0x7f39471cf150>b": {
//                     "label": "<__main__.DAG object at 0x7f39471cf150>b",
//                     "name": "<__main__.DAG object at 0x7f39471cf150>b",
//                     "_type": "variable",
//                     "_id": "<__main__.DAG object at 0x7f39471cf150>b",
//                     "_name": "b"
//                 },
//                 "<__main__.DAG object at 0x7f39471cf150>mul": {
//                     "label": "<__main__.DAG object at 0x7f39471cf150>mul",
//                     "name": "<__main__.DAG object at 0x7f39471cf150>mul",
//                     "_type": "variable",
//                     "_id": "<__main__.DAG object at 0x7f39471cf150>mul",
//                     "_name": "mul"
//                 }
//             },
//             "edges": [
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.Task object at 0x7f3946f4e590>sub",
//                     "head_name": "<__main__.DAG object at 0x7f39471cf150>sub"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.DAG object at 0x7f39471cf150>a",
//                     "head_name": "<__main__.Task object at 0x7f3946f4e590>sub"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.Task object at 0x7f3946f4e5d0>truediv",
//                     "head_name": "<__main__.DAG object at 0x7f39471cf150>div"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.DAG object at 0x7f39471cf150>b",
//                     "head_name": "<__main__.Task object at 0x7f3946f4e5d0>truediv"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.EndTask object at 0x7f39471cd750>mul",
//                     "head_name": "<__main__.DAG object at 0x7f39471cf150>mul"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.DAG object at 0x7f39471cf150>div",
//                     "head_name": "<__main__.EndTask object at 0x7f39471cd750>mul"
//                 },
//                 {
//                     "label": null,
//                     "tail_name": "<__main__.DAG object at 0x7f39471cf150>sub",
//                     "head_name": "<__main__.EndTask object at 0x7f39471cd750>mul"
//                 }
//             ],
//             "subgraph": []
//         }
//     ]
// };

const NODE2PORT = {};
class GraphProxy {
    public nodes = [];
    public edges = [];
    addNode(node: any) {
        this.nodes.push(node);
        return node;
    }
    addEdge(edge: any) {
        this.edges.push(edge);
        return edge;
    }
    getCellById(id: string) {
        for (var i = 0; i < this.nodes.length; i++) {
            var v = this.nodes[i];
            if (v['id'] == id) {
                return v;
            }
        }
    }
}

(window as any).variables = [];
// try {
// Graph.unregisterReactComponent("variable");
// Graph.unregisterReactComponent("variableProduct");
// Graph.unregisterReactComponent("function");
const State = (props) => {
    return <Tooltip title={JSON.stringify(props.state)}><div className={"StateDot " + props.state['state']}></div></Tooltip>
}
const nodeComponent = {
    variable(node) {
        const data: any = node.prop('data')
        const lastState = data.state && data.state.length > 0 ? data.state.slice(-1)[0]['state'] : ""
        const value = data.state && data.state.length > 0 ? data.state.slice(-1)[0]['value'] : undefined
        const content = (
            <div>
                {data._name && <p><b>Name:</b> {data._name}</p>}
                {data._type && <p><b>Type:</b> {data._type}</p>}
                {data._id && <p><b>ID:</b> {data._id}</p>}
                {value && <p><b>Value:</b> {value}</p>}
                {/* {data.state && <p><b>State:</b> {JSON.stringify(data.state)}</p>} */}
                {data.state && <div><b>State:</b> {data.state.map((s, i, arr) => { return <State state={s} key={i} /> })}</div>}
            </div>
        );

        let r = (<div id={data._id}>
            <div className='var' >
                <Popover placement="rightBottom" content={content} >
                    <div className={'container ' + lastState}>{data._name}</div>
                </Popover>
            </div></div>);
        return r;
    },
    variableProduct(node) {
        const data: any = node.prop('data')
        return (<div id={data._id}><div className='varProduct' ><div className="container">{data._name}</div></div></div>)
    },
    function(node) {
        const data: any = node.prop('data')
        const lastState = data.state && data.state.length > 0 ? data.state.slice(-1)[0]['state'] : ""
        const lState = data.state && data.state.length > 0 ? data.state.slice(-1)[0] : undefined
        const content = (
            <div>
                <p><b>Func: </b>{data._name}</p>
                {data.func && <p><b>Desc: </b>{data.func}</p>}
                <p><b>Args:</b> {data.args}</p>

                {data.sources && <p><b>Sources:</b> {data.sources}</p>}
                {data.module && <p><b>Module:</b> {data.module}</p>}
                {data.sourcefile && <p><b>File:</b> {data.sourcefile}</p>}
                {data._type && <p><b>Type:</b> {data._type}</p>}
                {data._id && <p><b>ID:</b> {data._id}</p>}
                {data.tasktype && <p><b>Task:</b> {data.tasktype}</p>}
                {data.state && <div><b>State:</b> {data.state.map((s, i, arr) => { return <State state={s} key={i} /> })}</div>}
                {lState && lState['delta'] && <div><b>Delta:</b> {lState['delta']}s</div>}
                {/* {data.state && <p><b>State:</b> {JSON.stringify(data.state)}</p>} */}
            </div>
        );
        return (<Popover placement="rightBottom" content={content} >
            <div className='function' ><span className={"state " + lastState}></span>
                <span style={{ fontWeight: 700 }}>{data._name}{data.args}
                {data.tasktype && data.tasktype == "MultiProcessTask" && <AlignRightOutlined rotate={-90} className="TitleIcon" />}
                {/* {data.tasktype && data.tasktype == "EndTask" && <MinusCircleOutlined className="TitleIcon" />} */}
                </span><br />@{data.module}</div></Popover>)
    }
}

// } catch (e) {

// }
const TinyDag = (props: any) => {
    const container = React.useRef<HTMLDivElement>(null);
    const [graphData, setGraphData] = React.useState<Object>(null);
    const [variableState, setVariableState] = React.useState<Object>(null);
    const [taskState, setTaskState] = React.useState<Object>(null);
    const [graphInstance, setGraphInstance] = React.useState<Object>(null);

    function getEdgeTerminalKey(obj) {
        if (typeof (obj) == "object") {
            return obj['cell'];
        }
        return obj;
    }
    function layoutSonsOf(layout, data, parent) {
        let nodesMapper = {};
        data['nodes'].forEach((v, i, arr) => {
            nodesMapper[v['id']] = v;
        })
        let _nodes = data['nodes'].filter((e, i, arr) => {
            return e['parent'] == parent;
        });
        let _edges = data['edges'].filter((e, i, arr) => {
            return nodesMapper[getEdgeTerminalKey(e['source'])]['parent'] == parent && nodesMapper[getEdgeTerminalKey(e['target'])]['parent'] == parent
        });
        let _edges_outter = data['edges'].filter((e, i, arr) => {
            return !(nodesMapper[getEdgeTerminalKey(e['source'])]['parent'] == parent && nodesMapper[getEdgeTerminalKey(e['target'])]['parent'] == parent)
        });
        let _edges_new = []
        _edges.forEach((v, i, arr) => {
            _edges[i]['_source'] = _edges[i]['source'];
            _edges[i]['source'] = getEdgeTerminalKey(_edges[i]['source']);

            _edges[i]['_target'] = _edges[i]['target'];
            _edges[i]['target'] = getEdgeTerminalKey(_edges[i]['target']);
            _edges_new.push([_edges[i], _edges[i]['source'], _edges[i]['target']]);
        });
        // (window as any)._edges_new = _edges_new
        let ndata = layout.layout({ nodes: _nodes, edges: _edges });
        _edges = ndata['edges'];
        _edges.forEach((v, i, arr) => {
            _edges[i]['source'] = _edges[i]['_source'];
            _edges[i]['target'] = _edges[i]['_target'];
        });
        ndata['nodes'].forEach((v, i, arr) => {
            nodesMapper[v['id']] = v;
        })
        data['nodes'] = Object.values(nodesMapper);
        data['edges'] = [...ndata['edges'], ..._edges_outter]
        return data;
    }
    function layoutIgnorePort(layout, data) {
        let _edges = data.edges;
        _edges.forEach((v, i, arr) => {
            _edges[i]['_source'] = _edges[i]['source'];
            _edges[i]['source'] = getEdgeTerminalKey(_edges[i]['source']);

            _edges[i]['_target'] = _edges[i]['target'];
            _edges[i]['target'] = getEdgeTerminalKey(_edges[i]['target']);
        });
        // (window as any)._edges_new = _edges_new
        let ndata = layout.layout({ nodes: data.nodes, edges: _edges });
        _edges = ndata['edges'];
        _edges.forEach((v, i, arr) => {
            _edges[i]['source'] = _edges[i]['_source'];
            _edges[i]['target'] = _edges[i]['_target'];
        });
        data['nodes'] = ndata.nodes;
        data['edges'] = _edges;
        return data;
    }
    function drawGraph(graph, data) {
        // let rootName = data['name'];
        // let root = graph.addNode({
        //     id: rootName,
        //     width: 300,
        //     height: 200,
        //     label: rootName,
        //     zIndex: 8,
        //     children: [],
        //     ports: {
        //         items: [], groups: {
        //             in: {
        //                 position: { name: 'top' },
        //                 attrs: {
        //                     fo: {
        //                         width: 12,
        //                         height: 12,
        //                         x: -6,
        //                         y: -6,
        //                         magnet: 'true',
        //                     },
        //                 },
        //                 zIndex: 1,
        //             },
        //             out: {
        //                 position: { name: 'bottom' },
        //                 attrs: {
        //                     fo: {
        //                         width: 12,
        //                         height: 12,
        //                         x: -6,
        //                         y: -6,
        //                         magnet: 'true',
        //                     },
        //                 },
        //                 zIndex: 1,
        //             },
        //         }
        //     },

        //     attrs: {
        //         body: {
        //             stroke: 'none',
        //             fill: '#2222',
        //         },
        //         label: {
        //             fill: '#fff',
        //             fontSize: 12,
        //         },
        //     }
        // });
        data.subgraph.forEach(data => {
            drawGraph(graph, data);
            // let _root = drawGraph(graph, data);
            // root.children.push(_root['id']);
            // _root.parent = root['id'];

        });

        Object.keys(data.nodes).forEach((v, i, arr) => {
            // if (data.nodes[v]['port']) {
            //     let o = graph.getCellById(data.nodes[v]['port_parent']);
            //     o.ports.items.push({ id: data.nodes[v]['port'], group: data.nodes[v]['group'] });
            //     NODE2PORT[data.nodes[v]['name']] = { cell: data.nodes[v]['port_parent'], port: data.nodes[v]['port'] };
            // } else {
            let isVariable = data.nodes[v]['_type'].indexOf('variable') >= 0;
            // if (data.nodes[v]['port']) {
            //     console.log("P:", data.nodes[v], v);
            //     return;
            // }
            let node = graph.addNode({
                id: data.nodes[v]['name'],
                height: isVariable ? 32 : 50,
                width: 280,
                label: data.nodes[v]['label'],
                zIndex: 10,
                shape: 'react-shape',
                component: nodeComponent[data.nodes[v]['_type']],
                // component(node) {
                //     const data = node.getData()
                //     return (<div>{node.prop('color')}{data['_id']}</div>)
                // },
                data: data.nodes[v],

                // shape: 'react-shape',
                // component: data.nodes[v]['_type'],

                // shape: 'html',
                // html() {
                //     const wrap = document.createElement('div')
                //     wrap.id = data.nodes[v]['_id']
                //     // wrap.style.width = '100%'
                //     // wrap.style.height = '100%'
                //     // wrap.style.background = '#f0f0f0'
                //     // wrap.style.display = 'flex'
                //     // wrap.style.justifyContent = 'center'
                //     // wrap.style.alignItems = 'center'

                //     // wrap.innerText = 'Hello'

                //     return wrap;
                // },

                // attrs: {
                //     body: {
                //         stroke: 'none',
                //         fill: '#3199FF',
                //     },
                //     label: {
                //         fill: '#fff',
                //         fontSize: 12,
                //     },
                // },
                // ports: {
                //     items: [], groups: {
                //         in: {
                //             position: { name: 'top' },
                //             attrs: {
                //                 fo: {
                //                     width: 12,
                //                     height: 12,
                //                     x: -6,
                //                     y: -6,
                //                     magnet: 'true',
                //                 },
                //             },
                //             zIndex: 1,
                //         },
                //         out: {
                //             position: { name: 'bottom' },
                //             attrs: {
                //                 fo: {
                //                     width: 12,
                //                     height: 12,
                //                     x: -6,
                //                     y: -6,
                //                     magnet: 'true',
                //                 },
                //             },
                //             zIndex: 1,
                //         },
                //     }
                // }
            });
            // node.prop('data', {"_name":"asfsadfsd"});
            // }
        });

        Object.keys(data.nodes).forEach((v, i, arr) => {
            NODE2PORT[v] = data.nodes[v];

        });
        // console.log("NN:", NODE2PORT);

        data['edges'].forEach(({ label, tail_name, head_name }) => {
            let tail_key = tail_name;
            let head_key = head_name;
            console.log(NODE2PORT, head_name);
            console.log(NODE2PORT[head_name]);
            let targetMark: any = NODE2PORT[head_name]['_type'] == 'function' ? {
                name: 'block',
                args: {
                    size: '4',
                }
            } : "";
            graph.addEdge({
                source: tail_name, target: head_name, router: {
                    name: 'manhattan', //'manhattan',
                    args: {
                        startDirections: ['bottom'],
                        endDirections: ['top'],
                    },
                },
                attrs: {
                    line: {
                        strokeWidth: 1,
                        stroke: '#808080',
                        sourceMarker: '',
                        targetMarker: targetMark,
                    }
                }

            });
            // }

        });
        // return root;

    }
    // 高亮
    const magnetAvailabilityHighlighter = {
        name: 'stroke',
        args: {
            attrs: {
                fill: '#fff',
                stroke: '#47C769',
            },
        },
    }
    const updateState = () => {
        fetch(`http://${window.location.hostname}:5000/state/test`).then(res => res.json()).then(data => {
            setVariableState(data['variable']);
            setTaskState(data['task']);
        });
        setTimeout(updateState, 1000);
    }
    React.useEffect(() => {

        fetch(`http://${window.location.hostname}:5000/schema/test`).then(res => res.json()).then(data => {
            setGraphData(data[0]);
        });
        updateState();
    }, [])
    React.useEffect(() => {
        if (graphInstance) {
            (graphInstance as any).getNodes().forEach((n, i, arr) => {
                if (taskState) {
                    if (n.prop("data")['_type'] == 'function') {
                        n.prop("data", { ...n.prop("data"), state: taskState[n['id']] });
                    }
                }

                if (variableState) {
                    if (n.prop("data")['_type'] == 'variable') {
                        n.prop("data", { ...n.prop("data"), state: variableState[n['id']] });
                    }
                }

            });
        }

    }, [graphInstance, variableState, taskState]);
    React.useEffect(() => {

        if (container && container.current && graphData) {
            // 画布
            const graph = new Graph({
                grid: { size: 15, visible: true },
                width: container.current.offsetWidth,
                height: container.current.offsetHeight,
                container: container.current,
                // highlighting: {
                //     magnetAvailable: magnetAvailabilityHighlighter,
                //     magnetAdsorbed: {
                //         name: 'stroke',
                //         args: {
                //             attrs: {
                //                 fill: '#fff',
                //                 stroke: '#31d0c6',
                //             },
                //         },
                //     },
                // },
                scroller: {
                    // enabled: true,
                    // pageVisible: true,
                    // pageBreak: true,
                    pannable: true,
                },
                mousewheel: {
                    enabled: true,
                    modifiers: ['ctrl', 'meta'],
                    minScale: 0.5,
                    maxScale: 2,
                },
                connecting: {
                    snap: true,
                    allowBlank: false,
                    allowLoop: false,
                    highlight: true,
                    connector: 'rounded',
                    connectionPoint: 'boundary',
                    router: {
                        name: 'er',
                        args: {
                            direction: 'V',
                        },
                    },
                },
            });

            // drawGraph(graph, data);
            // console.log(graph.toJSON());

            let g = new GraphProxy();
            console.log("GG", graphData);
            drawGraph(g, graphData);


            let model: any = { 'nodes': g.nodes, 'edges': g.edges }

            // console.log(model);
            let nodesMapper = {};
            model.nodes.forEach((node) => {
                nodesMapper[node['id']] = node;
            });




            const dagreLayout = new DagreLayout({
                type: 'dagre',
                rankdir: 'TB',
                align: 'UR',
                ranksep: 12,
                nodesep: 100,
            })
            // model = layoutSonsOf(dagreLayout, model, "cluster<__main__.DAG object at 0x7feaa8290090>")


            // model.nodes.reverse().forEach((node) => {
            //     let P = 20;
            //     if (node['children'] && node['children'].length > 0) {
            //         node['x'] = 10000;
            //         node['y'] = 10000;
            //         node['children'].forEach((childKey) => {
            //             let child = nodesMapper[childKey];
            //             if (child['x'] - P < node['x']) {
            //                 node['x'] = child['x'] - P
            //             }

            //             if (child['y'] - P < node['y']) {
            //                 node['y'] = child['y'] - P
            //             }
            //         })

            //         node['children'].forEach((childKey) => {
            //             let child = nodesMapper[childKey];
            //             if (child['x'] + child['width'] + P > node['x'] + node['width']) {
            //                 node['width'] = child['x'] + child['width'] + P - node['x']
            //             }

            //             if (child['y'] + child['height'] + P > node['y'] + node['height']) {
            //                 node['height'] = child['y'] + child['height'] + P - node['y']
            //             }
            //         })
            //     }
            // });

            // model = layoutSonsOf(dagreLayout, model, "cluster<__main__.DAG object at 0x7feaa8290390>")

            // model.nodes.reverse().forEach((node) => {
            //     let P = 20;
            //     if (node['children'] && node['children'].length > 0) {
            //         node['x'] = 10000;
            //         node['y'] = 10000;
            //         node['children'].forEach((childKey) => {
            //             let child = nodesMapper[childKey];
            //             if (child['x'] - P < node['x']) {
            //                 node['x'] = child['x'] - P
            //             }

            //             if (child['y'] - P < node['y']) {
            //                 node['y'] = child['y'] - P
            //             }
            //         })

            //         node['children'].forEach((childKey) => {
            //             let child = nodesMapper[childKey];
            //             if (child['x'] + child['width'] + P > node['x'] + node['width']) {
            //                 node['width'] = child['x'] + child['width'] + P - node['x']
            //             }

            //             if (child['y'] + child['height'] + P > node['y'] + node['height']) {
            //                 node['height'] = child['y'] + child['height'] + P - node['y']
            //             }
            //         })
            //     }
            model = layoutIgnorePort(dagreLayout, model);
            // model = dagreLayout.layout(model)
            // model.nodes.forEach((v, i, arr)=>{
            //     if (model.nodes[i]['id'].indexOf("|") < 0){
            //         // model.nodes[i].width = 30;
            //         // model.nodes[i].height = 30;
            //         model.nodes[i].x = model.nodes[i].x + (250 - 200) / 2;
            //     }
            // });

            model.nodes.forEach((v, i, arr) => {
                v.y = v.y - v.height / 2;
            });

            // (window as any).mmmmm = model;
            const nodes = {};
            // graph.fromJSON(model);
            model.nodes.forEach((n, i, ns) => {
                // console.log(n);
                nodes[n['id']] = graph.addNode(n);
            });

            model.edges.forEach((e, i, ns) => {
                graph.addEdge(e);
            });

            // model.nodes.forEach((n, i, ns) => {
            //     // console.log(n);
            //     nodes[n['id']] = graph.addNode(n);
            // });
            const updateData = (id, data) => {
                nodes[id].prop("data", { ...nodes[id].prop("data"), ...data });
            };
            (window as any).updateData = updateData;
            (window as any).graph = graph;
            setGraphInstance(graph);
            // graph.fromJSON(model);
            // graph.fromJSON(model);
            // graph.fromJSON(model);



            // graph.on('edge:mouseenter', ({ edge }) => {
            //     edge.addTools([
            //         'source-arrowhead',
            //         'target-arrowhead',
            //         {
            //             name: 'button-remove',
            //             args: {
            //                 distance: -30,
            //             },
            //         },
            //     ])
            // })

            // graph.on('edge:mouseleave', ({ edge }) => {
            //     edge.removeTools()
            // })
        }
    }, [graphData]);
    function aa() {

        (window as any).bb = ReactDOM.render(<div>hhhh</div>, document.getElementById('<__main__.DAG object at 0x7f3946f4e750>a'));
    }
    return <div>
        <div ref={container} className="TinyDagContainer"></div>
    </div>

}

export default TinyDag;