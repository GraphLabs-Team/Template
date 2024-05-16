import React from 'react';
import { Graph } from './Graph';
import { Node } from './Node';
import cytoscape from 'cytoscape';
import { Edge } from './Edge';


interface IGraphControllerProps<T1, T2> {
    id: string,
    className: string,
    graph: Graph<T1, T2>,
    visualization_policy?: string,
    is_nodeid_visible?: boolean,
    is_weights_visible?: boolean,
    is_weights_node_visible?: boolean,
    on_weights_changed?: ()=>void,
}


export class GraphController<T1, T2> extends React.Component<IGraphControllerProps<T1, T2>> {
    
    cy?: cytoscape.Core

    constructor(props: IGraphControllerProps<T1,T2>){
            super(props)
    }

    private getDefaultStylesheet() {

        let styles = [
            {
                selector: "node[label]", 
                style: {}
            },
            {
                selector: "edge[label]", 
                style: {}
            },
            /*{
                selector: "node[weight]",
                style: {}
            }*/
        ]

        if (this.props.is_nodeid_visible){
            styles[0].style = {
                label: "data(label)",
                "font-size": "18",
            }            
            // "background-color": "#527",
        }

        if (this.props.is_weights_visible){
            styles[1].style = {
                label: 'data(label)',
                "font-size": "18",
                "edge-text-rotation": "autorotate",
                "color": "#fff",
                "text-outline-color": "#000",
                "text-outline-width": 3
            }
        }

        /*if (this.props.is_weights_node_visible){
            styles[2].style = {
                weight: 'data(weight)',
                "font-size": "18",
                "edge-text-rotation": "autorotate",
                "color": "#f2f",
                "text-outline-color": "#000",
                "text-outline-width": 3
            }
        }*/

        return styles
    }

    private update_layout(){
        if (this.cy){
            this.props.graph.nodes.forEach(node => {
                this.cy?.nodes("node#" + node.id)[0].css({'background-color': node.color})
                //console.log("Node", node.id, node.color, node.weight)
                console.log("Node", node.id, node.color)
            });
            this.props.graph.edges.forEach(edge => {
                this.cy?.edges('[source = "'+ edge.source.id + '"][target = "' + edge.target.id  + '"]').style({'line-color': edge.color})
                console.log("Edge", edge.id, edge.color)
            });
        }
    }

