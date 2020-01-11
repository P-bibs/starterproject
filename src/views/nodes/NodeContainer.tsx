import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/nodes/NodeCollectionStore";
import { NodeLinkView } from "../interface_components/NodeLinkView";

import { StaticTextNodeStore } from "../../stores/nodes/StaticTextNodeStore";
import { WebsiteNodeStore } from "../../stores/nodes/WebsiteNodeStore";
import { VideoNodeStore } from "../../stores/nodes/VideoNodeStore";
import { ImageNodeStore } from "../../stores/nodes/ImageNodeStore";
import { TextEditorNodeStore } from "../../stores/nodes/TextEditorNodeStore";
import { NodeCreationModalStore } from "../../stores/interface_components/NodeCreationModalStore";
import { CollectionInfoModalStore } from "../../stores/interface_components/CollectionInfoModalStore";
import { MarkdownNodeStore } from "../../stores/nodes/MarkdownNodeStore";

import { TextNodeView } from "./TextNodeView";
import { VideoNodeView } from "./VideoNodeView";
import { WebsiteNodeView } from "./WebsiteNodeView";
import { ImageNodeView } from "./ImageNodeView";
import { TextEditorNodeView } from "./TextEditorNodeView";
import { NodeCreationDropdownView } from "../interface_components/NodeCreationDropdownView";
import { NodeCreationModalView } from "../interface_components/NodeCreationModalView";
import { CollectionInfoModalView } from "../interface_components/CollectionInfoModalView"
import { MarkdownNodeView } from "./MarkdownNodeView";

import { TopBar } from "../interface_components/TopBar";
import { ResizeCorner } from "../interface_components/ResizeCorner";
import "../../styles/nodes/NodeContainer.scss"
import "../../styles/nodes/NodeView.scss"
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
            // Account for 40px workspace bar at top of page
            let adjustedX = e.pageX
            let adjustedY = e.pageY - 40
            this.props.store.CreateDropdown(adjustedX, adjustedY, this.props.store)
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
                } else if (nodeStore instanceof MarkdownNodeStore) {
                    return (<MarkdownNodeView key={nodeStore.Id} store={nodeStore as MarkdownNodeStore} />)
                }
            })}
        </div>

        let modal;
        if (store.CurrentModal instanceof NodeCreationModalStore) {
            modal = <NodeCreationModalView store={store.CurrentModal as NodeCreationModalStore} />
        } else if (store.CurrentModal instanceof CollectionInfoModalStore) {
            modal = <CollectionInfoModalView store={store.CurrentModal as CollectionInfoModalStore} />
        }

        if (store.isTopLevel) {
            return (
                <div>
                    {/* Render Modal */}
                    { store.CurrentModal ?
                        <div className="darkened-background" onClick={store.HideModal.bind(store)}>
                            {modal}
                        </div>
                    :   
                        <div />
                    }

                    <div className="freeformcanvas-container" onPointerDown={this.onPointerDown} onWheel={store.HandleZoom.bind(store)}>
                        {/* Render info button */}
                        <button className="collection-info-button"
                            onPointerDown={(e) => { e.stopPropagation(); store.CreateInfoModal(store) }}>
                            <i className="material-icons">info</i>
                        </button>

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
                        {/* Render info button */}
                        <button className="collection-info-button"
                            onPointerDown={(e) => { e.stopPropagation(); store.CreateInfoModal(store) }}>
                            <i className="material-icons">info</i>
                        </button>

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