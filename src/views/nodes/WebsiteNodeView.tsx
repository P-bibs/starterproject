import { observer } from "mobx-react";
import { WebsiteNodeStore } from "../../stores/WebsiteNodeStore";
import "./NodeView.scss";
import { TopBar } from "./TopBar";
import { ResizeCorner } from "./ResizeCorner";
import React = require("react");

interface IProps {
    store: WebsiteNodeStore;
}

@observer
export class WebsiteNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node text-node" style={{ transform: store.Translate, width: store.Width, height: store.Height}}>
                <TopBar store={store} />
                <div className="no-scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        {/* `store.Height - 110` is a hack to make the iframe the right size.
                        This is required since iframes don't support auto-height */}
                        <iframe src={store.Url} width={store.Width - 40}  height={store.Height - 110}></iframe>
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}