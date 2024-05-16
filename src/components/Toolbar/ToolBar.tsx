import * as React from 'react';
import './ToolBar.css';



interface IToolBarProps{
    base_button: boolean,
    base_button_message: string,
    graph_manipulations_button?: boolean,
    graph_coloring_buttons?: boolean,
    graph_adj_coloring_buttons?: boolean,
    graph_naming_buttons?: boolean
    graph_weight_buttons?: boolean
    node_weight_buttons?: boolean
    change_visualization_policy_buttons?: boolean
    next_stage: () => void,
}


export class ToolBar extends React.Component<IToolBarProps> {
    constructor(props: IToolBarProps){
            super(props)
    }


     componentDidMount(): void {         
        document.getElementById("getHelp")?.addEventListener("click", () => {            
            alert(this.props.base_button_message);
          })
     }

    private getToolButtons(){
        let button_list = []

        if (this.props.base_button){
            button_list.push(<button id={"getHelp"} className={"helpButton"} type="button">Помощь</button>)
        }
        if (this.props.graph_manipulations_button){
            button_list.push(<button id="addNodeButton" className={"toolButton"} type="button">Добавить вершину</button>)
            button_list.push(<button id="deleteNodeButton" className={"toolButton"} type="button">Удалить вершину</button>)
            button_list.push(<button id="concatNodeButton" className={"toolButton"} type="button">Соединить вершины</button>)
            button_list.push(<button id="deleteEdgeButton" className={"toolButton"} type="button">Удалить ребро</button>)
        }
        if (this.props.graph_coloring_buttons){
            button_list.push(<input type="color" id="nodeColor" className="colorInput" name="nodeColor"/>)
            button_list.push(<button id="recolorNodeButton" className={"toolButton"} type="button">Раскрасить вершину</button>)
            button_list.push(<button id="recolorEdgeButton" className={"toolButton"} type="button">Раскрасить ребро</button>)
        }
        if (this.props.graph_adj_coloring_buttons){
            button_list.push(<button id="colorAdjNodeButton" className={"toolButton"} type="button">Выделить смежные вершины</button>)
            button_list.push(<button id="colorAdjEdgeButton" className={"toolButton"} type="button">Выделить смежные рёбра</button>)
            button_list.push(<button id="uncolorNodeButton" className={"toolButton"} type="button">Убрать выделение</button>)
        }
        if (this.props.graph_naming_buttons){
            button_list.push(<button id="setNodeName" className={"toolButton"} type="button">Переименовать вершину</button>)
        }
        if (this.props.graph_weight_buttons){
            button_list.push(<button id="setEdgeWeight" className={"toolButton"} type="button">Назначить вес дуге</button>)
        }
        if (this.props.node_weight_buttons){
            button_list.push(<button id="setNodeWeight" className={"toolButton"} type="button">Назначить вес вершине</button>)
            button_list.push(<button id="writeNodeWeight" className={"toolButton"} type="button">Просмотреть вес вершины</button>)
        }
        if (this.props.change_visualization_policy_buttons){
            button_list.push(
                <select name="visualization-policy" id="visualization-policy" className='visualPolicy'>
                    <option value="circle">circle</option>
                    <option value="grid">grid</option>
                    <option value="random">random</option>
                    <option value="preset">preset</option>
                    <option value="concentric">concentric</option>
                    <option value="breadthfirst">breadthfirst</option>
                    <option value="cose">cose</option>
                </select>
                )
        }
        return button_list
    }

    private getFooterButtons(){
        return <button id="compleateModule" className={"compleateButton"} type="button">Далее</button>
    }

    


    render(): React.ReactNode {
        let tool_buttons = this.getToolButtons()
        let footer_buttons = this.getFooterButtons()
        return (
            <div>
                <div id={"toolButtons"} className={"toolButtonList"}>
                    {tool_buttons}
                </div>
                <div id={"footerButtons"} className="footerButtonsList">
                    {footer_buttons}
                </div>
            </div>
        )
    }
}