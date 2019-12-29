import { computed, observable } from "mobx";
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
    public Destroy(): void {}
    public Link(): void {}
}