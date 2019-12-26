import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    constructor(initializer: Partial<NodeCollectionStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Scale: number = 1;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public LinkedPairs: [NodeStore, NodeStore][] = new Array<[NodeStore, NodeStore]>();

    @observable
    public isTopLevel: Boolean = false;

    @observable
    private CurrentlyLinkingNode: NodeStore = null;

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px," + this.Y + "px) scale(" + this.Scale + "," + this.Scale + ")";
    }

    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach((store) => {
            store.Destroy = (): void => this.RemoveNode(store)
            store.Link = (): void => this.LinkNode(store)
            this.Nodes.push(store)
        });
    }

    @action
    public RemoveNode(storeToRemove: NodeStore): void {
        this.Nodes = this.Nodes.filter((store) => store != storeToRemove)
        this.LinkedPairs = this.LinkedPairs.filter(
            (pair) => storeToRemove != pair[0] && storeToRemove != pair[1]
        )
    }

    @action
    public LinkNode(store: NodeStore): void {
        if (this.CurrentlyLinkingNode == null) {
            this.CurrentlyLinkingNode = store
            this.CurrentlyLinkingNode.IsCurrentlyLinking = true
        } else {
            if (store == this.CurrentlyLinkingNode) {
                // Deselect current node if user clicks it again
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            } else {
                this.LinkedPairs.push([this.CurrentlyLinkingNode, store])
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            }
        }
    }
}