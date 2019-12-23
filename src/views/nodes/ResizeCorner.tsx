import { observer } from "mobx-react";
import { NodeStore } from "../../stores/NodeStore";
import "./NodeView.scss";
import React = require("react");

interface IProps {
    store: NodeStore;
}

@observer
export class ResizeCorner extends React.Component<IProps> {

    private _isPointerDown = false;

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
        // Prevent nodes from being resized too small
        this.props.store.Width = Math.max(this.props.store.Width + e.movementX, 40);
        this.props.store.Height = Math.max(this.props.store.Height + e.movementY, 40);

    }

    render() {
        return <div className="corner" onPointerDown={this.onPointerDown}></div>
    }
}
