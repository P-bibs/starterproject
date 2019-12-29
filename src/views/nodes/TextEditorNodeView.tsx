import { observer } from "mobx-react";
import ReactQuill from "react-quill";
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
        let QUILL_HEIGHT_EDITOR_OFFSET = 150
        return (
            <div className="node text-edit-node" style={{ transform: store.Transform, width: store.Width, height: store.Height }}
                onPointerDown={ (e) => e.stopPropagation() }>

                <TopBar store={store} />
                <div className="no-scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <ReactQuill value={ this.props.store.Text }
                            style={{ height: this.props.store.Height - QUILL_HEIGHT_EDITOR_OFFSET }}
                            onChange={ this.props.store.HandleChange.bind(this.props.store) } />
                    </div>
                </div>
                <ResizeCorner store={store} />
            </div>
        );
    }
}