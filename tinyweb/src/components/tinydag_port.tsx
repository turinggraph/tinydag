import { Graph, Edge, Shape, NodeView } from '@antv/x6'
import React from 'react';
import './tinydag.scss';
import { DagreLayout } from '@antv/layout';

const data = {
    'name': 'cluster<__main__.DAG object at 0x7feaa8290390>',
    'nodes': {
        'START': {
            'label': 'START', 'name': 'START',
        },
        'END': {
            'label': 'END', 'name': 'END',
        },
        '<__main__.Task object at 0x7feaa8290450>|add': {
            'label': '<__main__.Task object at 0x7feaa8290450>|add', 'name': '<__main__.Task object at 0x7feaa8290450>|add'
        }, '<__main__.EndTask object at 0x7feaa8290350>|mul': {
            'label': '<__main__.EndTask object at 0x7feaa8290350>|mul', 'name': '<__main__.EndTask object at 0x7feaa8290350>|mul'
        }, '<__main__.DAG object at 0x7feaa8290390>add': {
            'label': '<__main__.DAG object at 0x7feaa8290390>add', 'name': '<__main__.DAG object at 0x7feaa8290390>add', 'aa': 'asdf',
            'port_parent': '<__main__.Task object at 0x7feaa8290450>|add', 'port': 'out-1', 'group': 'out'
        }, '<__main__.DAG object at 0x7feaa8290390>a': {
            'label': '<__main__.DAG object at 0x7feaa8290390>a', 'name': '<__main__.DAG object at 0x7feaa8290390>a', 'aa': 'asdf',
            'port_parent': 'START', 'port': 'out-1', 'group': 'out'
        }, '<__main__.DAG object at 0x7feaa8290390>sub': {
            'label': '<__main__.DAG object at 0x7feaa8290390>sub', 'name': '<__main__.DAG object at 0x7feaa8290390>sub', 'aa': 'asdf',
            'port_parent': '<__main__.EndTask object at 0x7feaa8290350>|mul', 'port': 'in-1', 'group': 'in'
        }, '<__main__.DAG object at 0x7feaa8290390>mul': {
            'label': '<__main__.DAG object at 0x7feaa8290390>mul', 'name': '<__main__.DAG object at 0x7feaa8290390>mul',
            'port_parent': '<__main__.EndTask object at 0x7feaa8290350>|mul', 'port': 'out-1', 'group': 'out'
        }
    }, 'edges': [
        {
            'label': null, 'tail_name': '<__main__.Task object at 0x7feaa8290450>|add', 'head_name': '<__main__.DAG object at 0x7feaa8290390>add'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290390>a', 'head_name': '<__main__.Task object at 0x7feaa8290450>|add'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>mul', 'head_name': '<__main__.DAG object at 0x7feaa8290390>sub'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290390>add', 'head_name': '<__main__.DAG object at 0x7feaa8290090>a'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290390>add', 'head_name': '<__main__.DAG object at 0x7feaa8290090>b'
        },
        {
            'label': null, 'tail_name': '<__main__.EndTask object at 0x7feaa8290350>|mul', 'head_name': '<__main__.DAG object at 0x7feaa8290390>mul'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290390>add', 'head_name': '<__main__.EndTask object at 0x7feaa8290350>|mul'
        },
        {
            'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290390>sub', 'head_name': '<__main__.EndTask object at 0x7feaa8290350>|mul'
        },
        {
            'label': null, 'head_name': 'END', 'tail_name': '<__main__.DAG object at 0x7feaa8290390>mul'
        },
    ], 'subgraph': [
        {
            'name': 'cluster<__main__.DAG object at 0x7feaa8290090>',
            'nodes': {
                '<__main__.Task object at 0x7feaa82901d0>|sub': {
                    'label': '<__main__.Task object at 0x7feaa82901d0>|sub', 'name': '<__main__.Task object at 0x7feaa82901d0>|sub'
                }, '<__main__.Task object at 0x7feaa8290210>|truediv': {
                    'label': '<__main__.Task object at 0x7feaa8290210>|truediv', 'name': '<__main__.Task object at 0x7feaa8290210>|truediv'
                }, '<__main__.EndTask object at 0x7feaa8288d50>|mul': {
                    'label': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
                }, '<__main__.DAG object at 0x7feaa8290090>sub': {
                    'label': '<__main__.DAG object at 0x7feaa8290090>sub', 'name': '<__main__.DAG object at 0x7feaa8290090>sub', 'aa': 'asdf',
                    'port_parent': '<__main__.Task object at 0x7feaa82901d0>|sub', 'port': 'out-1', 'group': 'out'
                }, '<__main__.DAG object at 0x7feaa8290090>a': {
                    'label': '<__main__.DAG object at 0x7feaa8290090>a', 'name': '<__main__.DAG object at 0x7feaa8290090>a', 'aa': 'asdf',
                    'port_parent': '<__main__.Task object at 0x7feaa82901d0>|sub', 'port': 'in-2', 'group': 'in'
                }, '<__main__.DAG object at 0x7feaa8290090>div': {
                    'label': '<__main__.DAG object at 0x7feaa8290090>div', 'name': '<__main__.DAG object at 0x7feaa8290090>div', 'aa': 'asdf',
                    'port_parent': '<__main__.Task object at 0x7feaa8290210>|truediv', 'port': 'out-1', 'group': 'out'
                }, '<__main__.DAG object at 0x7feaa8290090>b': {
                    'label': '<__main__.DAG object at 0x7feaa8290090>b', 'name': '<__main__.DAG object at 0x7feaa8290090>b', 'aa': 'asdf',
                    'port_parent': '<__main__.Task object at 0x7feaa8290210>|truediv', 'port': 'in-1', 'group': 'in'
                }, '<__main__.DAG object at 0x7feaa8290090>mul': {
                    'label': '<__main__.DAG object at 0x7feaa8290090>mul', 'name': '<__main__.DAG object at 0x7feaa8290090>mul',
                    'port_parent': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'port': 'out-1', 'group': 'out'
                }
            }, 'edges': [
                {
                    'label': null, 'tail_name': '<__main__.Task object at 0x7feaa82901d0>|sub', 'head_name': '<__main__.DAG object at 0x7feaa8290090>sub'
                },
                {
                    'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>a', 'head_name': '<__main__.Task object at 0x7feaa82901d0>|sub'
                },
                {
                    'label': null, 'tail_name': '<__main__.Task object at 0x7feaa8290210>|truediv', 'head_name': '<__main__.DAG object at 0x7feaa8290090>div'
                },
                {
                    'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>b', 'head_name': '<__main__.Task object at 0x7feaa8290210>|truediv'
                },
                {
                    'label': null, 'tail_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'head_name': '<__main__.DAG object at 0x7feaa8290090>mul'
                },
                {
                    'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>div', 'head_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
                },
                {
                    'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>sub', 'head_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
                }
            ], 'subgraph': []
        }
    ]
};
// const data = {
//     'name': 'cluster<__main__.DAG object at 0x7feaa8290090>', 'nodes': {
//         '<__main__.Task object at 0x7feaa82901d0>|sub': {
//             'label': '<__main__.Task object at 0x7feaa82901d0>|sub', 'name': '<__main__.Task object at 0x7feaa82901d0>|sub'
//         }, '<__main__.Task object at 0x7feaa8290210>|truediv': {
//             'label': '<__main__.Task object at 0x7feaa8290210>|truediv', 'name': '<__main__.Task object at 0x7feaa8290210>|truediv'
//         }, '<__main__.EndTask object at 0x7feaa8288d50>|mul': {
//             'label': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
//         }, '<__main__.DAG object at 0x7feaa8290090>sub': {
//             'label': '<__main__.DAG object at 0x7feaa8290090>sub', 'name': '<__main__.DAG object at 0x7feaa8290090>sub', 'aa': 'asdf',
//             'port_parent': '<__main__.Task object at 0x7feaa82901d0>|sub', 'port': 'out-1', 'group': 'out'
//         }, '<__main__.DAG object at 0x7feaa8290090>a': {
//             'label': '<__main__.DAG object at 0x7feaa8290090>a', 'name': '<__main__.DAG object at 0x7feaa8290090>a', 'aa': 'asdf',
//             'port_parent': 'cluster<__main__.DAG object at 0x7feaa8290090>', 'port': 'in-2', 'group': 'in'
//         }, '<__main__.DAG object at 0x7feaa8290090>div': {
//             'label': '<__main__.DAG object at 0x7feaa8290090>div', 'name': '<__main__.DAG object at 0x7feaa8290090>div', 'aa': 'asdf',
//             'port_parent': '<__main__.Task object at 0x7feaa8290210>|truediv', 'port': 'out-1', 'group': 'out'
//         }, '<__main__.DAG object at 0x7feaa8290090>b': {
//             'label': '<__main__.DAG object at 0x7feaa8290090>b', 'name': '<__main__.DAG object at 0x7feaa8290090>b', 'aa': 'asdf',
//             'port_parent': 'cluster<__main__.DAG object at 0x7feaa8290090>', 'port': 'in-1', 'group': 'in'
//         }, '<__main__.DAG object at 0x7feaa8290090>mul': {
//             'label': '<__main__.DAG object at 0x7feaa8290090>mul', 'name': '<__main__.DAG object at 0x7feaa8290090>mul',
//             'port_parent': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'port': 'out-1', 'group': 'out'
//         }
//     }, 'edges': [
//         {
//             'label': null, 'tail_name': '<__main__.Task object at 0x7feaa82901d0>|sub', 'head_name': '<__main__.DAG object at 0x7feaa8290090>sub'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>a', 'head_name': '<__main__.Task object at 0x7feaa82901d0>|sub'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.Task object at 0x7feaa8290210>|truediv', 'head_name': '<__main__.DAG object at 0x7feaa8290090>div'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>b', 'head_name': '<__main__.Task object at 0x7feaa8290210>|truediv'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul', 'head_name': '<__main__.DAG object at 0x7feaa8290090>mul'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>div', 'head_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
//         },
//         {
//             'label': null, 'tail_name': '<__main__.DAG object at 0x7feaa8290090>sub', 'head_name': '<__main__.EndTask object at 0x7feaa8288d50>|mul'
//         }
//     ], 'subgraph': []
// }
const NODES = [];
const EDGES = [];
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
const TinyDag = (props: any) => {
    const container = React.useRef<HTMLDivElement>(null);
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
        console.log("O:", { nodes: _nodes, edges: _edges });
        let ndata = layout.layout({ nodes: _nodes, edges: _edges });
        console.log("A:", ndata);
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
            let isVariable = data.nodes[v]['name'].indexOf('|') < 0;
            if (data.nodes[v]['port']) {
                console.log("P:", data.nodes[v], v);
                return;
            }
            graph.addNode({
                // x: 120,
                // y: 80,
                id: data.nodes[v]['name'],
                // width: isVariable ? 30 : 280,
                height: isVariable ? 20 : 50,
                width: 280,
                // height: 40,
                label: data.nodes[v]['label'],
                zIndex: 10,
                attrs: {
                    body: {
                        stroke: 'none',
                        fill: '#3199FF',
                    },
                    label: {
                        fill: '#fff',
                        fontSize: 12,
                    },
                },
                ports: {
                    items: [], groups: {
                        in: {
                            position: { name: 'top' },
                            attrs: {
                                circle: {
                                    r: 5,
                                    width: 3,
                                    height: 3,
                                    x: 0,
                                    y: 0,
                                    magnet: 'true',
                                },
                            },
                            zIndex: 1,
                        },
                        out: {
                            position: { name: 'bottom' },
                            attrs: {
                                circle: {
                                    r: 5,
                                    width: 3,
                                    height: 3,
                                    x: 0,
                                    y: 0,
                                    magnet: 'true',
                                },
                            },
                            zIndex: 1,
                        },
                    }
                }
            });
            // }
        });

        Object.keys(data.nodes).forEach((v, i, arr) => {
            if (data.nodes[v]['port']) {
                
                let o = graph.getCellById(data.nodes[v]['port_parent']);
                if (o != undefined) {
                    o.ports.items.push({ id: data.nodes[v]['port'], group: data.nodes[v]['group'] });
                    console.log("Log1:", data.nodes[v]);
                    NODE2PORT[data.nodes[v]['name']] = { cell: data.nodes[v]['port_parent'], port: data.nodes[v]['port'] };
                }

            } else {
            }

        });
        console.log("NN:", NODE2PORT);
        data['edges'].forEach(({ label, tail_name, head_name }) => {
            let tail_key = tail_name;
            let head_key = head_name;
            if (tail_name in NODE2PORT) {
                tail_name = NODE2PORT[tail_name];
                tail_key = tail_name['cell'];
            }
            if (head_name in NODE2PORT) {
                head_name = NODE2PORT[head_name];
                head_key = head_name['cell'];
            }
            console.log("NEdge:", {
                source: tail_name, target: head_name, router: {
                    name: 'manhattan',
                    args: {
                        startDirections: ['bottom'],
                        endDirections: ['top'],
                    },
                },
            });
            // console.log(tail_key, '->', head_key);
            if (tail_key != head_key) {
                graph.addEdge({
                    source: tail_name, target: head_name, router: {
                        name: 'manhattan',
                        args: {
                            startDirections: ['bottom'],
                            endDirections: ['top'],
                        },
                    },
                });
            }

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

    React.useEffect(() => {
        if (container && container.current) {
            // 画布
            const graph = new Graph({
                grid: { size: 15, visible: true },
                width: container.current.offsetWidth,
                height: container.current.offsetHeight,
                container: container.current,
                highlighting: {
                    magnetAvailable: magnetAvailabilityHighlighter,
                    magnetAdsorbed: {
                        name: 'stroke',
                        args: {
                            attrs: {
                                fill: '#fff',
                                stroke: '#31d0c6',
                            },
                        },
                    },
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
            drawGraph(g, data);


            let model: any = { 'nodes': g.nodes, 'edges': g.edges }

            console.log(model);
            let nodesMapper = {};
            model.nodes.forEach((node) => {
                nodesMapper[node['id']] = node;
            });




            const dagreLayout = new DagreLayout({
                type: 'dagre',
                rankdir: 'TB',
                align: 'UR',
                ranksep: 20,
                nodesep: 120,
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
            // });

            model = layoutIgnorePort(dagreLayout, model);
            // model = dagreLayout.layout(model)
            // model.nodes.forEach((v, i, arr)=>{
            //     if (model.nodes[i]['id'].indexOf("|") < 0){
            //         // model.nodes[i].width = 30;
            //         // model.nodes[i].height = 30;
            //         model.nodes[i].x = model.nodes[i].x + (250 - 200) / 2;
            //     }
            // });
            console.log(model);
            graph.fromJSON(model);



            graph.on('edge:mouseenter', ({ edge }) => {
                edge.addTools([
                    'source-arrowhead',
                    'target-arrowhead',
                    {
                        name: 'button-remove',
                        args: {
                            distance: -30,
                        },
                    },
                ])
            })

            graph.on('edge:mouseleave', ({ edge }) => {
                edge.removeTools()
            })
        }
    }, []);
    return <div ref={container} className="TinyDagContainer"></div>

}

export default TinyDag;