import {Component, FC} from 'react';
import TaskTimer from '../TaskTimer/index';
import { Graph } from '../GraphLibrary/Graph';
import cytoscape from 'cytoscape';
import { GraphGenerator } from '../GraphLibrary/GraphGenerator';
import { GraphController } from '../GraphLibrary/GraphController';
import { ToolBar } from '../Toolbar/ToolBar';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';


interface IProps {
    is_graph_modified: boolean
}


interface IState<T1, T2> {
    graph: Graph<T1, T2>;
}


export class Template<T1, T2> extends Component<IProps, IState<T1, T2>> {
    
    cy?: cytoscape.Core

    constructor(props: IProps){
        super(props);

        let g: Graph<T1, T2> = this.generateGraph()
        this.state = {
            graph: g
        }
    }

    public render(){
        const Task: any = this.task();
        
        return (
            <div className={'App'} id="wrap">
                {(
                    <div>
                        <div className={'MainRow'}>
                            <div id={"cy"} className={'GraphCell'}>
                                <GraphController graph={this.state.graph} visualization_policy='circle'/>
                            </div>
                            
                            <div className={'TaskCell'}>
                                <p>Задание</p>
                                <Task/>
                            </div>
                            <div className={'ToolCell'}>
                                <ToolBar next_stage={this.nextStage} base_button={true} graph_manipulations_button={this.props.is_graph_modified}/>
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

    protected task(){
        return () => <p>Это пустой компонент задания</p>;
    }

    protected generateGraph(){
        let graph: Graph<T1, T2> = GraphGenerator.random(5, 0.3)
        return graph
    }
}


