import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { NodeLinkView } from "./NodeLinkView";

import { StaticTextNodeStore } from "../../stores/StaticTextNodeStore";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import { ImageNodeStore } from "../../stores/ImageNodeStore";

import { TextNodeView } from "../nodes/TextNodeView";
import { VideoNodeView } from "../nodes/VideoNodeView";
import { WebsiteNodeView } from "../nodes/WebsiteNodeView";
import { ImageNodeView } from "../nodes/ImageNodeView";

import { TopBar } from "../nodes/TopBar"
import { ResizeCorner } from "../nodes/ResizeCorner"
import "./FreeFormCanvas.scss";
import "./NodeContainer.scss"
import React = require("react");

interface IProps {
    store: NodeCollectionStore
}

@observer
export class NodeContainer extends React.Component<IProps> {

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
                }
            })}
        </div>

        if (store.isTopLevel) {
            return content
        } else {
            // If this NodeContainer exists as a nested collection, we need to add some extra HTML
            return (
                <div className="node" style={{ transform: store.Transform, width: store.Width, height: store.Height }}>
                    <TopBar store={store} />
                    <div className="no-scroll-box node-boundary">
                        <div className="content">
                            {content}
                        </div>
                    </div>
                    <ResizeCorner store={store} />
                </div>
            )
        }
    }
}