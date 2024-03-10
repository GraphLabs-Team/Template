import { Node } from './Node';


interface IEdgeProps<T1, T2> {
    id: string
    source: Node<T1>
    target: Node<T1>
    props?: T2
}


export class Edge<T1, T2> implements IEdgeProps<T1, T2> {
    private _id: string;
    private _source: Node<T1>;
    private _target: Node<T1>;
    private _props?: T2;

    constructor(id: string, source: Node<T1>, target: Node<T1>, props?: T2) {
        this._id = id
        this._source = source
        this._target = target
        this._props = props
    }

    get id(){
        return this._id
    }

    get source(){
        return this._source
    }

    get target(){
        return this._target
    }

    get props(){
        return this._props
    }
}

