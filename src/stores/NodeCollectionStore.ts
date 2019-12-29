import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { NodeLinkStore } from "./NodeLinkStore";

export class NodeCollectionStore extends NodeStore {

    constructor(initializer: Partial<NodeCollectionStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Scale: number = 1;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable 
    public NodeLinks: NodeLinkStore[] = new Array<NodeLinkStore>();

    @observable
    public isTopLevel: Boolean = false;

    @observable
    private CurrentlyLinkingNode: NodeStore = null;

    @computed
    public get Zoom(): string {
        return "scale(" + this.Scale + "," + this.Scale + ")";
    }

    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach((store) => {
            store.Destroy = (): void => this.RemoveNode(store)
            store.Link = (): void => this.LinkNode(store)
            this.Nodes.push(store)
        });
    }

    @action
    public RemoveNode(storeToRemove: NodeStore): void {
        this.Nodes = this.Nodes.filter((store) => store != storeToRemove)
        this.NodeLinks = this.NodeLinks.filter(
            (link) => storeToRemove != link.Pair[0] && storeToRemove != link.Pair[1]
        )
    }

    @action
    public LinkNode(store: NodeStore): void {
        if (this.CurrentlyLinkingNode == null) {
            this.CurrentlyLinkingNode = store
            this.CurrentlyLinkingNode.IsCurrentlyLinking = true
        } else {
            if (store == this.CurrentlyLinkingNode) {
                // Deselect current node if user clicks it again
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            } else {
                let newNodeLink = new NodeLinkStore({ Pair: [this.CurrentlyLinkingNode, store] })
                newNodeLink.Destroy = (): void => this.RemoveNodeLink(newNodeLink)
                this.NodeLinks.push(newNodeLink)
                this.CurrentlyLinkingNode.IsCurrentlyLinking = false
                this.CurrentlyLinkingNode = null
            }
        }
    }

    @action
    public RemoveNodeLink(linkToRemove: NodeLinkStore): void {
        this.NodeLinks = this.NodeLinks.filter((link) => {link != linkToRemove})
    }

    @action
    HandleZoom (event: React.WheelEvent): void {
        event.stopPropagation()
        let absoluteX = this.X + event.pageX
        let absoluteY = this.Y + event.pageY
        event.deltaY = Math.max(-3, Math.min(3, event.deltaY))
        let zoomDelta = this.Scale * event.deltaY * -.01;
        let oldScale = this.Scale
        let newScale = this.Scale + zoomDelta
        let normalizationFactor = 1/oldScale
        //let normalizationFactor = 1
        let offsetX = event.pageX/(newScale*normalizationFactor) - event.pageX/(oldScale*normalizationFactor)
        //let offsetY = event.pageY/(newScale*normalizationFactor) - event.pageY/(oldScale*normalizationFactor)
        //this.X += event.deltaY * (event.pageX / (this.isTopLevel ? window.innerWidth : this.Width)) * 19
        
    
        let s = event.pageX
        let z2 = newScale
        let t1 = this.X
        let z1 = oldScale
        offsetX = (s)-(z2/1)*((s-t1)/(z1))
        /*
        let r = event.pageX
        let t1 = this.X
        let s1 = oldScale
        let s2 = newScale
        offsetX = (r)-((r-t1)/(s1))*(s2)
*/
        console.log(newScale)
        console.log(offsetX)
        this.Scale = newScale
        this.X += offsetX
        //this.Y += offsetY
    }

}