import { NodeCollectionStore } from "../nodes/NodeCollectionStore";

export class ModalStore {
    constructor(collection: NodeCollectionStore, container: NodeCollectionStore) {
        this.Collection = collection;
        this.Container = container;
    }

    readonly Collection: NodeCollectionStore;

    readonly Container: NodeCollectionStore;
}