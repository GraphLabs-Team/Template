import { Graph } from "../GraphLibrary/Graph";
import { GraphGenerator } from "../GraphLibrary/GraphGenerator";
import { Template } from "../Template";


export class ModuleExample<T1, T2> extends Template<T1, T2> {
    
    protected override task(){
        return () => <p>Построить граф</p>;
    }

    protected override generateGraph(){
        let graph: Graph<T1, T2> = GraphGenerator.random(5, 0.3)
        return graph
    }
}