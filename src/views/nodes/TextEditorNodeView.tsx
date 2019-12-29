import { observer } from "mobx-react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextEditorNodeStore } from "../../stores/TextEditorNodeStore";
import "./NodeView.scss";
import { TopBar } from "./TopBar";
import { ResizeCorner } from "./ResizeCorner";
import React = require("react");

interface IProps {
    store: TextEditorNodeStore;
}

@observer
export class TextEditorNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        return (
            <div className="node text-node" style={{ transform: store.Translate, width: store.Width, height: store.Height }}>
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <ReactQuill value={ this.props.store.Text } onChange={ this.props.store.HandleChange} />
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}