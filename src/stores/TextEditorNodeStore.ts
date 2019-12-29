import { observable, computed, action } from "mobx";
import { NodeStore } from "./NodeStore";
import * as ReactQuill from 'react-quill';

export class TextEditorNodeStore extends NodeStore {

    constructor(initializer: Partial<TextEditorNodeStore>) {
        super();
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

    /*
    @observable
    public TextEditorState: EditorState = EditorState.createEmpty();

    
    public OnChange(newState: EditorState): void {
        this.TextEditorState = newState
    }
    */
}