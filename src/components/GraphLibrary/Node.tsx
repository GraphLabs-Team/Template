import React from 'react';


interface INodeProps<T> {
    id: string
    label: string
    color?: string
    props?: T
}


export class Node<T> implements INodeProps<T> {
    private _id: string;
    private _label: string;
    private _color?: string;
    private _props?: T;

    constructor(id: string, label: string, color?: string, props?: T) {
        this._id = id
        this._label = label
        this._color = color
        this._props = props
    }

    get id(){
        return this._id
    }

    get label(){
        return this._label
    }

    get props(){
        return this._props
    }

    get color(){
        return this._color
    }

    public setColor(color: string){
        this._color = color
    }

    public setLabel(label: string){
        this._label = label
    }
}

