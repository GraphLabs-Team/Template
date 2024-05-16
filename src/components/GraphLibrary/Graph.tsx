import React from 'react';
import { Node } from './Node';
import { Edge } from './Edge';
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition } from 'cytoscape';
import { Template } from '../Template';


const ERROR_MSG_INCORRECT_TYPES = "Incorrect input types!"


interface IGraph<T1, T2> {
    nodes: Node<T1>[]
    edges: Edge<T1, T2>[]
    is_directed: boolean
}


export class Graph<T1, T2> implements IGraph<T1, T2> {

    private _nodes: Node<T1>[] = []
    private _edges: Edge<T1, T2>[] = []
    private _is_directed: boolean = false

    constructor(nodes?: Node<T1>[], edges?: Edge<T1, T2>[], is_directed?: boolean) {
        if (nodes){
            this._nodes = nodes
        }
        if (edges){
            this._edges = edges
        }
        if (is_directed) {
            this._is_directed = is_directed
        }
    }

    get nodes(){
        return this._nodes
    }

    get edges(){
        return this._edges
    }

    get is_directed(){
        return this._is_directed
    }

    public addNode(node: Node<T1>){
        for (let i = 0; i < this._nodes.length; i++){
            if (this._nodes[i].id === node.id){
                return
            }
        }
        this._nodes.push(node)
    }

    public addEdge(edge: Edge<T1, T2>){
        for (let i = 0; i < this._edges.length; i++){
            if (this._edges[i].id === edge.id){
                return
            }
        }
        this._edges.push(edge)
    }

    public getNode(node_id: string){

        for (let i = 0; i < this._nodes.length; i++){
            if (this._nodes[i].id === node_id){
                return this._nodes[i]
            }
        }
    }

    public getAdjNodes(node: Node<T1>){
        let adj_nodes: Node<T1>[] = []
        let output_edges = this.getOutputEdge(node)
        for (let i = 0; i < output_edges.length; i++){
            if (output_edges[i].source.id === node.id){
                adj_nodes.push(output_edges[i].target)
            }
            else{
                adj_nodes.push(output_edges[i].source)
            }                
        }
        return adj_nodes
    }

    public getAdjEdges(edge: Edge<T1, T2>){
        let adj_edges: Edge<T1, T2>[] = []
        for (let i = 0; i < this._edges.length; i++){
            if ((this._edges[i].source.id === edge.source.id || this._edges[i].source.id === edge.target.id ||
                this._edges[i].target.id === edge.source.id || this._edges[i].target.id === edge.target.id) && this._edges[i].id !== edge.id){
                adj_edges.push(this._edges[i])
            }                
        }
        return adj_edges
    }
    
    public getEdge(edgeid_or_source: string | Node<T1>, target?: Node<T1>){
        if (edgeid_or_source instanceof Number){
            for (let i = 0; i < this._edges.length; i++){
                if (this._edges[i].id === edgeid_or_source){
                    return this._edges[i]
                }
            }
        }
        else if (target && edgeid_or_source instanceof Node){
            for (let i = 0; i < this._edges.length; i++){
                if (this._edges[i].source.id === edgeid_or_source.id){
                    if (this._edges[i].target.id === target.id){
                        return this._edges[i]
                    }
                }
                if (!this._is_directed){
                    if (this._edges[i].target.id === edgeid_or_source.id){
                        if (this._edges[i].source.id === target.id){
                            return this._edges[i]
                        }
                    }
                }
            }
        }
        else if (edgeid_or_source instanceof Number && target){
            reportError(ERROR_MSG_INCORRECT_TYPES)
        }
        else return
    }

    public getOutputEdge(node: Node<T1>){
        let output_edges: Edge<T1, T2>[] = []
        for (let i = 0; i < this._edges.length; i++){
            if (this._edges[i].source.id === node.id){
                output_edges.push(this._edges[i])
            }
            if (!this._is_directed){
                if (this._edges[i].target.id === node.id){
                    if (this._edges[i].source.id !== this._edges[i].target.id){
                        output_edges.push(this._edges[i])
                    }
                }
            }
        }
        return output_edges
    }

    public getInputEdge(node: Node<T1>){
        let input_edges: Edge<T1, T2>[] = []
        for (let i = 0; i < this._edges.length; i++){
            if (this._edges[i].target.id === node.id){
                input_edges.push(this._edges[i])
            }
            if (!this._is_directed){
                if (this._edges[i].target.id === node.id){
                    if (this._edges[i].source.id !== this._edges[i].target.id){
                        input_edges.push(this._edges[i])
                    }
                }
            }
        }
        return input_edges
    }

    public popNode(node: Node<T1>){
        let relatedEdge = this.getOutputEdge(node)
        relatedEdge.forEach(edge => {
            let index = this._edges.indexOf(edge, 0)
            if (index > -1) {
                this._edges.splice(index, 1)
            }
        });
        let index = this._nodes.indexOf(node, 0)
        if (index > -1) {
            this._nodes.splice(index, 1)
        }
    }

    public popEdge(edge: Edge<T1, T2>){
        this._edges = this._edges.filter((edgei) => edgei.id !== edge.id)
    }

    public toJSONFormat(){
        let elements: ElementDefinition[] = []
        this._nodes.forEach(node => {
            let dct = {
                data: {
                    id: node.id.toString(),
                    label: node.label,
                    color: node.color,
                    weight: node.weight
                }
            }
            
            elements.push(dct)
        });
        this._edges.forEach(edge => {
            let dct = {
                data: {
                    source: edge.source.id.toString(),
                    target: edge.target.id.toString(),
                    label: edge.label,
                    color: edge.color
                }
            }
            elements.push(dct)
        });

        


        return elements
    }

    
}