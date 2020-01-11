import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    @observable
    public X: number = 0;

    @observable
    public Y: number = 0;

    @observable
    public Width: number = 300;

    @observable
    public Height: number = 300;

    @observable
    public Title: string = "";

    @observable
    public Highlighted: boolean = false;

    @observable
    public IsCurrentlyLinking: boolean = false;

    @computed
    public get Translate(): string {
        return "translate(" + this.X + "px, " + this.Y + "px)";
    }

    @computed
    public get CenterCoords(): [number, number] {
        return [this.X + this.Width / 2, this.Y + this.Height / 2];
    }

    //These functions are created when the store is added to a collection
    @action
    public Destroy(): void {}
    @action
    public Link(): void {}
    @action
    public HighlightNeighbors(): void {}
    @action
    public UndoHighlightNeighbors(): void {}
    // This property has to be a method instead of a getter because getters can't be reassigned
    public GetParentScale: () => number;
    

}