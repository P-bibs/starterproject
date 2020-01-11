import { observer } from "mobx-react";
import { ImageNodeStore } from "../../stores/nodes/ImageNodeStore";
import "../../styles/nodes/NodeView.scss";
import { TopBar } from "../interface_components/TopBar";
import { ResizeCorner } from "../interface_components/ResizeCorner";
import React = require("react");

interface IProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className={"node image-node" + (store.Highlighted ? " highlighted" : "")}
                style={{ transform: store.Translate, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() } onWheel={ (e) => e.stopPropagation() }>
                    
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