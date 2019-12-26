import { observer } from "mobx-react";
import { NodeStore } from "../../stores/NodeStore";
import "./NodeView.scss";
import React = require("react");
import { computed } from "mobx";

interface IProps {
    store: NodeStore;
}

@observer
export class TopBar extends React.Component<IProps> {

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
        this.props.store.X += e.movementX;
        this.props.store.Y += e.movementY;
    }

    render() {
        return <div className="top" onPointerDown={this.onPointerDown}>
            <i className={ "material-icons top-btn" + (this.props.store.IsCurrentlyLinking ? " highlight" : "" )} onClick={this.props.store.Link}>link</i>
            <i className="material-icons top-btn" onClick={this.props.store.Destroy}>close</i>
        </div>
    }
}
