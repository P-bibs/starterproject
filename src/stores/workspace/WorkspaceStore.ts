import { observable, action } from "mobx";
import { NodeStore } from "../nodes/NodeStore";
import { NodeCollectionStore } from "../nodes/NodeCollectionStore";


export class WorkspaceStore extends NodeStore {

    constructor(initializer: Partial<WorkspaceStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Collections: NodeCollectionStore[] = [];

    @observable
    public CurrentCollectionIndex: number = 0;

    @action
    public SetCurrentCollection(index: number): void {
        this.CurrentCollectionIndex = index;
    }

    @action
    public AddCollection() {
        let newCollection = new NodeCollectionStore({ X: 0, Y: 0, isTopLevel: true, GetParentScale: () => 1 });
        this.Collections.push(newCollection);
    }

    @action
    public RemoveCollection(indexToRemove: number) {
        if (this.Collections.length > 1) {
            this.Collections = this.Collections.filter(
                (_, i) => i != indexToRemove
            )
            if (this.CurrentCollectionIndex >= this.Collections.length) {
                this.CurrentCollectionIndex = this.Collections.length - 1;
            }
        }
    }
}