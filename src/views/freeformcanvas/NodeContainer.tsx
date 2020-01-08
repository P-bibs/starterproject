import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { NodeLinkView } from "./NodeLinkView";

import { StaticTextNodeStore } from "../../stores/StaticTextNodeStore";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { TextEditorNodeStore } from "../../stores/TextEditorNodeStore";

import { TextNodeView } from "../nodes/TextNodeView";
import { VideoNodeView } from "../nodes/VideoNodeView";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { TextEditorNodeView } from "../nodes/TextEditorNodeView";
import { NodeCreationDropdownView } from "../../node_creation/NodeCreationDropdownView";
import { NodeCreationModalView } from "../../node_creation/NodeCreationModalView";

import { TopBar } from "../nodes/TopBar"
import { ResizeCorner } from "../nodes/ResizeCorner"
import "./NodeContainer.scss"
import "../nodes/NodeView.scss"
import React = require("react");

interface IProps {
    store: NodeCollectionStore
}

@observer
export class NodeContainer extends React.Component<IProps> {

    private _isPointerDown: boolean;
    private _distancePanned: number = 0;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = true;
        this._distancePanned = 0;
        this.props.store.HideDropdown();
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = false;
        if (this._distancePanned < 3) {
            this.props.store.CreateDropdown(e.pageX, e.pageY, this.props.store)
        }
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this._isPointerDown) {
            return;
        }
        let store = this.props.store
        store.ViewX += e.movementX / store.GetParentScale() / store.Scale;
        store.ViewY += e.movementY / store.GetParentScale() / store.Scale;

        this._distancePanned += Math.abs(e.movementX) + Math.abs(e.movementY)
    }

    render() {
        let store = this.props.store

        let content = <div className="node-container">
            {this.props.store.NodeLinks.map(nodeLinkStore => {
                return <NodeLinkView key={nodeLinkStore.Id} store={nodeLinkStore} />
            })}

            {/* Render nodes */}
            {this.props.store.Nodes.map(nodeStore => {
                if (nodeStore instanceof StaticTextNodeStore) {
                    return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} />)
                } else if (nodeStore instanceof VideoNodeStore) {
                    return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} />)
                } else if (nodeStore instanceof WebsiteNodeStore) {
                    return (<WebsiteNodeView key={nodeStore.Id} store={nodeStore as WebsiteNodeStore} />)
                } else if (nodeStore instanceof ImageNodeStore) {
                    return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} />)
                } else if (nodeStore instanceof NodeCollectionStore) {
                    return (<NodeContainer key={nodeStore.Id} store={nodeStore as NodeCollectionStore} />)
                } else if (nodeStore instanceof TextEditorNodeStore) {
                    return (<TextEditorNodeView key={nodeStore.Id} store={nodeStore as TextEditorNodeStore} />)
                }
            })}
        </div>

        if (store.isTopLevel) {
            return (
                <div>
                    {/* Render Modal */}
                    { store.CurrentModal ?
                        <div className="darkened-background" onClick={store.HideModal.bind(store)}>
                            <NodeCreationModalView store={store.CurrentModal} />
                        </div>
                    :   
                        <div />
                    }

                    <div className="freeformcanvas-container" onPointerDown={this.onPointerDown} onWheel={store.HandleZoom.bind(store)}>
                        <div className="freeformcanvas" >
                            {/* Render Dropdown */}
                            { store.CurrentDropdown ? <NodeCreationDropdownView store={store.CurrentDropdown} /> : <div /> }
                                
                            {/* Render Nodes */}
                            <div style={{ transform: store.Zoom + " " + store.Pan }}>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            // If this NodeStore exists as a nested collection, we need to add some extra HTML
            return (
                <div className={"node" + (store.Highlighted ? " highlighted" : "")} style={{ transform: store.Translate, width: store.Width, height: store.Height }}>
                    <TopBar store={store} />
                    <div className="no-scroll-box node-boundary"  onPointerDown={this.onPointerDown} onWheel={store.HandleZoom.bind(store)}>
                        <div className="content" style={{ transform: store.Zoom + " " + store.Pan }}>
                            {content}
                        </div>
                    </div>
                    <ResizeCorner store={store} />
                </div>
            )
        }
    }
}