    componentDidMount() {             
        this.cy = cytoscape({container: document.getElementById(this.props.id),
                            layout: {name: this.props.visualization_policy ?? "circle"},
                            elements: this.props.graph.toJSONFormat(),
                            style: this.getDefaultStylesheet()
        })
        this.update_layout()

 
        document.getElementById("addNodeButton")?.addEventListener("click", this.addNode);
        
        document.getElementById("deleteNodeButton")?.addEventListener("click", () => {
            let selected = this.cy?.nodes(":selected")[0];
            if (selected){                
                let delnode = this.props.graph.getNode(selected.id())
                if (delnode){
                    this.props.graph.popNode(delnode)
                    this.forceUpdate()
                }
            }
        });

        document.getElementById("concatNodeButton")?.addEventListener("click", () => {            
            let selected = this.cy?.nodes(":selected")
            if (selected?.length === 2){
                let first = selected[0].id()
                let second = selected[1].id()
                let node1 = this.props.graph.getNode(first)
                let node2 = this.props.graph.getNode(second)
                if (node1 && node2) {
                    let edge12: Edge<T1, T2> = new Edge(this.getNewEdgeId(), node1, node2, "", "0")
                    this.props.graph.addEdge(edge12)
                    this.forceUpdate()
                }
            }
        });

        document.getElementById("deleteEdgeButton")?.addEventListener("click", () => {
            let selected = this.cy?.edges(":selected")[0];
            if (selected){                
                let source = this.props.graph.getNode(selected.source().id())
                let target = this.props.graph.getNode(selected.target().id())
                if (source && target){
                    let deledge = this.props.graph.getEdge(source, target)
                    if (deledge){
                        this.props.graph.popEdge(deledge)
                        this.forceUpdate()
                    }
                }
                   
            }
        });

        document.getElementById("recolorNodeButton")?.addEventListener("click", () => {            
            let selected = this.cy?.nodes(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node = this.props.graph.getNode(element.id())
                    let color = (document.getElementById("nodeColor") as HTMLInputElement).value
                    node?.setColor(color)
                    this.forceUpdate()
                });
            }
        });

        document.getElementById("recolorEdgeButton")?.addEventListener("click", () => {            
            let selected = this.cy?.edges(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node_source = this.props.graph.getNode(element.source().id())
                    let node_target = this.props.graph.getNode(element.target().id())
                    if (node_source && node_target){
                        let edge = this.props.graph.getEdge(node_source, node_target)
                        let color = (document.getElementById("nodeColor") as HTMLInputElement).value
                        edge?.setColor(color)
                        this.forceUpdate()
                    }
                });
            }
        });

        document.getElementById("colorAdjNodeButton")?.addEventListener("click", () => {    
            let selected = this.cy?.nodes(":selected")[0];
            if (selected){         
                let node = this.props.graph.getNode(selected.id())
                if (node){
                    let adj_nodes = this.props.graph.getAdjNodes(node)
                    adj_nodes.forEach(node =>{
                        node.setColor("red")
                        this.forceUpdate()
                    })
                }
            }
        });

        document.getElementById("colorAdjEdgeButton")?.addEventListener("click", () => {    
            let selected = this.cy?.edges(":selected")[0];
            if (selected){                
                let source = this.props.graph.getNode(selected.source().id())
                let target = this.props.graph.getNode(selected.target().id())
                if (source && target){
                    let edge = this.props.graph.getEdge(source, target)
                    if (edge){
                        let adj_edges = this.props.graph.getAdjEdges(edge)
                        adj_edges.forEach(edge =>{
                            edge.setColor("red")
                            this.forceUpdate()
                        })
                    }
                }                   
            }
        });

        document.getElementById("uncolorNodeButton")?.addEventListener("click", () => {    
            this.props.graph.nodes.forEach(node => {
                node.setColor(" ")
                this.forceUpdate()
            })
            this.props.graph.edges.forEach(edge => {
                edge.setColor(" ")
                this.forceUpdate()
            })
        });

        document.getElementById("setNodeName")?.addEventListener("click", () => {            
            let selected = this.cy?.nodes(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node = this.props.graph.getNode(element.id())
                    // let label = (document.getElementById("nodeNameInput") as HTMLInputElement).value
                    let label = prompt("Введите имя вершины", "");
                    node?.setLabel(label)
                    this.forceUpdate()
                });
            }
        });

        document.getElementById("setEdgeWeight")?.addEventListener("click", () => {            
            let selected = this.cy?.edges(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node_source = this.props.graph.getNode(element.source().id())
                    let node_target = this.props.graph.getNode(element.target().id())
                    if (node_source && node_target){
                        let edge = this.props.graph.getEdge(node_source, node_target)
                        // let weight = (document.getElementById("edgeWeightInput") as HTMLInputElement).value
                        let weight = prompt("Введите вес ребра", "");
                        edge?.setLabel(weight)
                        this.forceUpdate()
                    }
                });
            }
        });

        document.getElementById("setNodeWeight")?.addEventListener("click", () => {            
            let selected = this.cy?.nodes(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node = this.props.graph.getNode(element.id())
                    let weight = prompt("Введите вес вершины", "");
                    node?.setWeight(weight)
                    this.forceUpdate()
                    }
                );
                if (this.props.on_weights_changed != null) {
                    this.props.on_weights_changed()
                }
            }
        });
        document.getElementById("writeNodeWeight")?.addEventListener("click", () => {            
            let selected = this.cy?.nodes(":selected")
            if (selected){                
                selected.forEach(element => {
                    let node = this.props.graph.getNode(element.id())
                    //alert("вес вершины ");
                    let weight = node?.weight
                    if (weight){
                        let s = "вес вершины: "
                        alert(s + weight)
                    }
                    else{
                        alert("вес вершины null")
                    }
                    }
                );
            }
        });
    }

    componentDidUpdate(prevProps: Readonly<IGraphControllerProps<T1, T2>>, prevState: Readonly<{}>, snapshot?: any): void {
        let elms = this.props.graph.toJSONFormat();
        this.cy = cytoscape({container: document.getElementById(this.props.id),
                            layout: {name: this.props.visualization_policy ?? "circle"},
                            elements: elms,
                            style: this.getDefaultStylesheet()
                            
        })
        this.update_layout()
    }

    addNode = () => {
        let index: number = -1
        let indexes: string[] = []
        
        
        this.props.graph.nodes.forEach(node => {
            indexes.push(node.id)
        });

        for (let i = 0; i < indexes.length; i++){   
            if (!indexes.find((element) => element === (i + 1).toString())){
                index = i + 1
            }
        }
        if (index === -1){
            index = indexes.length + 1
        }
        
        let node: Node<T1> = new Node(index.toString(), index.toString())
        this.props.graph.addNode(node)
        this.forceUpdate()
    }

    getNewEdgeId = () => {
        let index: number = -1
        let indexes: string[] = []
        
        
        this.props.graph.edges.forEach(edge => {
            indexes.push(edge.id)
        });

        for (let i = 0; i < indexes.length; i++){   
            if (!indexes.find((element) => element === (i + 1).toString())){
                index = i + 1
            }
        }
        if (index === -1){
            index = indexes.length + 1
        }
        return index.toString()
    }

    render() {
        return <div id={this.props.id} className={this.props.className}></div>
    }

}