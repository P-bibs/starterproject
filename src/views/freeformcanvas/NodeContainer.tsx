import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";

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
import React = require("react");

interface IProps {
    store: NodeCollectionStore
}

@observer
export class NodeContainer extends React.Component<IProps> {

    render() {
        let store = this.props.store
        if (store.isTopLevel) {
            return (
                <div className="node-container">
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
            )
        } else {
            return (
                <div className="node" style={{ transform: store.Transform, width: store.Width, height: store.Height }}>
                    <TopBar store={store} />
                    <div className="no-scroll-box node-boundary">
                        <div className="content">
                            <div className="node-container">
                                <div>
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
                            </div>
                        </div>
                    </div>
                    <ResizeCorner store={store} />
                </div>
            )
        }
    }
}