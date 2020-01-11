import { NodeCollectionStore } from "../stores/NodeCollectionStore";
import { ModalStore } from "../stores/ModalStore"

export class CollectionInfoModalStore extends ModalStore{
    constructor(collection: NodeCollectionStore, container: NodeCollectionStore) {
        super(collection, container);
    }
}