import { observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class TextEditorNodeStore extends NodeStore {

    constructor(initializer: Partial<TextEditorNodeStore>) {
        super();
        this.Width = 420
        Object.assign(this, initializer);
    }

    @observable
    public Title: string = "";

    @observable
    public Text: string = "";

    @action
    public HandleChange(value) {
        this.Text = value
    }
} 
