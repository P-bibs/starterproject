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
    public isTopLevel: Boolean = false;

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px," + this.Y + "px) scale(" + this.Scale + "," + this.Scale + ")";
    }

    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach((store) => {
            store.Destroy = (): void => this.RemoveNode(store)
            this.Nodes.push(store)
        });
    }

    @action
    public RemoveNode(storeToRemove: NodeStore): void {
        this.Nodes = this.Nodes.filter((store) => store != storeToRemove)
    }
}