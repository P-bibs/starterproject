import { observer } from "mobx-react";
import { StaticTextNodeStore } from "../../stores/nodes/StaticTextNodeStore";
import "../../styles/nodes/NodeView.scss";
import { TopBar } from "../interface_components/TopBar";
import { ResizeCorner } from "../interface_components/ResizeCorner";
import React = require("react");

interface IProps {
    store: StaticTextNodeStore;
}

@observer
export class TextNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className={"node text-node" + (store.Highlighted ? " highlighted" : "")}
                style={{ transform: store.Translate, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() } onWheel={ (e) => e.stopPropagation() }>
                    
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <p className="paragraph">{store.Text}</p>
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}