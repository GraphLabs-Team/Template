import { Graph } from './Graph';
import { Node } from './Node';
import { Edge } from './Edge';


export class GraphGenerator {
    
    public static random<T1, T2>(n_vertex: number, p_connected: number, selfconn: boolean = false){
        let graph: Graph<T1, T2> = new Graph()
        for (let i = 0; i < n_vertex; i++){
            let node: Node<T1> = new Node(i.toString(), i.toString(), "", "0")
            graph.addNode(node)
        }
        let edges_ids: number[] = [0]
        graph.nodes.forEach(node1 => {
            graph.nodes.forEach(node2 => {
                if (node1.id !== node2.id) {
                    let prob = Math.random()
                    if (p_connected > prob){
                        let index = 1
                        if (edges_ids && edges_ids.at(-1)){
                            index = edges_ids[edges_ids.length - 1] + 1
                        }
                        edges_ids.push(index)
                        let weight = Math.floor(Math.random() * 6) +1
                        let edge: Edge<T1, T2> = new Edge(index.toString(), node1, node2, "", weight.toString())
                        graph.addEdge(edge)
                    }
                }
            });
        });
        return graph
    }

}