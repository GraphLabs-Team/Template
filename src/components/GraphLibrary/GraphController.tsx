import React from 'react';
import { Graph } from './Graph';
import { Node } from './Node';
import cytoscape from 'cytoscape';
import { Edge } from './Edge';


interface IGraphControllerProps<T1, T2> {
    graph: Graph<T1, T2>,
    visualization_policy?: string
}


export class GraphController<T1, T2> extends React.Component<IGraphControllerProps<T1, T2>> {
    
    cy?: cytoscape.Core
    visualization_policy: string = "circle"

    constructor(props: {graph: Graph<T1, T2>, visualization_policy?: string}){
        super(props)
    }

    componentDidMount() {        
        this.cy = cytoscape({container: document.getElementById('cy'),
                            layout: {name: this.props.visualization_policy ?? "circle"},
                            elements: this.props.graph.toJSONFormat(),
        })

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
                    let edge12: Edge<T1, T2> = new Edge(this.getNewEdgeId(), node1, node2)
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
    }

    componentDidUpdate(prevProps: Readonly<IGraphControllerProps<T1, T2>>, prevState: Readonly<{}>, snapshot?: any): void {
        let elms = this.props.graph.toJSONFormat();
        this.cy = cytoscape({container: document.getElementById('cy'),
                            layout: {name: this.props.visualization_policy ?? "circle"},
                            elements: elms,
                            
        })
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
        return <div id="cy"></div>
    }

}