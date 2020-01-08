import { observable } from "mobx";
import { FormItemInfo, NodeType, NodeEditInfo, NodeTypeToNodeClass } from "./FormItemInfo"
import { NodeCollectionStore } from "../stores/NodeCollectionStore";
import React = require("react");


export class NodeCreationModalStore {
    constructor(x: number, y: number, collection: NodeCollectionStore, container: NodeCollectionStore, nodeType: NodeType) {
        this.X = x;
        this.Y = y;
        this.NodeType = nodeType
        this.Collection = collection
        this.Container = container;
        this.inputs = NodeEditInfo[nodeType]

        this.inputs.forEach((input) => {
            this.CurrentValues[input.Name] = "";
        })
    }

    readonly X: number;

    readonly Y: number;

    readonly NodeType: NodeType;

    readonly Collection: NodeCollectionStore;
    
    readonly Container: NodeCollectionStore;

    public inputs: FormItemInfo[];

    @observable
    public CurrentValues: { [key: string]: string } = {}
  
    handleTextChange (event: React.ChangeEvent<HTMLInputElement>): void {
        this.CurrentValues[event.target.name] = event.target.value
    }
  
    handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
        if (event) event.preventDefault();

        let nodeClass = NodeTypeToNodeClass(this.NodeType);

        // If creating in a nested collection, create new node at origin,
        // else create new node at dropdown location
        let newNodeParams: Object;
        if (this.Collection.isTopLevel) {
            newNodeParams = { ...this.CurrentValues, X: this.X, Y: this.Y }
        } else {
            newNodeParams = { ...this.CurrentValues, X: 0, Y: 0 }
        }

        let newNode = new nodeClass(newNodeParams);

        this.Collection.AddNodes([ newNode ]);
        this.Container.HideModal();
    }
}