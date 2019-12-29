import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import "./FreeFormCanvas.scss";
import { NodeContainer } from "./NodeContainer";
import React = require("react");

interface IProps {
    store: NodeCollectionStore
}

@observer
export class FreeFormCanvas extends React.Component<IProps> {

    private _isPointerDown: boolean;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this._isPointerDown) {
            return;
        }
        this.props.store.X += e.movementX;
        this.props.store.Y += e.movementY;
    }

    render() {
        let store = this.props.store;

        return (
            <div className="freeformcanvas-container" onClick={(e) => {console.log(e.pageX); console.log((e.pageX-this.props.store.X)/this.props.store.Scale)}} onPointerDown={this.onPointerDown}  onWheel={this.props.store.HandleZoom.bind(this.props.store)}>
                <button onClick={() => this.props.store.Scale += .1} >Scale!</button>
                <div className="freeformcanvas" style={{ transform: store.Translate }}>
                    <NodeContainer store={store} />
                </div>
            </div>
        );
    }
}