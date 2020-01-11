import { observer } from "mobx-react";
import { CollectionInfoModalStore } from "../../stores/interface_components/CollectionInfoModalStore"

import { StaticTextNodeStore } from "../../stores/nodes/StaticTextNodeStore";
import { WebsiteNodeStore } from "../../stores/nodes/WebsiteNodeStore";
import { VideoNodeStore } from "../../stores/nodes/VideoNodeStore";
import { ImageNodeStore } from "../../stores/nodes/ImageNodeStore";
import { TextEditorNodeStore } from "../../stores/nodes/TextEditorNodeStore";
import { NodeCollectionStore } from "../../stores/nodes/NodeCollectionStore"
import { NodeStore } from "../../stores/nodes/NodeStore";
import { MarkdownNodeStore } from "../../stores/nodes/MarkdownNodeStore";

import "../../styles/interface_components/CollectionInfo.scss"
import React = require("react");

interface IProps {
    store: CollectionInfoModalStore
}

@observer
export class CollectionInfoModalView extends React.Component<IProps> {

    private NodeClassToString(nodeStore: NodeStore): string {
        if (nodeStore instanceof StaticTextNodeStore) { return "Static Text Node"
        } else if (nodeStore instanceof VideoNodeStore) { return "Video Node"
        } else if (nodeStore instanceof WebsiteNodeStore) { return "Website Node"
        } else if (nodeStore instanceof ImageNodeStore) { return "Image Node"
        } else if (nodeStore instanceof NodeCollectionStore) { return "Node Collection"
        } else if (nodeStore instanceof TextEditorNodeStore) { return "Text Editor Node"
        } else if (nodeStore instanceof MarkdownNodeStore) { return "Markdown Node" }
    }

    render() {
        let store = this.props.store
        return (
            <div className="modal" onClick={ (e) => e.stopPropagation() }>
                <h2>
                    Collection Info
                </h2>
                <div className="table">
                    {/* Render Table Header */}
                    <div className="row">
                        <div className="node-name-column">
                            <strong>Node Type</strong>
                        </div>
                        <div className="node-title-column">
                            <strong>Node Title</strong>
                        </div>
                    </div>

                    {/* Render Table Items */}
                    {store.Collection.Nodes.map(nodeStore => {
                        if (nodeStore instanceof NodeCollectionStore) {
                            return (
                                <div className="row">
                                    <div className="node-name-column">
                                        Node Collection
                                    </div>
                                    {/* Create links to nested collection info */}
                                    <div className="node-title-column"
                                        onClick={ () => store.Container.CreateInfoModal(nodeStore as NodeCollectionStore) }>
                                        <a href="" onClick={(e) => e.preventDefault()}>
                                            Click for Contents
                                        </a>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="row">
                                    <div className="node-name-column">
                                        {this.NodeClassToString(nodeStore)}
                                    </div>
                                    <div className="node-title-column">
                                        {nodeStore.Title}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
  }