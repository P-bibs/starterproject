import { observer } from "mobx-react";
import Markdown from "react-markdown"
import { MarkdownNodeStore } from "../../stores/nodes/MarkdownNodeStore";
import "../../styles/nodes/NodeView.scss";
import { TopBar } from "../interface_components/TopBar";
import { ResizeCorner } from "../interface_components/ResizeCorner";
import React = require("react");


interface IProps {
    store: MarkdownNodeStore;
}

@observer
export class MarkdownNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className={"node markdown-node" + (store.Highlighted ? " highlighted" : "")}
                style={{ transform: store.Translate, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() } onWheel={ (e) => e.stopPropagation() }>
                    
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <Markdown source={store.Markdown} />
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}