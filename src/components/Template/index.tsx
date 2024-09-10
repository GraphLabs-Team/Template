import {Component, FC} from 'react';
import TaskTimer from '../TaskTimer/index';
import { Graph } from '../GraphLibrary/Graph';
//import  Matrix  from '../MatrixLibrary/Matrix';
//import { MatrixController } from '../MatrixLibrary/MatrixController';
import cytoscape from 'cytoscape';
import { GraphGenerator } from '../GraphLibrary/GraphGenerator';
import { GraphController } from '../GraphLibrary/GraphController';
import { ToolBar } from '../Toolbar/ToolBar';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';


interface IProps {

}


interface IState<T1, T2> {
    graph: Graph<T1, T2>;
    task_graph: Graph<T1, T2>;
}


export class Template<T1, T2> extends Component<IProps, IState<T1, T2>> {
    
    visualizing_policy = "circle"

    constructor(props: IProps){
        super(props);

        let g: Graph<T1, T2> = this.generateGraph()
        let t_g: Graph<T1, T2> = this.generateTaskGraph()
        this.state = {
            graph: g,
            task_graph: t_g,
        }
    }

    public render(){
        const Task: any = this.task();
        const Area: any = this.task_area();
        
        return (
            <div className={'App'} id="wrap">
                {(
                    <div>
                        <div className={'MainRow'}>
                            {this.isGraphModule() &&
                                <GraphController 
                                    id={"cy1"}
                                    className='GraphCell'
                                    graph={this.state.graph} 
                                    visualization_policy={this.visualizing_policy}
                                    is_nodeid_visible={this.isNodeNameVisible()} 
                                    is_weights_visible={this.isEdgeWeightVisible()}
                                    is_weights_node_visible={this.isNodeWeightVisible()}
                                    on_weights_changed={()=>this.forceUpdate()}/>
                            }                                                 
                            <div className={'TaskCell'}>
                                <p><b>Задание</b></p>
                                <Task/>                               
                            </div>
                            <div className={'TaskCellGraph'}>
                                <Area/>
                                <table className = 'table'>
                                    <thead>
                                    <tr>
                                    <th scope="col">Name</th>
                                    {
                                        this.state.graph.nodes.map(node=>(<th key={node.label} scope="col">{node.label}</th>))
                                    }
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                <th scope="row">Weight</th>
                                {
                                        this.state.graph.nodes.map(node=>(<th key={node.label} scope="row">{node.weight}</th>))
                                }
                                </tr>
                                </tbody>
                                </table>
                                
                            {/* <GraphController 
                                    id={"cy2"}
                                    className='TaskCellGraph'
                                    graph={this.state.task_graph} 
                                    visualization_policy={this.visualizing_policy}
                                    is_nodeid_visible={this.isNodeNameVisible()} 
                                    is_weights_visible={this.isEdgeWeightVisible()}/>                               */}
                            </div>
                            <div className={'ToolCell'}>
                                <ToolBar 
                                    next_stage={this.nextStage} 
                                    base_button={true}
                                    base_button_message={this.helpMessage()}
                                    graph_manipulations_button={this.isGraphModified()} 
                                    graph_coloring_buttons={this.isGraphRepainted()}
                                    graph_adj_coloring_buttons={this.isGraphAdjRepainted()} 
                                    graph_naming_buttons={this.isGraphNodeRenamed()}
                                    graph_weight_buttons={this.isGraphReweight()}
                                    node_weight_buttons={this.isNodeWeight()}
                                    change_visualization_policy_buttons={this.isVisualizingPolicyChangeble()}
                                />
                            </div>
                        </div>
                        <div className={'LeftBottom'}>
                            <TaskTimer timeSeconds={100} onTimerExpire={this.nextStage}/>
                        </div>

                    </div>)}
            </div>
        );
    }

    private nextStage(){
        console.log("next stage")
    }

    protected helpMessage() {
        return "1) Как окрасить ребро? \nВыделите ребро, которое вы хотите покрасить, выберите цвет и нажмите кнопку раскрасить ребро.\n2) Как посмотреть вес у вершины?\nВыделите нужную вершину, нажав на нее, и нажмите на кнопку. Далее в всплывающем окне вы увидите значение\nТак же справа присутствует таблица весов\n3) Как назначить вес?\n Выберите вершину, нажав на нее, и нажмите на кнопку. Далее введите значение веса в сплывающем окне и нажмите продолжить \n4)Алгоритм Дейкстры:\n 1.Инициализация: Начните с выбора стартовой вершины. Пометьте её расстояние как 0, а все остальные вершины как бесконечность.\n 2.Выбор вершины: Выберите вершину с наименьшим помеченным расстоянием. Начнем с выбранной стартовой вершины.\n 3.Обновление расстояний: Обновите расстояния до соседних вершин через текущую вершину. Если новое расстояние короче, чем старое, обновите его.\n 4.Пометка вершины: Пометьте выбранную вершину как посещенную.\n 5.Повторение: Повторяйте шаги 2-4 для всех вершин, пока не посетите все вершины или пока не достигнете целевой.\n 6.Результат: После завершения алгоритма вы получите кратчайшие расстояния от начальной вершины до всех остальных вершин в графе."
    }

    protected task(){
        return () => <p>Это пустой компонент задания</p>;
    }

    protected task_area(){
        return () => <p>Это пустой компонент задания</p>;
    }

    protected generateGraph(){
        let graph: Graph<T1, T2> = GraphGenerator.random(5, 0.3)
        return graph
    }

    protected generateTaskGraph(){
        let task_graph: Graph<T1, T2> = GraphGenerator.random(5, 0.3)
        return task_graph
    }

    protected isGraphModule(){
        return true
    }


    protected isGraphModified(){
        return true
    }
    protected isGraphRepainted(){
        return true
    }
    protected isGraphAdjRepainted(){
        return true
    }
    protected isGraphNodeRenamed(){
        return true
    }
    protected isGraphReweight(){
        return true
    }
    protected isNodeWeight(){
        return true
    }
    protected isVisualizingPolicyChangeble(){
        return true
    }

    protected isNodeNameVisible(){
        return true
    }
    protected isNodeWeightVisible(){
        return true
    }
    protected isEdgeWeightVisible(){
        return true
    }

    componentDidMount() {
        let vp = document.getElementById("visualization-policy") as HTMLSelectElement
        vp?.addEventListener("change", () => {
            this.visualizing_policy = vp.value
            this.forceUpdate()
        });
    }
}


