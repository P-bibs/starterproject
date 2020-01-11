import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class MarkdownNodeStore extends NodeStore {

    constructor(initializer: Partial<MarkdownNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Markdown: string = "";
}