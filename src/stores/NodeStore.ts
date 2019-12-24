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

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px, " + this.Y + "px)";
    }

    //This function is created when the store is added to a collection
    public Destroy(): void {}
}