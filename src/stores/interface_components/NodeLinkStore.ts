import { computed, observable, action } from "mobx";
import { Utils } from "../../Utils";
import { NodeStore } from "../nodes/NodeStore"

export class NodeLinkStore {

    constructor(initializer: Partial<NodeLinkStore>) {
        Object.assign(this, initializer);
    }

    public Id: string = Utils.GenerateGuid();

    @observable
    public Pair: [NodeStore, NodeStore] = null;

    @observable
    public Highlighted: boolean = false;

    @computed
    private get DistanceBetweenNodes(): [number, number] {
        let [n1x, n1y] = this.Pair[0].CenterCoords
        let [n2x, n2y] = this.Pair[1].CenterCoords
        // Swap assignments so n1 is always the node farther to the left
        if (n2x < n1x) {
            [n1x, n1y, n2x, n2y] = [n2x, n2y, n1x, n1y]
        }
        let dx = n2x - n1x
        let dy = n2y - n1y
        return [dx, dy]
    }

    @computed
    public get TopLeftNodeCoords(): [number, number] {
        // Calculate topleft node to ensure consistent rendering
        if (this.Pair[0].CenterCoords[0] < this.Pair[1].CenterCoords[0]) {
            return this.Pair[0].CenterCoords
        } else if (this.Pair[0].CenterCoords[0] === this.Pair[1].CenterCoords[0]) {
            if (this.Pair[0].CenterCoords[1] < this.Pair[1].CenterCoords[1]) {
                return this.Pair[0].CenterCoords
            } else {
                return this.Pair[1].CenterCoords
            }
        } else {
            return this.Pair[1].CenterCoords
        }
    }

    @computed
    public get Length(): number {
        let [dx, dy] = this.DistanceBetweenNodes
        // Use pythagorean theorem to calculate line length
        let length: number = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 1/2)
        return length
    }

    @computed
    public get Rotation(): number {
        let [dx, dy] = this.DistanceBetweenNodes
        // Use inverse tangent to calculate rotation
        let rotation: number = dx != 0 ? Math.atan(dy / dx) : Math.PI / 2
        return rotation
    }

    public ConnectsNodes(node1: NodeStore, node2?: NodeStore): boolean {
        if (node2 == undefined) {
            return this.Pair[0] == node1 || this.Pair[1] == node1
        } else {
            return (
                (this.Pair[0] == node1 && this.Pair[1] == node2)
                ||
                (this.Pair[0] == node2 && this.Pair[1] == node1)
            )
        }
    }

    @action
    public Highlight(): void {
        this.Highlighted = !this.Highlighted
    }

    // These functions are created when the link is added to a collection
    public Destroy(): void {}
}