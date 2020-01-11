import { observer } from "mobx-react";
import { VideoNodeStore } from "../../stores/nodes/VideoNodeStore";
import "../../styles/nodes/NodeView.scss";
import "../../styles/nodes/VideoNodeView.scss";
import { TopBar } from "../interface_components/TopBar";
import { ResizeCorner } from "../interface_components/ResizeCorner";
import React = require("react");

interface IProps {
    store: VideoNodeStore;
}

@observer
export class VideoNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className={"node video-node" + (store.Highlighted ? " highlighted" : "")}
                style={{ transform: store.Translate, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() } onWheel={ (e) => e.stopPropagation() }>
                    
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <video src={store.Url} controls />
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}