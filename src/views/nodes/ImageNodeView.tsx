import { observer } from "mobx-react";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import "./NodeView.scss";
import { TopBar } from "./TopBar";
import { ResizeCorner } from "./ResizeCorner";
import React = require("react");

interface IProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node image-node" style={{ transform: store.Transform, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() }>
                    
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <img src={store.Url} />
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}