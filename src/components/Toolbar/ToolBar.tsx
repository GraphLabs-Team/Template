import * as React from 'react';
import './ToolBar.css';



interface IToolBarProps{
    base_button: boolean,
    graph_manipulations_button?: boolean,
    graph_coloring_buttons?: boolean
    next_stage: () => void,
}


export class ToolBar extends React.Component<IToolBarProps> {
    constructor(props: {base_button: boolean, graph_manipulations_button: boolean, graph_coloring_buttons?: boolean, next_stage: () => void}){
        super(props)
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
            button_list.push(<input type="color" id="nodeColor" name="nodeColor"/>)
            button_list.push(<button id="recolorNodeButton" className={"toolButton"} type="button">Перекрасить вершину</button>)
        }
        return button_list
    }

    private getFooterButtons(){
        return <button id="compleateModule" className={"compleateButton"} type="button" onClick={this.props.next_stage}>Далее</button>
        
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