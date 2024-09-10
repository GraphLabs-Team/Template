import { Graph } from "../GraphLibrary/Graph";
import { GraphGenerator } from "../GraphLibrary/GraphGenerator";
import { Template } from "../Template";


export class ModuleExample<T1, T2> extends Template<T1, T2> {
    
    protected override task(){
        return () => <p>Найти длину кратчайшего пути из вершины "0" в вершину "5".<br/>
        Проложите этот путь, окрасив нужные ребра в красный(255,0, 0)<br/>
        Если не помните алгоритм, обратитесь к кнопке "Помощь"</p>;        
    }

    protected override task_area(){
        return () => <div>
            <p><b>Введите длину кратчайшего пути:</b></p>
            <input type="number" id="AnswerInput" name="AnswerName"/>
            <p><b>Таблица веса вершин:</b></p> </div>
    }

    protected override generateGraph(){
        let graph: Graph<T1, T2> = GraphGenerator.random(7, 0.5)
        return graph
    }

    protected override isGraphModified(){
        return false
    }
    
    protected override isGraphRepainted(){
        return true
    }
    
    protected override isGraphNodeRenamed(){
        return false
    }
    
    protected override isNodeWeight(){
        return true
    }

    protected override isGraphReweight(){
        return false
    }
    
    protected isVisualizingPolicyChangeble(){
        return true
    }
    
    protected override isNodeNameVisible(){
        return true
    }

    protected override isEdgeWeightVisible(){
        return true
    }

    protected override isNodeWeightVisible(){
        return true
    }

    protected isGraphAdjRepainted(){
        return false
    }

}