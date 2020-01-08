import { computed } from "mobx";
import "./NodeCreation.scss"
import { Utils } from "../Utils"
import { NodeType } from "./FormItemInfo"
import { NodeCollectionStore } from "../stores/NodeCollectionStore";

export class NodeCreationDropdownStore {
    constructor(x: number, y: number, collection: NodeCollectionStore, container: NodeCollectionStore) {
        this.X = x;
        this.Y = y;
        this.Collection = collection;
        this.Container = container;
    }
    public readonly X: number;

    public readonly Y: number;

    // The collection that the dropdown was created for
    public readonly Collection: NodeCollectionStore

    // The collection that displays the dropdown
    public readonly Container: NodeCollectionStore;

    public readonly Options: { [key: string]: NodeType } = {
        "Static Text Node": NodeType.StaticTextNode,
        "Image Node": NodeType.ImageNode,
        "Video Node": NodeType.VideoNode,
        "Website Node": NodeType.WebsiteNode,
        "Text Editor Node": NodeType.TextEditorNode,
        "Node Collection": NodeType.NodeCollection
    }

    public readonly OptionKeys: { [key: string]: string } = {
        "Static Text Node": Utils.GenerateGuid(),
        "Image Node": Utils.GenerateGuid(),
        "Video Node": Utils.GenerateGuid(),
        "Website Node": Utils.GenerateGuid(),
        "Text Editor Node": Utils.GenerateGuid(),
        "Node Collection": Utils.GenerateGuid()
    }

    @computed
    public get Translate(): string {
        return "translate(" + this.X + "px, " + this.Y + "px)";
    }

    // This property is assigned when the dropdown is added to a collection
    public CreateModal: (x: number, y: number, collection: NodeCollectionStore, container: NodeCollectionStore, nodeType: NodeType) => void;
}