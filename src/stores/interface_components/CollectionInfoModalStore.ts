import { NodeCollectionStore } from "../nodes/NodeCollectionStore";
import { ModalStore } from "./ModalStore"

export class CollectionInfoModalStore extends ModalStore{
    constructor(collection: NodeCollectionStore, container: NodeCollectionStore) {
        super(collection, container);
    }
}