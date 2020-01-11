import { observer } from "mobx-react";
import { NodeStore } from "../../stores/nodes/NodeStore";
import "../../styles/interface_components/ResizeCorner.scss";
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
        let store = this.props.store
        store.Width = Math.max(store.Width + e.movementX / store.GetParentScale(), 40);
        store.Height = Math.max(store.Height + e.movementY / store.GetParentScale(), 40);

    }

    render() {
        return <div className="corner" onPointerDown={this.onPointerDown}></div>
    }
}
